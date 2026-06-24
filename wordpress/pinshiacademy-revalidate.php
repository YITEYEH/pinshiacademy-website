<?php
/**
 * Plugin Name: Pin Shi Academy Revalidate
 * Description: 文章發布／更新／刪除時，通知 Next.js 網站清除 WordPress 文章快取。
 * Version: 1.1.0
 *
 * 安裝：上傳至 wp-content/mu-plugins/（建議）或 wp-content/plugins/ 並啟用。
 *
 * 在 wp-config.php 加入（密鑰需與 Vercel 的 REVALIDATE_SECRET 相同）：
 *   define('PSA_SITE_URL', 'https://www.pinshiacademy.com');
 *   define('PSA_REVALIDATE_SECRET', 'your_random_secret_here');
 */

if (!defined('ABSPATH')) {
  exit;
}

function psa_revalidate_secret(): ?string {
  if (defined('PSA_REVALIDATE_SECRET') && PSA_REVALIDATE_SECRET) {
    return (string) PSA_REVALIDATE_SECRET;
  }
  $from_env = getenv('PSA_REVALIDATE_SECRET');
  return $from_env ? (string) $from_env : null;
}

function psa_site_url(): string {
  if (defined('PSA_SITE_URL') && PSA_SITE_URL) {
    return rtrim((string) PSA_SITE_URL, '/');
  }
  return 'https://www.pinshiacademy.com';
}

/**
 * 佇列 revalidate 請求，於 shutdown 以 blocking 送出（避免 non-blocking 在 PHP 結束前被中斷）。
 */
function psa_schedule_revalidate(?string $slug = null): void {
  if (!psa_revalidate_secret()) {
    return;
  }

  if (!isset($GLOBALS['psa_revalidate_slugs'])) {
    $GLOBALS['psa_revalidate_slugs'] = [];
  }

  if ($slug) {
    $GLOBALS['psa_revalidate_slugs'][$slug] = true;
  } else {
    $GLOBALS['psa_revalidate_slugs']['*'] = true;
  }

  static $hooked = false;
  if (!$hooked) {
    $hooked = true;
    add_action('shutdown', 'psa_send_revalidate_requests', 0);
  }
}

function psa_send_revalidate_requests(): void {
  $secret = psa_revalidate_secret();
  if (!$secret) {
    return;
  }

  $queued = $GLOBALS['psa_revalidate_slugs'] ?? [];
  if (empty($queued)) {
    return;
  }

  $slugs = array_keys($queued);
  $targets = in_array('*', $slugs, true)
    ? [null]
    : array_values(array_filter($slugs, static fn($s) => $s !== '*'));

  foreach ($targets as $slug) {
    $url = psa_site_url() . '/api/revalidate?secret=' . rawurlencode($secret);
    if ($slug) {
      $url .= '&slug=' . rawurlencode($slug);
    }

    $response = wp_remote_get($url, [
      'timeout' => 12,
      'blocking' => true,
      'headers' => [
        'x-revalidate-secret' => $secret,
      ],
    ]);

    if (is_wp_error($response)) {
      error_log('PSA Revalidate failed: ' . $response->get_error_message());
      continue;
    }

    $code = (int) wp_remote_retrieve_response_code($response);
    if ($code < 200 || $code >= 300) {
      $body = wp_remote_retrieve_body($response);
      error_log("PSA Revalidate HTTP {$code}: {$body}");
    }
  }

  $GLOBALS['psa_revalidate_slugs'] = [];
}

function psa_should_revalidate_post(WP_Post $post): bool {
  return $post->post_type === 'post';
}

function psa_revalidate_for_post(WP_Post $post): void {
  if (!psa_should_revalidate_post($post)) {
    return;
  }
  if ($post->post_status !== 'publish') {
    return;
  }
  psa_schedule_revalidate($post->post_name ?: null);
}

function psa_revalidate_on_save(int $post_id, WP_Post $post, bool $update): void {
  unset($update);
  if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
    return;
  }
  psa_revalidate_for_post($post);
}

function psa_revalidate_after_insert(WP_Post $post, bool $update, ?WP_Post $before): void {
  unset($update, $before);
  if (wp_is_post_revision($post) || wp_is_post_autosave($post->ID)) {
    return;
  }
  psa_revalidate_for_post($post);
}

function psa_revalidate_on_delete(int $post_id): void {
  $post = get_post($post_id);
  if (!$post instanceof WP_Post || !psa_should_revalidate_post($post)) {
    return;
  }
  psa_schedule_revalidate($post->post_name ?: null);
}

function psa_revalidate_on_status(string $new_status, string $old_status, WP_Post $post): void {
  if (!psa_should_revalidate_post($post)) {
    return;
  }
  if ($new_status === 'publish' || $old_status === 'publish') {
    psa_schedule_revalidate($post->post_name ?: null);
  }
}

function psa_revalidate_admin_notice(): void {
  if (!current_user_can('manage_options') || psa_revalidate_secret()) {
    return;
  }
  echo '<div class="notice notice-warning"><p><strong>Pin Shi Academy Revalidate：</strong>尚未設定 <code>PSA_REVALIDATE_SECRET</code>，官網學習專欄不會在文章更新後即時同步。請在 <code>wp-config.php</code> 加入密鑰（需與 Vercel 的 <code>REVALIDATE_SECRET</code> 相同）。</p></div>';
}

add_action('save_post', 'psa_revalidate_on_save', 20, 3);
add_action('wp_after_insert_post', 'psa_revalidate_after_insert', 20, 3);
add_action('before_delete_post', 'psa_revalidate_on_delete', 20, 1);
add_action('transition_post_status', 'psa_revalidate_on_status', 20, 3);
add_action('admin_notices', 'psa_revalidate_admin_notice');

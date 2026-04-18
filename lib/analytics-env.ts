function trimOrUndefined(value: string | undefined): string | undefined {
  const v = value?.trim();
  return v ? v : undefined;
}

export function getGa4MeasurementId(): string | undefined {
  return trimOrUndefined(process.env.NEXT_PUBLIC_GA4_ID);
}

export function getGoogleSiteVerificationToken(): string | undefined {
  return (
    trimOrUndefined(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION) ??
    trimOrUndefined(process.env.GOOGLE_SITE_VERIFICATION)
  );
}

/** 首頁 Link 標頭（與 Next 的 preload Link 並存，需 append） */
export const HOMEPAGE_LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</openapi.json>; rel="service-desc"',
  '</llms.txt>; rel="service-doc"',
  '</llms.txt>; rel="describedby"',
].join(", ");

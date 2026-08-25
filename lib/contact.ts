/** 全站統一聯絡與登記資訊 */
export const CONTACT = {
  email: "service@pinshiacademy.com",
  postalCode: "11051",
  /** 公司登記地址，非實體上課地點 */
  registeredAddress: "台北市信義區信義路四段415號14樓之一",
  registeredAddressNote:
    "此為公司登記地址；品識學苑以線上教學為主，無實體教室對外開放",
  companyName: "品識教育科技有限公司",
  taxId: "62160059",
} as const;

export function formatRegisteredAddress(): string {
  return `${CONTACT.postalCode} ${CONTACT.registeredAddress}`;
}

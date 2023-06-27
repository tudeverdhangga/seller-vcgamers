export function priceFormat(value: number, currency = "IDR", lng = "id-ID") {
  return Intl.NumberFormat(lng, {
    style: "currency",
    currency,
    maximumSignificantDigits: 3,
  }).format(value);
}

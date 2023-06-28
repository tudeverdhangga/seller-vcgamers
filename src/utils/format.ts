export function priceFormat(value: number, currency = "IDR", lng = "id-ID") {
  return Intl.NumberFormat(lng, {
    style: "currency",
    currency,
    maximumSignificantDigits: 3,
  }).format(value);
}

export function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

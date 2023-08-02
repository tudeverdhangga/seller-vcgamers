export function priceFormat(value: number, currency = "IDR", lng = "id-ID") {
  return Intl.NumberFormat(lng, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(value);
}

export function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function parenthesesNumber(value = 0) {
  if (value === 0) return "";

  return `(${value})`;
}

export function dateToTime(dateString: string) {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;

  return time
}
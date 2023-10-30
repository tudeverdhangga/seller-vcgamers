export function priceFormat(value: number, currency = "IDR", lng = "id-ID") {
  const formattedValue =  Intl.NumberFormat(lng, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(value);

  return formattedValue.replace(/\s/g, "");
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

export function shortDateFormat(dateString: string) {
  const date = new Date(dateString);

  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const formattedDate = `${day} ${month as string} ${year}`;

  return formattedDate
}

export function fullDateFormat(dateString: string) {
  const date = new Date(dateString);

  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const formattedDate = `${day} ${month as string} ${year}, ${hour}:${minute < 10 ? '0' : ''}${minute}`;

  return formattedDate
}

export function diffDateInTime(dateString: string) {
  const currentDate = new Date();
  const targetDate = new Date(dateString);
  const timeDifference = targetDate.getTime() - currentDate.getTime();
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

  if (hoursDifference > 24) {
    const days = hoursDifference / 24
    const hours = hoursDifference % 24

    if (hours > 0) {
      return(`${days} Hari ${hours} jam`);
    }
    return(`${days} Hari`);
  }
  return(`${hoursDifference} Jam`);
}

export function diffDateInDays(dateString: string) {
  const currentDate = new Date();
  const targetDate = new Date(dateString);
  const timeDifference = targetDate.getTime() - currentDate.getTime();
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

  return(`${hoursDifference} hours`);
}

export function getCurrentTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  const timestamp = `${year}${month}${day}_${hours}${minutes}`;
  return timestamp;
}
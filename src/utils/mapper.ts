export function mimeMapper(value: string | undefined) {
  if (value?.startsWith("image")) {
    return "IMAGE";
  }

  if (value?.startsWith("video")) {
    return "VIDEO";
  }

  if (value?.startsWith("application")) {
    return "DOCUMENT";
  }

  return "DOCUMENT";
}

// Don't use for unique id in database
export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function axiosErrorMapper(error: any): string {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  return error.response.data.message as string;
}

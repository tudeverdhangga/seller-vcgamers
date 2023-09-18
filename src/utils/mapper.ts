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

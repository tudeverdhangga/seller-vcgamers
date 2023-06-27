export const setLangCookie = (locale: string, cookieName = "NEXT_LOCALE") => {
  if (typeof document !== "undefined" && typeof window !== "undefined") {
    document.cookie = `${cookieName}=${locale}; max-age=31536000; path=/`;
  }
};

export const getLangCookie = (cookieName = "NEXT_LOCALE") => {
  if (typeof document !== "undefined" && typeof window !== "undefined") {
    const b = document.cookie.match(
      "(^|;)\\s*" + cookieName + "\\s*=\\s*([^;]+)"
    );

    return b ? b.pop() : "ID";
  }

  return "ID";
};

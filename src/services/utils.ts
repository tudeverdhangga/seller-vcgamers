import type { APIApiResponsePagination, APIResponsePagination } from "./types";

export const apiPaginationNextPageParam = <T>(
  currentPage: APIApiResponsePagination<T>
) => {
  return currentPage.paginate.total === currentPage.paginate.limit
    ? `${currentPage.paginate.page + 1}`
    : undefined;
};

export const paginationNextPageParam = <T>(
  currentPage: APIResponsePagination<T>
) => {
  const nextCursor = currentPage.data.pagination_data.next_cursor;

  return nextCursor === "" ? undefined : nextCursor;
};

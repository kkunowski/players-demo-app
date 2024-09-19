export interface PaginatedItems<T> {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  items: T[];
}
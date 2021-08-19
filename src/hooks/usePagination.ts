import { useContext } from 'react';

import { PaginationContext } from '../contexts/Pagination';

export function usePagination() {
  return useContext(PaginationContext);
}

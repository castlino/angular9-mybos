import { Case } from './case';

export interface PaginatedCases {
  count: number;
  page: number;
  start: number;
  end: number;
  total: number;
  maxPage: number;
  cases: Case[]
}
type TYPE =
  | 'micro'
  | 'nano'
  | 'regional'
  | 'brewpub'
  | 'large'
  | 'planning'
  | 'bar'
  | 'contract'
  | 'proprietor'
  | 'closed';

type SORT = 'asc' | 'desc';

type SORT_TYPE = "name" | TYPE

export type { TYPE, SORT, SORT_TYPE };
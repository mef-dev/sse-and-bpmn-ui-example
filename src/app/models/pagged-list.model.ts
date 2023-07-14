export class PaggedList<T>{
    pageIndex: number;
	pageSize: number;
	totalCount: number;
	totalPages: number;
	items: T[];
}

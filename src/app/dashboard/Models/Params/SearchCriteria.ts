export class SearchCriteria {
    page: number;
    size: number;
    sort: string | null;
    order: string | null;

    constructor(page: number = 0, size: number = 10, sort: string | null = null, order: string | null = null) {
        this.page = page;
        this.size = size;
        this.sort = sort;
        this.order = order;
    }

    getPageable(): Pageable {
        let sortParam = null;
        if (this.sort) {
            sortParam = this.order?.toLowerCase() === 'desc'
                ? { [this.sort]: 'desc' }
                : { [this.sort]: 'asc' };
        }

        const pageable: Pageable = {
            page: this.page >= 1 ? this.page - 1 : 0,
            size: this.size > 0 ? this.size : 10,
            sort: sortParam,
        };

        return pageable;
    }

    getStart(): number {
        if (this.page > 0) {
            return (this.page - 1) * this.size;
        }
        return 0;
    }
}

// TypeScript interface to represent Pageable structure
interface Pageable {
    page: number;
    size: number;
    sort: { [key: string]: string } | null;
}

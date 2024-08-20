export interface IGetProductsParams {
    page: number;
    limit: number;
    search?: string;
    sort?: string;
    categoryNames?: string[];
    priceFrom?: number | string;
    priceTo?: number | string;
    ratingFrom?: number | string;
    ratingTo?: number | string;
}

export default function getProductsParams(args: IGetProductsParams): URLSearchParams {
    const queryParams = new URLSearchParams();

    if (args.search) {
        queryParams.append('search', args.search);
    }

    queryParams.append('page', args.page.toString());
    queryParams.append('limit', args.limit.toString());

    if (args.sort) {
        queryParams.append('sort', args.sort + ':asc');
    }
    if (args.categoryNames) {
        args.categoryNames.forEach((categoryName) => {
            queryParams.append('categoryNames', categoryName);
        });
    }
    if (args.priceFrom) {
        queryParams.append('priceFrom', args.priceFrom.toString());
    }
    if (args.priceTo) {
        queryParams.append('priceTo', args.priceTo.toString());
    }
    if (args.ratingFrom) {
        queryParams.append('ratingFrom', args.ratingFrom.toString());
    }
    if (args.ratingTo) {
        queryParams.append('ratingTo', args.ratingTo.toString());
    }

    return queryParams;
}

export interface INavigationItems {
    fieldName: string;
    pathName: string;
}

export interface ITextData {
    productDetailedCard: string[];
}

export interface IFormFields {
    labelName: string;
    type: string;
    fieldName: string;
    placeholder?: string;
}

export interface ISelectFields {
    labelName: string;
    fieldName: string;
    multiple: boolean;
}

export interface ILoadParams {
    firstPage: number;
    limit: number;
}

export interface IFilters {
    search?: string;
    sort?: string;
    categoryNames?: string[];
    priceFrom?: number | string;
    priceTo?: number | string;
    ratingFrom?: number | string;
    ratingTo?: number | string;
}

export interface IResultValidateCart {
    minPrice: {
        isValid: boolean;
        error: string;
    };
    maxPrice: {
        isValid: boolean;
        error: string;
    };
    warnQuantity: {
        isWarning: boolean;
        warning: string;
        productId: string[];
    };
    maxQuantity: {
        isValid: boolean;
        error: string;
        productId: string[];
    };
}

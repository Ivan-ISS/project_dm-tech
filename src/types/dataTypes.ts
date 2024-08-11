export interface INavigationItems {
    fieldName: string;
    pathName: string;
}

export interface ITextData {
    productDetailedCard: string[];
}

export interface ILoadParams {
    firstPage: number;
    limit: number;
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
import { productsLoadParams } from '@/data';
import { IMeta, IProduct, IGetProducts, IError } from '@/types/entityTypes';
import { IFilters } from '@/types/dataTypes';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import getProductsParams from '@/utils/getProductsParams';
import routes from '@/routes';

export interface FetchProductsError {
    message: string;
}

export interface FetchProductsArgs extends IFilters {
    page: number;
    limit: number;
}

export const fetchProducts = createAsyncThunk<
    IGetProducts,
    FetchProductsArgs,
    { rejectValue: FetchProductsError | undefined }
>('products/fetch', async (args, thunkAPI) => {
    try {
        const response = await fetch(
            `${routes.urlProducts()}?${getProductsParams(args).toString()}`,
            {
                method: 'GET',
                credentials: 'include',
            }
        );

        if (!response.ok) {
            const error: IError = await response.json();
            console.log('Ошибка ответа (статус не 200): ', error);
            return thunkAPI.rejectWithValue({ message: error.error } as FetchProductsError);
        }

        const data: IGetProducts = await response.json();
        // console.log('Данные с сервера: ', data);
        return data;
    } catch (error) {
        console.log('Ошибки асинхроннго кода: ', error);
        return thunkAPI.rejectWithValue({ message: error } as FetchProductsError);
    }
});

export interface IState {
    products: IProduct[];
    meta: IMeta | null;
    params: {
        limit: number;
        currentPage: number;
        totalProducts: number;
        totalPages: number;
        sortFields: string[];
    };
    isPagination: boolean;
    status: 'not started' | 'in progress' | 'successfully' | 'download failed';
    error: string;
}

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        meta: null,
        params: {
            limit: productsLoadParams.limit,
            currentPage: productsLoadParams.firstPage,
            totalProducts: 0,
            totalPages: 0,
            sortFields: [],
        },
        isPagination: false,
        status: 'not started',
        error: '',
    } as IState,
    reducers: {
        changePagination: (state) => {
            state.isPagination = !state.isPagination;
            state.products = [];
            state.params.currentPage = 1;
        },
        increasePage: (state) => {
            state.params.currentPage += 1;
        },
        resetProducts: (state) => {
            state.products = [];
            state.params.currentPage = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'in progress';
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IGetProducts>) => {
                state.status = 'successfully';
                if (!state.isPagination) {
                    for (let i = 0; i < action.payload.data.length; i++) {
                        state.products = [...state.products, action.payload.data[i]];
                    }
                } else {
                    state.products = action.payload.data;
                }
                state.meta = action.payload.meta;
                state.params.totalProducts = action.payload.meta.total;
                state.params.totalPages = Math.ceil(
                    state.params.totalProducts / state.params.limit
                );
                state.params.sortFields = action.payload.meta.sort.availableFields;
            })
            .addCase(
                fetchProducts.rejected,
                (state, action: PayloadAction<FetchProductsError | undefined>) => {
                    state.status = 'download failed';
                    if (action.payload) {
                        state.error = action.payload.message;
                    }
                }
            );
    },
});

export const { increasePage, changePagination, resetProducts } = productsSlice.actions;

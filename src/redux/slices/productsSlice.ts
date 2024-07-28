import { IMeta, IProduct, IGetProducts, IError } from '@/types/entityTypes';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import routes from '@/routes';

export interface FetchProductsError {
    message: string;
}

export interface FetchProductsArgs {
    page: number;
    limit: number;
}

export const fetchProducts = createAsyncThunk<
    IGetProducts,
    FetchProductsArgs,
    { rejectValue: FetchProductsError | undefined }
>(
    'products/fetch',
    async (args, thunkAPI) => {
        try {
            const response = await fetch(`${routes.urlProducts()}?page=${args.page}&limit=${args.limit}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                const error: IError = await response.json();
                console.log('Ошибка ответа (статус не 200): ', error);
                return thunkAPI.rejectWithValue({ message: error.error } as FetchProductsError);
            }

            const data: IGetProducts = await response.json();
            console.log('Данные с сервера: ', data);
            return data;
        } catch (error) {
            console.log('Ошибки асинхроннго кода: ', error);
            return thunkAPI.rejectWithValue({message: error} as FetchProductsError);
        }
    }
);

export interface IState {
    products: IProduct[];
    meta: IMeta | null;
    queryParams: {
        limit: number;
        currentPage: number;
    };
    totalProducts: number;
    status: 'not started' | 'in progress' | 'successfully' | 'download failed';
    error: string;
}

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        meta: null,
        queryParams: {
            limit: 15,
            currentPage: 1,
        },
        totalProducts: 0,
        status: 'not started',
        error: '',
    } as IState,
    reducers: {
        increasePage: (state) => {
            state.queryParams.currentPage += 1;
        },
    },
    extraReducers: (builder) => {
        builder.
            addCase(fetchProducts.pending, (state) => {
                state.status = 'in progress';
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IGetProducts>) => {
                state.status = 'successfully';
                for (let i = 0; i < action.payload.data.length; i++) {
                    state.products = [ ... state.products, action.payload.data[i]];
                }
                state.meta = action.payload.meta;
                state.totalProducts = action.payload.meta.total;
            })
            .addCase(fetchProducts.rejected, (state, action: PayloadAction<FetchProductsError | undefined>) => {
                state.status = 'download failed';
                if (action.payload) {
                    state.error = action.payload.message;
                }
            });
    }
});

export const { increasePage } = productsSlice.actions;
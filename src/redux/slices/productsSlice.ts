import { IMeta, IProduct, IGetProducts, IError } from '@/types/entityTypes';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import routes from '@/routes';

export interface FetchProductsError {
    message: string;
}

export const fetchProducts = createAsyncThunk<
    IGetProducts,
    void,
    { rejectValue: FetchProductsError | undefined }
>(
    'products/fetch',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${routes.urlProducts()}?page=1&limit=15`, {
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
        status: 'not started',
        error: '',
    } as IState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.
            addCase(fetchProducts.pending, (state) => {
                state.status = 'in progress';
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IGetProducts>) => {
                state.status = 'successfully';
                state.products = action.payload.data;
                state.meta = action.payload.meta;
            })
            .addCase(fetchProducts.rejected, (state, action: PayloadAction<FetchProductsError | undefined>) => {
                state.status = 'download failed';
                if (action.payload) {
                    state.error = action.payload.message;
                }
            });
    }
});
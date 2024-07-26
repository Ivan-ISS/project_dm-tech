import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import routes from '@/routes';

export interface FetchProductsError {
    message: string;
}

export const fetchProducts = createAsyncThunk<
    [],
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
                const error = await response.json();
                console.log('Ошибка ответа (статус не 200): ', error);
                return thunkAPI.rejectWithValue({ message: error } as FetchProductsError);
            }

            const data = await response.json();
            console.log('Данные с сервера: ', data);
            return data;
        } catch (error) {
            console.log('Ошибки асинхроннго кода: ', error);
            return thunkAPI.rejectWithValue({message: error} as FetchProductsError);
        }
    }
);

export interface IState {
    products: [];
    status: 'not started' | 'in progress' | 'successfully' | 'download failed';
    error: string;
}

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
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
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'successfully';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action: PayloadAction<FetchProductsError | undefined>) => {
                state.status = 'download failed';
                if (action.payload) {
                    state.error = action.payload.message;
                }
            });
    }
});
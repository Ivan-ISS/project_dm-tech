import { IProduct, IError } from '@/types/entityTypes';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import routes from '@/routes';

export interface FetchProductError {
    message: string;
}

export interface FetchProductArgs {
    id: string;
}

export const fetchProduct = createAsyncThunk<
    IProduct,
    FetchProductArgs,
    { rejectValue: FetchProductError | undefined }
>('product/fetch', async (args, thunckAPI) => {
    try {
        const response = await fetch(`${routes.urlProducts()}/${args.id}`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            const error: IError = await response.json();
            console.log('Ошибка ответа (статус не 200): ', error);
            return thunckAPI.rejectWithValue({ message: error.error } as FetchProductError);
        }

        const data: IProduct = await response.json();
        console.log('Данные с сервера: ', data);
        return data;
    } catch (error) {
        console.log('Ошибки асинхроннго кода: ', error);
        return thunckAPI.rejectWithValue({ message: error } as FetchProductError);
    }
});

export interface IState {
    product: IProduct;
    status: 'not started' | 'in progress' | 'successfully' | 'download failed';
    error: string;
}

export const productItemSlice = createSlice({
    name: 'product',
    initialState: {
        product: {},
        status: 'not started',
        error: '',
    } as IState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.status = 'in progress';
                state.error = '';
            })
            .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<IProduct>) => {
                state.status = 'successfully';
                state.product = action.payload;
                state.error = '';
            })
            .addCase(
                fetchProduct.rejected,
                (state, action: PayloadAction<FetchProductError | undefined>) => {
                    state.status = 'download failed';
                    if (action.payload) {
                        state.error = action.payload.message;
                    }
                }
            );
    },
});

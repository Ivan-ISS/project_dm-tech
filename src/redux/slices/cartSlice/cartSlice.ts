import { IError, IUpdateCart, IGetCart } from '@/types/entityTypes';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import hasProductInReqArgs from '@/utils/hasProductInReqArgs';
import prepareDataToCartReqArgs from '@/utils/prepareDataToCartReqArgs';
import routes from '@/routes';

export interface UpdateCartError {
    message: string;
}

export interface UpdateCartArgs {
    args: IUpdateCart;
}

export const updateCart = createAsyncThunk<
    IGetCart[],
    IUpdateCart,
    { rejectValue: UpdateCartError | undefined }
>(
    'updateCart/fetch',
    async (args, thunkAPI) => {
        try {
            const response = await fetch(routes.urlUpdateCart(), {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(args),
            });
            
            if (!response.ok) {
                const error: IError = await response.json();
                console.log('Ошибка ответа (статус не 200): ', error);
                return thunkAPI.rejectWithValue({ message: error.error } as UpdateCartError);
            }

            const data: IGetCart[] = await response.json();
            console.log('Данные с сервера: ', data);
            return data;
        } catch (error) {
            console.log('Ошибки асинхроннго кода: ', error);
            return thunkAPI.rejectWithValue({ message: error } as UpdateCartError);
        }
    }
);

export interface IState {
    cart: IGetCart[];
    cartReqArgs: IUpdateCart;
    status: 'not started' | 'in progress' | 'successfully' | 'download failed';
    error: string;
}

export const cartSlice = createSlice({
    name: 'updateCart',
    initialState: {
        cart: [],
        cartReqArgs: {
            data: [],
        },
        status: 'not started',
        error: '',
    } as IState,
    reducers: {
        addToCartReqArgs: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
            state.cartReqArgs = prepareDataToCartReqArgs(state.cart);   // чтобы инф-я была всегда актуальной в store
            if (!hasProductInReqArgs(state.cartReqArgs, action.payload.id)) {
                state.cartReqArgs.data = [
                    ...state.cartReqArgs.data,
                    { id: action.payload.id, quantity: action.payload.quantity }
                ];
            } else {
                const index = state.cartReqArgs.data.findIndex(item => item.id === action.payload.id);
                if (action.payload.quantity < 1) {
                    state.cartReqArgs.data.splice(index, 1);
                } else {
                    state.cartReqArgs.data[index].quantity = action.payload.quantity;
                }
            }
            console.log('state.cartReqArgs.data: ', state.cartReqArgs.data);
        }
    },
    extraReducers: (builder) => {
        builder.
            addCase(updateCart.pending, (state) => {
                state.status = 'in progress';
            }).
            addCase(updateCart.fulfilled, (state, action: PayloadAction<IGetCart[]>) => {
                state.status = 'successfully';
                state.cart = action.payload;
            }).
            addCase(updateCart.rejected, (state, action: PayloadAction<UpdateCartError | undefined>) => {
                state.status = 'download failed';
                if (action.payload) {
                    state.error = action.payload.message;
                }
            });
    }
});

export const { addToCartReqArgs } = cartSlice.actions;
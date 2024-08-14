import { IError, IUpdateCart, IGetCart } from '@/types/entityTypes';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import hasProductInReqArgs from '@/utils/hasProductInReqArgs';
import prepareDataToCart from '@/utils/prepareDataToCart';
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

export const getCart = createAsyncThunk<
    IGetCart[] | undefined,
    void,
    { rejectValue: undefined }
>(
    'getCart/fetch',
    async () => {
        try {
            const response = await fetch(routes.urlGetCart(), {
                method: 'GET',
                credentials: 'include',
            });
            
            if (!response.ok) {
                const error: IError = await response.json();
                console.log('Ошибка ответа (статус не 200): ', error);
            }

            const data: IGetCart[] = await response.json();
            console.log('Данные с сервера: ', data);
            return data;
        } catch (error) {
            console.log('Ошибки асинхроннго кода: ', error);
        }
    }
);

export interface IState {
    cart: IGetCart[];
    cartState: IUpdateCart;
    totalPrice: number;
    limitPrice: number;
    status: 'not started' | 'in progress' | 'successfully' | 'download failed';
    error: string;
}

export const cartSlice = createSlice({
    name: 'updateCart',
    initialState: {
        cart: [],
        cartState: {
            data: [],
        },
        totalPrice: 0,
        limitPrice: 50000,
        status: 'not started',
        error: '',
    } as IState,
    reducers: {
        addToCart: (state, action: PayloadAction<{ id: string, quantity: number }[]>) => {
            state.cartState = prepareDataToCart(state.cart);   // чтобы инф-я была всегда актуальной в store
            for (let i = 0; i < action.payload.length; i++) {
                if (!hasProductInReqArgs(state.cartState, action.payload[i].id)) {
                    state.cartState.data = [
                        ...state.cartState.data,
                        { id: action.payload[i].id, quantity: action.payload[i].quantity }
                    ];
                } else {
                    const index = state.cartState.data.findIndex(item => item.id === action.payload[i].id);
                    if (action.payload[i].quantity < 0) {
                        state.cartState.data.splice(index, 1);
                    } else {
                        state.cartState.data[index].quantity = action.payload[i].quantity;
                    }
                }
            }
            console.log('state.cartState.data: ', state.cartState.data);
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
                state.totalPrice = state.cart.reduce((sum, item) => {
                    return sum + item.quantity * item.product.price;
                }, 0);
            }).
            addCase(updateCart.rejected, (state, action: PayloadAction<UpdateCartError | undefined>) => {
                state.status = 'download failed';
                if (action.payload) {
                    state.error = action.payload.message;
                }
            }).
            addCase(getCart.pending, (state) => {
                state.status = 'in progress';
            }).
            addCase(getCart.fulfilled, (state, action: PayloadAction<IGetCart[] | undefined>) => {
                state.status = 'successfully';
                if (action.payload) {
                    state.cart = action.payload;
                }
                state.totalPrice = state.cart.reduce((sum, item) => {
                    return sum + item.quantity * item.product.price;
                }, 0);
                state.cartState = prepareDataToCart(state.cart);
            }).
            addCase(getCart.rejected, (state) => {
                state.status = 'download failed';
            });
    }
});

export const { addToCart } = cartSlice.actions;
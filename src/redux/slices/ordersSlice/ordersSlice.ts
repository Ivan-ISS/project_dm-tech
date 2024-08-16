import { ordersLoadParams } from '@/data';
import { IOrderInfo, IGetOrder, IMeta, IError } from '@/types/entityTypes';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import routes from '@/routes';

export interface FetchSubmitCartError {
    message: string;
}

export const fetchSubmitCart = createAsyncThunk<
    IOrderInfo[],
    void,
    { rejectValue: FetchSubmitCartError | undefined }
>(
    'submitCart/fetch',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(routes.urlSubmitCart(), {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                const error: IError = await response.json();
                console.log('Ошибка ответа (статус не 200): ', error);
                return thunkAPI.rejectWithValue({ message: error.error } as FetchSubmitCartError);
            }

            const data: IOrderInfo[] = await response.json();
            console.log('Данные с сервера: ', data);
            return data;
        } catch (error) {
            console.log('Ошибки асинхроннго кода: ', error);
            return thunkAPI.rejectWithValue({ message: error } as FetchSubmitCartError);
        }
    }
);

export interface FetchOrdersError {
    message: string;
}

export interface FetchOrdersArgs {
    page: number;
    limit: number;
}

export const fetchOrders = createAsyncThunk<
    IGetOrder,
    FetchOrdersArgs,
    { rejectValue: FetchSubmitCartError | undefined }
>(
    'orders/fetch',
    async (args, thunkAPI) => {
        try {
            const response = await fetch(`${routes.urlGetOrders()}?page=${args.page}&limit=${args.limit}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                const error: IError = await response.json();
                console.log('Ошибка ответа (статус не 200): ', error);
                return thunkAPI.rejectWithValue({ message: error.error } as FetchOrdersError);
            }

            const data: IGetOrder = await response.json();
            console.log('Данные с сервера: ', data);
            return data;
        } catch (error) {
            console.log('Ошибки асинхроннго кода: ', error);
            return thunkAPI.rejectWithValue({ message: error } as FetchOrdersError);
        }
    }
);

export interface IState {
    orders: IOrderInfo[][];
    singleOrder: IOrderInfo[];
    meta: IMeta | null;
    params: {
        limit: number;
        currentPage: number;
        totalOrders: number;
    };
    status: 'not started' | 'in progress' | 'successfully' | 'download failed';
    error: string;
}

export const ordersSlice = createSlice({
    name: 'oredersSlice',
    initialState: {
        orders: [],
        singleOrder: [],
        meta: null,
        params: {
            limit: ordersLoadParams.limit,
            currentPage: ordersLoadParams.firstPage,
            totalOrders: 0,
        },
        status: 'not started',
        error: '',
    } as IState,
    reducers: {
        increasePage: (state) => {
            state.params.currentPage += 1;
        },
    },
    extraReducers: (builder) => {
        builder.
            addCase(fetchSubmitCart.pending, (state) => {
                state.status = 'in progress';
            }).
            addCase(fetchSubmitCart.fulfilled, (state, action: PayloadAction<IOrderInfo[]>) => {
                state.status = 'successfully';
                state.singleOrder = action.payload;
                if (state.params.currentPage > Math.ceil(state.params.totalOrders / state.params.limit)) {
                    state.orders = [ ... state.orders, action.payload ];
                }
            }).
            addCase(fetchSubmitCart.rejected, (state, action: PayloadAction<FetchSubmitCartError | undefined>) => {
                state.status = 'download failed';
                if (action.payload) {
                    state.error = action.payload.message;
                }
            }).
            addCase(fetchOrders.pending, (state) => {
                state.status = 'in progress';
            }).
            addCase(fetchOrders.fulfilled, (state, action: PayloadAction<IGetOrder>) => {
                state.status = 'successfully';
                for (let i = 0; i < action.payload.data.length; i++) {
                    state.orders = [ ... state.orders, action.payload.data[i]];
                }
                state.meta = action.payload.meta;
                state.params.totalOrders = action.payload.meta.total;
            }).
            addCase(fetchOrders.rejected, (state, action: PayloadAction<FetchOrdersError | undefined>) => {
                state.status = 'download failed';
                if (action.payload) {
                    state.error = action.payload.message;
                }
            });
    }
});

export const { increasePage } = ordersSlice.actions;
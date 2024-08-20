import { TGetCategories, IError } from '@/types/entityTypes';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import routes from '@/routes';

export const fetchCategories = createAsyncThunk<
    TGetCategories | undefined,
    void,
    { rejectValue: undefined }
>('categories/fetch', async () => {
    try {
        const response = await fetch(routes.urlGetCategories());

        if (!response.ok) {
            const error: IError = await response.json();
            console.log('Ошибка ответа (статус не 200): ', error);
        }

        const data: TGetCategories = await response.json();
        console.log('Данные с сервера: ', data);
        return data;
    } catch (error) {
        console.log('Ошибки асинхроннго кода: ', error);
    }
});

export interface IState {
    categories: TGetCategories;
    status: 'not started' | 'in progress' | 'successfully' | 'download failed';
    error: string;
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        status: 'not started',
        error: '',
    } as IState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'in progress';
            })
            .addCase(
                fetchCategories.fulfilled,
                (state, action: PayloadAction<TGetCategories | undefined>) => {
                    state.status = 'successfully';
                    if (action.payload) {
                        state.categories = action.payload;
                    }
                }
            )
            .addCase(fetchCategories.rejected, (state) => {
                state.status = 'download failed';
            });
    },
});

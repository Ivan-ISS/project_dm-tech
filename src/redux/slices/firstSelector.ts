import { RootState } from '../store';

export const selectCounter = (state: RootState) => state.first.counter;
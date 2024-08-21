import { RootState } from '../../store';

export const selectScrollPosition = (state: RootState) => state.userData.scrollPosition;
export const selectPagePosition = (state: RootState) => state.userData.pagePosition;
export const selectFiltersPanelShow = (state: RootState) => state.userData.filtersPanelShow;

import {
	createSlice,
	PayloadAction,
	createEntityAdapter,
} from '@reduxjs/toolkit';
import { UserInfo } from '../../types/user';
import { RequestState } from '../../types/request';
import { RootState } from '../store';

export type StoreState = {
	userInfo: UserInfo | null;
	userInfoRequestState: RequestState;
};

const initialState: StoreState = {
	userInfo: null,
	userInfoRequestState: RequestState.IDLE,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<UserInfo>) => {
			state.userInfo = action.payload;
		},

		setUserInfoRequestState: (state, action: PayloadAction<RequestState>) => {
			state.userInfoRequestState = action.payload;
		},

		clearCredentials: (state) => {
			state.userInfo = initialState.userInfo;
		},
	},
});

export const { setCredentials, clearCredentials, setUserInfoRequestState } =
	authSlice.actions;

export const selectUserInfo = (state: RootState) => state.auth.userInfo;

export default authSlice.reducer;

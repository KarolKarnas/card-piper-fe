export enum RequestState {
	IDLE = 'IDLE',
	LOADING = 'LOADING',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
}

export type QuotesRequestParams = {
	skip: number;
	take: number;
};

export type SignupRequestParams = {
	email: string;
	password: string;
};
export type SigninRequestParams = {
	email: string;
	password: string;
};

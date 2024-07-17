import { useEffect } from 'react';
import { useGetQuotesQuery } from '../../../lib/api/quotesApi';
import { useAppDispatch } from '../../../lib/hooks';
import { setAllQuotes } from '../../../lib/slices/quotesSlice';
// import { QuotesRequestParams } from '../../../types/request';

export const useFetchQuotes = (skip: number, take: number) => {
	const dispatch = useAppDispatch();

	const { data, isFetching, isError, refetch } = useGetQuotesQuery({
		skip,
		take,
	});

	useEffect(() => {
		refetch();
	}, [dispatch, refetch]);

	useEffect(() => {
		if (data) {
			dispatch(setAllQuotes(data));
		}
	}, [data, dispatch]);
};

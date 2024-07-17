import { useSigninMutation } from '../../lib/api/authApi';
import { setCredentials } from '../../lib/slices/authSlice';
import { useAppDispatch } from '../../lib/hooks';
import { SigninRequestParams } from '../../types/request';

export const useSignin = () => {
	const [signin] = useSigninMutation();
	const dispatch = useAppDispatch();

	const handleSignin = async (req: SigninRequestParams) => {
		const { data } = await signin(req);
		if (data) {
			dispatch(setCredentials(data));
		}
	};

	return { handleSignin };
};

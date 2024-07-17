import { useSignupMutation } from '../../lib/api/authApi';
import { setCredentials } from '../../lib/slices/authSlice';
import { useAppDispatch } from '../../lib/hooks';
import { SignupRequestParams } from '../../types/request';

export const useSignup = () => {
	const [signup] = useSignupMutation();
	const dispatch = useAppDispatch();

	const handleSignup = async (req: SignupRequestParams) => {
		const { data } = await signup(req);
		if (data) {
			dispatch(setCredentials(data));
		}
	};

	return { handleSignup };
};

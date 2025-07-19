import { axiosInstanceForAuth as axios } from '@/lib/axios';
import {
  OAuthProfile,
  SignInCredentials,
  SignUpCredentials,
} from '@/types/auth';

export const apiHanldeOAuth = async (profile: OAuthProfile) => {
  try {
    const res = await axios.post('/oauth', profile);
    if (res.status === 200) {
    }
  } catch (err) {
    console.error('[API] Error api handle OAuth: ', err);
  }
};

export const apiSignIn = async (credentials: SignInCredentials) => {
  try {
    const response = await axios.post('/signin', credentials);

    return {
      success: true,
      data: response.data,
    };
  } catch (err: any) {
    console.error('Error sign in: ', err);

    return {
      success: false,
      message: err.response?.data?.message || err.message || 'Sign in failed',
    };
  }
};

export const apiSignUp = async (credentials: SignUpCredentials) => {
  try {
    const response = await axios.post('/signup', credentials);

    return {
      success: true,
      data: response.data,
    };
  } catch (err: any) {
    console.error('Error sign up: ', err);

    return {
      success: false,
      message: err.response?.data?.message || err.message || 'Sign up failed',
    };
  }
};

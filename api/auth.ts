import { axiosInstanceForAuth as axios } from '@/lib/axios';

interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

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

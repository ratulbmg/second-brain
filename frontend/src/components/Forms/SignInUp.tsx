import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '../../components';
import { cn, type StandardErrorResponse } from '../../utils';
import { login } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../redux/slices/AuthSlice';
import type { AppDispatch } from '../../redux/store';
import { jwtDecode, type JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
    name: string;
    uniqueId: string;
}

interface SignInUpProps {
    onSuccess?: () => void;
}

type SigninFormData = {
    email: string;
    password: string;
    name?: string;
};

const SignInUp: React.FC<SignInUpProps> = ({onSuccess}) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<SigninFormData>();
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        setLoginError(null);
        reset();
    };

    const onSubmit = async (data: SigninFormData) => {
        setIsLoading(true);
        setLoginError(null);

        try {
            if (isSignUp) {
                
                // need to create logic for signup

            } else {
                const response = await login(data);
                const decodedToken = jwtDecode<CustomJwtPayload>(response.data.token);


                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', decodedToken.name);
                localStorage.setItem('uniqueId', decodedToken.uniqueId);
                dispatch(setAuth({
                    status: true,
                    token: response.data.token,
                    user: decodedToken.name,
                    uniqueId: decodedToken.uniqueId
                }));
                onSuccess?.();
                navigate('/dashboard');
            }

        } catch (error: unknown) {
            const loginError = error as StandardErrorResponse;
            const errorMessage = loginError.data?.message || `${isSignUp ? 'Sign up' : 'Login'} failed`;
            const errorDetails = loginError.data?.errors;

            setLoginError(errorDetails ? `${errorMessage}: ${errorDetails}` : errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className='h-auto max-w-sm w-[20vw] rounded-xl'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={cn('bg-[#262626] m-auto w-full rounded-lg border-none')}
                >
                    <div className={cn('bg-card rounded-lg border-none p-8 bg-[#171717]')}>
                        <h1 className={cn('text-xl text-white font-semibold')}>
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </h1>
                        <p className={cn('text-sm text-white my-2')}>
                            {isSignUp ? 'Create your account' : 'Enter your email and password'}
                        </p>

                        <div className={cn('mt-6 space-y-4')}>
                            {isSignUp && (
                                <>
                                    <Input
                                        placeholder="Full Name"
                                        {...register('name', {
                                            required: isSignUp ? 'Name is required' : false,
                                        })}
                                    />
                                    {errors.name && <p className={cn('text-red-500 text-sm')}>{errors.name.message}</p>}
                                </>
                            )}
                            <Input
                                placeholder="Email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'Invalid email address'
                                    }
                                })}
                            />
                            {errors.email && <p className={cn('text-red-500 text-sm')}>{errors.email.message}</p>}

                            <Input
                                placeholder="Password"
                                type="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters'
                                    }
                                })}
                            />
                            {errors.password && <p className={cn('text-red-500 text-sm')}>{errors.password.message}</p>}

                            {loginError && <p className={cn('text-red-500 text-sm')}>{loginError}</p>}

                            <div className={cn('w-full h-11 flex justify-center items-center')}>
                                <Button variant="twich" disabled={isLoading}>
                                    {isLoading
                                        ? (isSignUp ? 'Creating...' : 'Signing in...')
                                        : (isSignUp ? 'Sign up' : 'Sign in')
                                    }
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className={cn('h-15 flex justify-center items-center')}>
                        <h1 className={cn('text-[0.9em] text-white')}>
                            {isSignUp ? "Already have an account?" : "Don't have an account?"}
                            <span
                                onClick={toggleMode}
                                className={cn('cursor-pointer font-bold ml-1 hover:text-gray-300 transition-colors')}
                            >
                                {isSignUp ? 'Sign in!' : 'Sign up, it\'s free!'}
                            </span>
                        </h1>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignInUp;
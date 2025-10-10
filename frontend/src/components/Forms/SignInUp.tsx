import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '../../components';
import { login, signup } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../redux/slices/AuthSlice';
import type { AppDispatch } from '../../redux/store';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import type { StandardErrorResponse } from '../../utils';
import { cn } from '../../utils';

interface CustomJwtPayload extends JwtPayload {
    name: string;
    uniqueId: string;
}

interface SignInUpProps {
    onSuccess?: () => void;
}

type FormData = {
    email: string;
    password: string;
    name?: string;
};

const SignInUp: React.FC<SignInUpProps> = ({ onSuccess }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        setLoginError(null);
        reset();
    };

    // Unified auth handler
    const handleAuth = (token: string, decodedToken: CustomJwtPayload) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', decodedToken.name);
        localStorage.setItem('uniqueId', decodedToken.uniqueId);
        dispatch(setAuth({
            status: true,
            token,
            user: decodedToken.name,
            uniqueId: decodedToken.uniqueId
        }));
        onSuccess?.();
        navigate('/dashboard');
    };

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        setLoginError(null);

        try {
            const response = isSignUp
                ? await signup({ ...data, name: data.name!, uniqueId: crypto.randomUUID() })
                : await login(data);

            const decodedToken = jwtDecode<CustomJwtPayload>(response.data.token);
            handleAuth(response.data.token, decodedToken);

        } catch (error: unknown) {
            const apiError = error as StandardErrorResponse;
            const errorMessage = apiError.data?.message || `${isSignUp ? 'Sign up' : 'Login'} failed`;
            const errorDetails = apiError.data?.errors;
            setLoginError(errorDetails ? `${errorMessage}: ${errorDetails}` : errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn('z-[90] flex justify-center items-center')}>
            <form onSubmit={handleSubmit(onSubmit)} className={cn('bg-[#262626] m-auto w-[280px] sm:w-[20em] md:w-[22em] rounded-lg border-2 border-[#2b2b2b] shadow-[1.95px_1.95px_2.6px_rgba(255,255,255,0.4)]')}>
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
                                        required: 'Name is required',
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

                <div className={cn('h-15 flex justify-center items-center px-2')}>
                    <h1 className={cn('text-[0.8em] text-white')}>
                        {isSignUp ? "Already have an account?" : "Don't have an account?"}
                        <span
                            onClick={toggleMode}
                            className={cn('cursor-pointer font-bold ml-1 hover:text-gray-300 transition-colors')}>
                            {isSignUp ? 'Sign in!' : 'Sign up, it\'s free!'}
                        </span>
                    </h1>
                </div>
            </form>
        </div>
    );
};

export default SignInUp;
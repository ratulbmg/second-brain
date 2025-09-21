import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '../../components';
import { cn, type StandardErrorResponse } from '../../utils';
import { login } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

type SigninFormData = {
    email: string;
    password: string;
};

const Signin: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SigninFormData>();
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const navigate = useNavigate()

    const onSubmit = async (data: SigninFormData) => {
        setIsLoading(true);
        setLoginError(null);

        try {
            const response = await login(data);
            console.log('Login successful:', response);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userName', response.data.name);
            navigate('/dashboard');

        } catch (error: unknown) {
            const loginError = error as StandardErrorResponse;
            const errorMessage = loginError.data?.message || 'Login failed';
            const errorDetails = loginError.data?.errors;

            setLoginError(errorDetails ? `${errorMessage}: ${errorDetails}` : errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // const handelThemeChange = () => {
    //     const currentTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    //     document.documentElement.classList.toggle('dark');
    //     localStorage.setItem('theme', currentTheme);
    // }
    
    return (
        <>
            <div className={cn("bg-[url('https://images.unsplash.com/photo-1517547196086-e63b7ae6afb0?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]","bg-center bg-no-repeat bg-cover bg-blend-overlay",'flex flex-col items-center justify-center h-screen w-full relative')}>
                <div className='blurCover absolute inset-0 bg-black/10 backdrop-blur-[1px] flex flex-col items-center justify-center h-screen w-full '>
                    <form 
                        onSubmit={handleSubmit(onSubmit)} 
                        className={cn('bg-[#262626] m-auto max-w-sm w-full rounded-lg border-[1px] border-solid border-[#3B3C3C]')}
                    >
                        <div className={cn('bg-card rounded-lg border-none p-8 bg-[#171717]')}>
                            <h1 className={cn('text-xl text-white font-semibold')}>Sign In</h1>
                            <p className={cn('text-sm text-white my-2')}>Enter your email and password</p>

                            <div className={cn('mt-6 space-y-4')}>
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
                                        {isLoading ? 'Signing in...' : 'Sign in'}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className={cn('h-15 flex justify-center items-center')}>
                            <h1 className={cn('text-[0.9em] text-white')}>
                                Don't have an account?{' '}
                                <span 
                                    onClick={() => navigate('/signup')} 
                                    className={cn('cursor-pointer font-bold')}
                                >
                                    Sign up, it's free!
                                </span>
                            </h1>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signin;
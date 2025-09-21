import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '../../components';
import { cn } from '../../utils';
import { login } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

type SigninFormData = {
    email: string;
    password: string;
};

type LoginError = {
    message: string;
    errors: string | null;
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

            // Store token in localStorage or handle authentication state
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userName', response.data.name);

            // Redirect or update app state here
            navigate('/dashboard');

        } catch (error: unknown) {
            const loginError = error as LoginError;
            setLoginError(loginError.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* <div className={cn('flex flex-col items-center justify-center h-screen w-screen')}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
                    <Input
                        label='Email'
                        placeholder='Email'
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid email address'
                            }
                        })}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                    <Input
                        label='Password'
                        placeholder='Password'
                        type='password'
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters'
                            }
                        })}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                    {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

                    <Button variant='primary' disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Signin'}
                    </Button>
                </form>
            </div> */}
            <div className={cn(' bg-black flex flex-col items-center justify-center h-screen w-full')}>
                <form onSubmit={handleSubmit(onSubmit)} className=" m-auto max-w-sm w-full rounded-lg border-[1px] border-solid border-[#3B3C3C]">
                    <div className="bg-card rounded-lg border p-8 bg-[#171717]">
                        <h1 className="text-xl text-white font-semibold">Sign In</h1>
                        <p className="text-sm text-white">Enter your email and password</p>

                        <div className="mt-6 space-y-4">
                            <Input
                                label='Email'
                                placeholder='Email'
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'Invalid email address'
                                    }
                                })}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                            <Input
                                label='Password'
                                placeholder='Password'
                                type='password'
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters'
                                    }
                                })}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

                            <Button variant='primary' disabled={isLoading}>
                                {isLoading ? 'Signing in...' : 'Signin'}
                            </Button>
                        </div>
                        <h1>Don't have an account? Sign up, it's free!</h1>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Signin;
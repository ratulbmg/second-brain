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
        <div className={cn('flex flex-col items-center justify-center h-screen w-screen')}>
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
        </div>
    );
};

export default Signin;
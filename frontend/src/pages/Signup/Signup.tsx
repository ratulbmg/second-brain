import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '../../components';
import { cn } from '../../utils';
import { login } from '../../services/authService'; // Replace with signup service if available
import { useNavigate } from 'react-router-dom';

type SignupFormData = {
    username: string;
    email: string;
    password: string;
};

type LoginError = {
    message: string;
    errors: string | null;
};

const Signup: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>();
    const [isLoading, setIsLoading] = useState(false);
    const [signupError, setSignupError] = useState<string | null>(null);
    const navigate = useNavigate();

    const onSubmit = async (data: SignupFormData) => {
        setIsLoading(true);
        setSignupError(null);

        try {
            // Replace login with signup service if available
            const response = await login({
                email: data.email,
                password: data.password,
            });
            console.log('Sign up successful:', response);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userName', data.username);

            navigate('/dashboard');
        } catch (error: unknown) {
            const signupError = error as LoginError;
            setSignupError(signupError.message || 'Sign up failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn("bg-[url('https://images.unsplash.com/photo-1517547196086-e63b7ae6afb0?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]","bg-center bg-no-repeat bg-cover bg-blend-overlay",' flex flex-col items-center justify-center h-screen w-full')}>
            <div className='blurCover absolute inset-0 bg-black/10 backdrop-blur-[1px] flex flex-col items-center justify-center h-screen w-full'>
                <form onSubmit={handleSubmit(onSubmit)} className={cn('bg-[#262626] m-auto max-w-sm w-full rounded-lg border-[1px] border-solid border-[#3B3C3C]')}>
                    <div className={cn('bg-card rounded-lg border-none p-8 bg-[#171717]')}>
                        <h1 className={cn('text-xl text-white font-semibold')}>Sign Up</h1>
                        <p className={cn('text-sm text-white my-2')}>Create your account</p>

                        <div className={cn('mt-6 space-y-4')}>
                            <Input
                                placeholder="Username"
                                {...register('username', {
                                    required: 'Username is required',
                                    minLength: {
                                        value: 3,
                                        message: 'Username must be at least 3 characters'
                                    }
                                })}
                            />
                            {errors.username && <p className={cn('text-red-500 text-sm')}>{errors.username.message}</p>}

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

                            {signupError && <p className={cn('text-red-500 text-sm')}>{signupError}</p>}

                            <div className={cn('w-full h-11 flex justify-center items-center')}>
                                <Button variant="twich" disabled={isLoading}>
                                    {isLoading ? 'Signing up...' : 'Sign Up'}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className={cn('h-15 flex justify-center items-center')}>
                        <h1 className={cn('text-[0.9em] text-white')}>
                            Already have an account?{' '}
                            <span onClick={() => navigate('/signin')} className={cn('cursor-pointer font-bold')}>
                                Sign in
                            </span>
                        </h1>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;

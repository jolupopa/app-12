import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState,FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

interface LoginAndRegisterProps {
    status?: string;
    canResetPassword: boolean;
}

const LoginAndRegister: React.FC<LoginAndRegisterProps> = ({ status, canResetPassword }) => {
    const [activeTab, setActiveTab] = useState('login');

    // Forms
    const loginForm = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const registerForm = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    // Submit Handlers
    const handleLoginSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        loginForm.post(route('login'), {
            onFinish: () => loginForm.reset('password'),
        });
    };

    const handleRegisterSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        registerForm.post(route('register'), {
            onFinish: () => registerForm.reset('password', 'password_confirmation'),
        });
    };

    const toggleTab = (tab: 'login' | 'register') => {
        setActiveTab(tab);
    };

    return (
        <AuthLayout title={activeTab === 'login' ? 'Log in to your account' : 'Create an account'}
                    description={activeTab === 'login'
                        ? 'Enter your email and password below to log in'
                        : 'Enter your details below to create your account'}>
            <Head title={activeTab === 'login' ? 'Log in' : 'Register'} />

            <div className="flex justify-center mb-6">
                <button
                    onClick={() => toggleTab('login')}
                    className={`px-4 py-2 rounded-l-md ${activeTab === 'login'
                        ? 'bg-blue-500 text-white'
                        : 'text-blue-500 hover:bg-blue-100'}`}
                >
                    Log in
                </button>
                <button
                    onClick={() => toggleTab('register')}
                    className={`px-4 py-2 rounded-r-md ${activeTab === 'register'
                        ? 'bg-blue-500 text-white'
                        : 'text-blue-500 hover:bg-blue-100'}`}
                >
                    Register
                </button>
            </div>

            {activeTab === 'login' ? (
                <form className="flex flex-col gap-6" onSubmit={handleLoginSubmit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                value={loginForm.data.email}
                                onChange={(e) => loginForm.setData('email', e.target.value)}
                                placeholder="email@example.com"
                            />
                            <InputError message={loginForm.errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                {canResetPassword && (
                                    <TextLink
                                        href={route('password.request')}
                                        className="ml-auto text-sm"
                                        tabIndex={5}
                                    >
                                        Forgot password?
                                    </TextLink>
                                )}
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                value={loginForm.data.password}
                                onChange={(e) => loginForm.setData('password', e.target.value)}
                                placeholder="Password"
                            />
                            <InputError message={loginForm.errors.password} />
                        </div>

                        <div className="flex items-center space-x-3">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={loginForm.data.remember}
                                onClick={() => loginForm.setData('remember', !loginForm.data.remember)}
                                tabIndex={3}
                            />
                            <Label htmlFor="remember">Remember me</Label>
                        </div>

                        <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={loginForm.processing}>
                            {loginForm.processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Log in
                        </Button>
                    </div>

                    <div className="text-muted-foreground text-center text-sm">
                        Don't have an account?{' '}
                        <TextLink href={route('register')} tabIndex={5} onClick={() => toggleTab('register')}>
                            Sign up
                        </TextLink>
                    </div>
                </form>
            ) : (
                <form className="flex flex-col gap-6" onSubmit={handleRegisterSubmit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={registerForm.data.name}
                                onChange={(e) => registerForm.setData('name', e.target.value)}
                                disabled={registerForm.processing}
                                placeholder="Full name"
                            />
                            <InputError message={registerForm.errors.name} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={2}
                                autoComplete="email"
                                value={registerForm.data.email}
                                onChange={(e) => registerForm.setData('email', e.target.value)}
                                disabled={registerForm.processing}
                                placeholder="email@example.com"
                            />
                            <InputError message={registerForm.errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                value={registerForm.data.password}
                                onChange={(e) => registerForm.setData('password', e.target.value)}
                                disabled={registerForm.processing}
                                placeholder="Password"
                            />
                            <InputError message={registerForm.errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirm password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                value={registerForm.data.password_confirmation}
                                onChange={(e) => registerForm.setData('password_confirmation', e.target.value)}
                                disabled={registerForm.processing}
                                placeholder="Confirm password"
                            />
                            <InputError message={registerForm.errors.password_confirmation} />
                        </div>

                        <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={registerForm.processing}>
                            {registerForm.processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Create account
                        </Button>
                    </div>

                    <div className="text-muted-foreground text-center text-sm">
                        Already have an account?{' '}
                        <TextLink href={route('login')} tabIndex={6} onClick={() => toggleTab('login')}>
                            Log in
                        </TextLink>
                    </div>
                </form>
            )}

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
};

export default LoginAndRegister;

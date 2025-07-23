'use client';

import { Button } from '@/components/ui/button';
import { SocialLogin } from '@/components/auth/SocialLogin';
import DividerWithLabel from '@/components/base/DividerWithLabel';
import { Mail, Lock, CircleUserRound } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import FormField from '@/components/auth/FormField';
import Link from 'next/link';
import { useAuthForm } from '@/hooks/useAuthForm';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type FormType = 'sign-in' | 'sign-up';

const authFormSchema = (type: FormType) =>
  z.object({
    name:
      type === 'sign-up' ? z.string().min(2).max(100) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6).max(100),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const { handleSignIn, handleSignUp } = useAuthForm();

  const isSignIn = type === 'sign-in';
  const authActionText = isSignIn ? 'Sign In' : 'Sign Up';

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoadingProvider('credentials');

    if (isSignIn) {
      await handleSignIn(values);
    } else {
      await handleSignUp({ ...values, name: values?.name ?? '' });
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">{authActionText}</h1>
        <p className="text-gray-600 text-base">
          Access your account - explore all features
        </p>
      </div>

      <SocialLogin
        loadingProvider={loadingProvider}
        setLoadingProvider={setLoadingProvider}
      />

      <DividerWithLabel label="@" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
          {type === 'sign-up' && (
            <FormField
              control={form.control}
              name="name"
              placeholder="Your Name"
              className="h-12 font-medium"
              startIcon={CircleUserRound}
              readOnly={!!loadingProvider}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            placeholder="Email"
            className="h-12 font-medium"
            startIcon={Mail}
            readOnly={!!loadingProvider}
          />

          <FormField
            control={form.control}
            type="password"
            name="password"
            placeholder="Password"
            className="h-12 font-medium"
            startIcon={Lock}
            readOnly={!!loadingProvider}
          />

          <Button
            type="submit"
            className="w-full h-12 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
            loading={loadingProvider === 'credentials'}
            disabled={!!loadingProvider}
          >
            {authActionText}
          </Button>
        </form>
      </Form>

      <p className="text-sm font-medium text-gray-500 text-center -mt-1">
        {isSignIn ? "Don't have an account?" : 'Have an account already?'}
        <Link
          href={isSignIn ? '/sign-up' : '/sign-in'}
          onClick={(e) => loadingProvider && e.preventDefault()}
          className={cn('ml-1 font-bold text-black hover:underline', {
            'pointer-events-none text-gray-400': loadingProvider,
          })}
        >
          {isSignIn ? 'Sign Up' : 'Sign In'}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;

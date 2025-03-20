'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@lk/components/ui/form';
import { Button } from '@lk/components/ui/button';
import { useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateUserSchema } from '@lk/schemas';
import React from 'react';
import { z } from 'zod';
import { Input } from '@lk/components/ui/input';
import { createUserServerAction } from '../actions/create-user.action';

export const CreateUserForm = () => {
  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    mode: 'all',
  });

  const { errors, isSubmitting } = useFormState({
    control: form.control,
  });

  const [success, setSuccess] = React.useState(false);

  const onSubmit = async (data: z.infer<typeof CreateUserSchema>) => {
    const response = await createUserServerAction(data);
    if (!response?.success) {
      console.log('response', response);

      if (response.data) {
        (
          response.data as { path: string[]; type: string; message: string }[]
        ).forEach(({ path, type, message }) => {
          if (path.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            form.setError(path[0] as any, { type, message });
          }
        });
      }

      return form.setError('root', {
        message: response.error?.toString() || 'Something went wrong',
      });
    }
    setSuccess(true);
  };

  const handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  if (success) {
    return (
      <div className="text-sm text-success flex flex-col justify-center w-full gap-2">
        {'Пользователь успешно создан'}
        <Button onClick={() => handleReload()} className="w-full">
          {'Создать еще одного пользователя'}
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        key={'create-user'}
        className="w-full space-y-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-row items-center gap-2">
          {['email@example.com', 'email@example.org'].map((email) => (
            <Button
              key={email}
              variant="secondary"
              onClick={() => form.setValue('email', email)}
            >
              {email}
            </Button>
          ))}
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>

              <FormControl>
                <Input {...field} placeholder="Укажите email" type="text" />
              </FormControl>
              <FormDescription>
                При вводе домена в зонах .com (схема) и .org (controller) должен
                сработать запрет
              </FormDescription>
              <FormMessage className="text-xs">
                {errors?.email?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Фамилия</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Укажите фамилию" type="text" />
              </FormControl>
              <FormDescription>
                На клиенте и на севрере одинаковая валидация - должно быть не
                менее 2 символов
              </FormDescription>
              <FormMessage className="text-xs">
                {errors?.lastName?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Укажите имя" type="text" />
              </FormControl>
              <FormDescription>
                На клиенте и на севрере разная валидация - на клиенте должно
                быть не менее 1 символа, на севрере - не менее 2 символов
              </FormDescription>
              <FormMessage className="text-xs">
                {errors?.firstName?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <div className="text-sm text-destructive">{errors?.root?.message}</div>
        <div className="flex items-center justify-end gap-2">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {'Создать пользователя'}
          </Button>
          <Button type="button" onClick={() => form.reset()} className="w-full">
            {'Сбросить'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

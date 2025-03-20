'use client';

import React from 'react';

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
import { CreateUserDto, CreateUserSchema, CreateUserErrors } from '@lk/schemas';
import { Input } from '@lk/components/ui/input';
import { createUserServerAction } from '../actions/create-user.action';
import { SomethingWentWrongResponse } from '../libs/client/errors';

export const CreateUserForm = () => {
  const form = useForm<CreateUserDto>({
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

  const onSubmit = async (data: CreateUserDto) => {
    const response = await createUserServerAction(data).catch((error) =>
      // override error
      SomethingWentWrongResponse({ ...error }),
    );

    if (!response.success) {
      // pass errors to form context
      if (response.errors) {
        const errors: CreateUserErrors = response.errors;
        Object.entries(errors).forEach(([key, messages]) => {
          form.setError(key as keyof CreateUserDto, {
            message: messages.join(', '),
          });
        });
      }
      // set root error message
      return form.setError('root', { message: response.message });
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
        {'User created successfully'}
        <Button onClick={() => handleReload()} className="w-full">
          {'Create another user'}
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
                <Input {...field} placeholder="Enter email" type="text" />
              </FormControl>
              <FormDescription>
                When entering a domain in the .com (schema) and .org
                (controller) zones, a prohibition must be triggered
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
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter last name" type="text" />
              </FormControl>
              <FormDescription>
                On the client and server, the same validation - must be at least
                2 characters long менее 2 символов
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
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter first name" type="text" />
              </FormControl>
              <FormDescription>
                On the client and server, the validation is different - on the
                client it must be at least 1 character long, on the server it
                must be at least 2 characters long
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
            {'Create user'}
          </Button>
          <Button type="button" onClick={() => form.reset()} className="w-full">
            {'Reset'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

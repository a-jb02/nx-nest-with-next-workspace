'use server';

import { CreateUserSchema } from '@lk/schemas';
import {
  createServerAction,
  ServerActionBadRequestError,
} from '../libs/server';
import { z } from 'zod';

export const createUserServerAction = createServerAction<
  unknown,
  [z.infer<typeof CreateUserSchema>]
>(async (data) => {
  // call directly to backend API
  const response = await fetch(`${process.env.API_URL}/api/v1/hello`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new ServerActionBadRequestError({
      message: error.message,
      data: error.errors,
      status: response.status,
    });
  }

  return await response.json();
});

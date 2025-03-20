'use server';

import { CreateUserDto } from '@lk/schemas';
import {
  createServerAction,
  ServerActionBadRequestError,
} from '../libs/server';

export const createUserServerAction = createServerAction<
  CreateUserDto,
  [CreateUserDto]
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
      errors: error.errors,
      status: response.status,
    });
  }

  return await response.json();
});

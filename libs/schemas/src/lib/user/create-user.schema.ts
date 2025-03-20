import { z } from 'zod';
import { isClientContext } from '../context';

export const CreateUserSchema = z.object({
    firstName: isClientContext ? z.string() : z.string().min(2, 'First name is required and must be at least 2 characters long'),
    lastName: z.string().min(2, 'Last name is required and must be at least 2 characters long'),
    email: z.string()
        .email('Invalid email, please enter a valid email address')
        .refine((value) => !value.endsWith('.com'), {
            message: 'Email .com not allowed',
        }),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type CreateUserErrors = Partial<Record<keyof CreateUserDto, string[]>>;
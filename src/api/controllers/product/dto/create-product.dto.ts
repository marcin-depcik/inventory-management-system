import { DECIMAL_PATTERN } from '@src/common/constants/patterns';
import { z } from 'zod';

export const createProductSchema = z.object({
    name: z
        .string()
        .nonempty('Description is required')
        .max(50, 'Name must not exceed 50 characters'),
    description: z
        .string()
        .nonempty('Description is required')
        .max(50, 'Description must not exceed 50 characters'),
    price: z
        .string()
        .nonempty({ message: 'Price cannot be empty' })
        .max(50, { message: 'Price must be at most 50 characters long' })
        .regex(DECIMAL_PATTERN, {
            message:
                'Price must be represented in the basic unit of the currency (e.g. $1 => 100 cents)',
        })
        .transform((value) => parseInt(value))
        .refine((value) => value >= 0, {
            message: 'Price must be a non-negative number',
        }),
    stock: z
        .string()
        .nonempty({ message: 'Stock cannot be empty' })
        .max(50, { message: 'Stock must be at most 50 characters long' })
        .regex(DECIMAL_PATTERN, { message: 'Stock must be representation of whole number' })
        .transform((value) => parseInt(value))
        .refine((value) => value >= 0, {
            message: 'Stock must be a non-negative number',
        }),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;

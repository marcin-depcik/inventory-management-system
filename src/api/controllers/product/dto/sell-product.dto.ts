import { DECIMAL_PATTERN } from '@src/common/constants/patterns';
import { z } from 'zod';

export const sellProductSchema = z.object({
    quantity: z
        .string()
        .nonempty({ message: 'Quantity cannot be empty' })
        .max(50, { message: 'Quantity must be at most 50 characters long' })
        .regex(DECIMAL_PATTERN, { message: 'Quantity must be representation of whole number' })
        .transform((value) => parseInt(value))
        .refine((value) => value >= 0, {
            message: 'Quantity must be a non-negative number',
        }),
});

export type SellProductDto = z.infer<typeof sellProductSchema>;

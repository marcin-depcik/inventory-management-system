import { DECIMAL_PATTERN } from '@src/common/constants/patterns';
import { z } from 'zod';

const orderProductSchema = z.object({
    productId: z.string().nonempty('Product id is required').max(50),
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

export const createOrderSchema = z.object({
    customerId: z.string().nonempty('Customer id is required').max(50),
    products: z.array(orderProductSchema),
});

export type CreateOrderDto = z.infer<typeof createOrderSchema>;

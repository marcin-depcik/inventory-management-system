import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderProduct {
    productId: string;
    quantity: number;
}

export interface IOrder {
    customerId: string;
    products: IOrderProduct[];
}

export interface IOrderProductDocument extends IOrderProduct, Document {}
export interface IOrderDocument extends IOrder, Document {}

const OrderProductSchema: Schema = new Schema<IOrderProductDocument>({
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
});

const OrderSchema: Schema = new Schema<IOrderDocument>({
    customerId: { type: String, required: true },
    products: { type: [OrderProductSchema], required: true },
});

export const OrderModel = mongoose.model<IOrderDocument>('Order', OrderSchema);

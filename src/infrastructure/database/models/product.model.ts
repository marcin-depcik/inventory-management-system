import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct {
    name: string;
    description: string;
    price: number;
    stock: number;
}

export interface IProductDocument extends IProduct, Document {}

const ProductSchema: Schema = new Schema<IProductDocument>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
});

export const ProductModel = mongoose.model<IProductDocument>('Product', ProductSchema);

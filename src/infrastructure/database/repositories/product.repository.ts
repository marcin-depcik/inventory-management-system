import { injectable } from 'inversify';
import { IProduct, ProductModel } from '../models/product.model';

@injectable()
export class ProductRepository {
    private readonly productModel: typeof ProductModel;

    constructor() {
        this.productModel = ProductModel;
    }

    create(product: IProduct) {
        const newProduct = new ProductModel(product);
        return this.productModel.create(newProduct);
    }

    find() {
        return this.productModel.find().lean();
    }

    findOne(id: string) {
        return this.productModel.findById(id).lean();
    }

    update(id: string, product: Partial<IProduct>) {
        return this.productModel.findByIdAndUpdate(id, product, { new: true }).lean();
    }
}

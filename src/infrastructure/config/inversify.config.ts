import 'reflect-metadata';
import { Container } from 'inversify';
import { CreateProductCommand } from '@src/commands/impl/create-product.command';
import { QueryHandler } from '@src/queries/handlers/query.handler';
import { CommandHandler } from '@src/commands/handlers/command.handler';
import { ProductController } from '@src/api/controllers/product/product.controller';
import { CreateProductHandler } from '@src/commands/handlers/create-product.handler';
import { GetProductsQuery } from '@src/queries/impl/get-products.query';
import { GetProductsHandler } from '@src/queries/handlers/get-products.handler';
import { RestockProductCommand } from '@src/commands/impl/restock-product.command';
import { SellProductCommand } from '@src/commands/impl/sell-product.command';
import { SellProductHandler } from '@src/commands/handlers/sell-product.handler';
import { RestockProductHandler } from '@src/commands/handlers/restock-product.handler';
import { OrderController } from '@src/api/controllers/order/order.controller';
import { CreateOrderCommand } from '@src/commands/impl/create-order.command';
import { CreateOrderHandler } from '@src/commands/handlers/create-order.handler';
import { ProductRepository } from '../database/repositories/product.repository';
import { OrderRepository } from '../database/repositories/order.repository';
import { ProductQuantityService } from '@src/commands/services/product-quantity.service';

const container = new Container();

// COMMANDS
container.bind(CreateProductCommand).toSelf();
container.bind(CreateOrderCommand).toSelf();
container.bind(RestockProductCommand).toSelf();
container.bind(SellProductCommand).toSelf();

// QUERIES
container.bind(GetProductsQuery).toSelf();

// HANDLERS
container.bind(CommandHandler).toSelf();
container.bind(CreateProductHandler).toSelf();
container.bind(CreateOrderHandler).toSelf();
container.bind(RestockProductHandler).toSelf();
container.bind(SellProductHandler).toSelf();
container.bind(QueryHandler).toSelf();
container.bind(GetProductsHandler).toSelf();

// CONTROLLERS
container.bind(ProductController).toSelf();
container.bind(OrderController).toSelf();

// SERVICES
container.bind(ProductQuantityService).toSelf();

// REPOSITORIES
container.bind(ProductRepository).toSelf();
container.bind(OrderRepository).toSelf();

export { container };

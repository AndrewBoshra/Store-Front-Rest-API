import { AuthController } from "./controllers/auth_controller";
import { OrdersController } from "./controllers/orders_controller";
import { ProductsController } from "./controllers/products_controller";
import { UsersController } from "./controllers/users_controller";
import { UsersRepository } from "../repositories/";
import ProductsRepository from "../repositories/products_repo";
import {
    AuthenticationService,
    JWTService,
    OrderService,
    PasswordHashingService,
    UsersService,
} from "../services";
import pool from "./database";
import config from "../config";
// all Dependency Injection goes here
const usersRepository = new UsersRepository(pool);
const productsRepository = new ProductsRepository(pool);
const passwordHashingService = new PasswordHashingService();
const jwtService = new JWTService(config.jwtSecret!);
const authenticationService = new AuthenticationService(
    usersRepository,
    passwordHashingService
);

const orderService = new OrderService(pool);
const usersService = new UsersService(usersRepository);
//************ Controllers  **************
const authController = new AuthController(authenticationService, jwtService);
const productsController = new ProductsController(productsRepository);
const ordersController = new OrdersController(orderService);
const usersController = new UsersController(usersService);

export {
    usersRepository,
    productsRepository,
    passwordHashingService,
    jwtService,
    authenticationService,
    orderService,
    usersService,
    authController,
    productsController,
    ordersController,
    usersController,
};

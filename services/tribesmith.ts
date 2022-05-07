import { Router } from 'express';
import ProductsController from '../controllers/productsController';
import amountValidator from '../middlewares/amountVerify';
import nameValidator from '../middlewares/nameVerify';

const router = Router();

const productsController = new ProductsController();

router.get('/products', productsController.getAll);
router.post('/products', nameValidator, amountValidator, productsController.addProduct);

export default router;
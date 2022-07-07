import { listProducts, listShopping, postShopping } from '../controllers/productsController.js';
import { Router } from 'express';

const router = Router();

router.get('/products', listProducts);

router.get('/shoppingcart', listShopping)
router.post('/shoppingcart', postShopping)
export default router;
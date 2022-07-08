import { listProducts, listShopping, postShopping, deleteOneShopping, deleteManyShopping } from '../controllers/productsController.js';
import { Router } from 'express';

const router = Router();

router.get('/products', listProducts);

router.get('/shoppingcart', listShopping)
router.post('/shoppingcart', postShopping)
//router.delete('/shoppingcart/:produtoId', deleteOneShopping);
router.delete('/shoppingcart/:userId', deleteManyShopping)

export default router;
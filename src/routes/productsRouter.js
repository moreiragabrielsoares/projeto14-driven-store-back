import { listProducts, listShopping, postShopping, deleteShopping } from '../controllers/productsController.js';
import { Router } from 'express';

const router = Router();

router.get('/products', listProducts);

router.get('/shoppingcart', listShopping)
router.post('/shoppingcart', postShopping)
router.delete('/shoppingcart/:image', deleteShopping)
export default router;
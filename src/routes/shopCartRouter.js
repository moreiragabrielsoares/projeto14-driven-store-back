import { registerProduct } from '../controllers/shopCartController.js';
import { Router } from 'express';

const router = Router();

router.post('/shoppingcart', registerProduct);

export default router;
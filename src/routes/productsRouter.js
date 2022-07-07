import { listProducts } from '../controllers/productsController.js';
import { Router } from 'express';

const router = Router();

router.get('/products', listProducts);

export default router;
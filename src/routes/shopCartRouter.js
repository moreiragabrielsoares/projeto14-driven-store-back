import { registerProduct , getProducts} from '../controllers/shopCartController.js';
import { Router } from 'express';
import validateUser from '../middlewares/validateUser.js';

const router = Router();

router.post('/shoppingcart', validateUser, registerProduct);
router.get('/shoppingcart', validateUser, getProducts);

export default router;
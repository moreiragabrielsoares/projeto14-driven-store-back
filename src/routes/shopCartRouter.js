import { registerProduct , getProducts, deleteOneShopping, postOrdersmade} from '../controllers/shopCartController.js';
import { Router } from 'express';
import validateUser from '../middlewares/validateUser.js';

const router = Router();
//esse get produto é aquela minha função listShopping
router.post('/shoppingcart', validateUser, registerProduct);
router.get('/shoppingcart', validateUser, getProducts);
router.delete('/shoppingcart/:produtoId', deleteOneShopping);
router.post('/ordersmade', postOrdersmade)

export default router;
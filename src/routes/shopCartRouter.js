import { registerProduct , getProducts, deleteOneShopping, deleteManyShopping} from '../controllers/shopCartController.js';
import { Router } from 'express';
import validateUser from '../middlewares/validateUser.js';

const router = Router();
//esse get produto é aquela minha função listShopping
router.post('/shoppingcart', validateUser, registerProduct);
router.get('/shoppingcart', validateUser, getProducts);
//router.delete('/shoppingcart/:produtoId', deleteOneShopping);
router.delete('/shoppingcart/:userId', deleteManyShopping)

export default router;
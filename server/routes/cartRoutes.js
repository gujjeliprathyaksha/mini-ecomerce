import { Router } from 'express';
import { addCartItem, getCart, removeCartItem, updateCartItem } from '../controllers/cartController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);
router.get('/', getCart);
router.post('/', addCartItem);
router.put('/:itemId', updateCartItem);
router.delete('/:itemId', removeCartItem);

export default router;

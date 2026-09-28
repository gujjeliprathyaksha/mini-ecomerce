import { Router } from 'express';
import {
  cancelOrder,
  createOrder,
  getOrder,
  listOrders,
  trackOrder,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/track', trackOrder);
router.use(requireAuth);
router.post('/', createOrder);
router.get('/', listOrders);
router.get('/:id', getOrder);
router.put('/:id', requireAdmin, updateOrderStatus);
router.delete('/:id', cancelOrder);

export default router;

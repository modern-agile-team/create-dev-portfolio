import * as express from 'express';
import visitorCtrl from './visitor.ctrl';
import validationCheck from '../middlewares/validationCheck';
const router: express.Router = express.Router();

router.patch('/count', visitorCtrl.updateAndGetVisitor);

router.post('/comment', validationCheck, visitorCtrl.createVisitComment);
router.get('/comments', visitorCtrl.getVisitorComments);
router.delete('/comment/:id', visitorCtrl.deleteVisitorCommentById);
router.patch(
  '/comment/:id',
  validationCheck,
  visitorCtrl.updateVisitCommentById
);

export default router;

import * as express from 'express';
import visitorCtrl from './visitor.ctrl';

const router: express.Router = express.Router();

router.patch('/count', visitorCtrl.updateAndGetVisitor);

router.post('/comment', visitorCtrl.createVisitComment);
router.get('/comments', visitorCtrl.getVisitorComments);
router.patch('/comment/:id', visitorCtrl.updateVisitCommentById);
router.delete('/comment/:id', visitorCtrl.deleteVisitorCommentById);

export default router;

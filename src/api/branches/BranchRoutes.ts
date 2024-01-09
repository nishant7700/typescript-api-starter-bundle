import express from 'express';
import { AddBranch } from './AddBrach';
import { body, check } from 'express-validator';
import { validateRequest } from '../../config';
import { AllBranches } from './AllBranch';
import { UpdateBranch } from './EditBranch';
import { GetBranch } from './SingleBranch';
import { deleteBranch } from './DeleteBranch';
const router = express.Router();
router.route('/').get(AllBranches);
router.route('/:id').get(GetBranch);
router.route('/:id').delete(deleteBranch);
router
  .route('/add')
  .post(
    [
      body('branch_name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Branch Name must be provided'),
    ],
    validateRequest,
    AddBranch
  );

router
  .route('/:id/edit')
  .put(
    [
      body('branch_name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Branch Name must be provided'),
    ],
    validateRequest,
    UpdateBranch
  );

export { router as BranchRoutes };

import { Request, Response } from 'express';
import { Branch } from '../../models/Branch';
import { NotFoundError } from '../../config';

const UpdateBranch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    branch_name,
    branch_identifier,
    is_active,
    is_in_filter,
    show_on_dashboard,
  } = req.body;
  const branchDetails = await Branch.findById(id);
  if (!branchDetails) {
    throw new NotFoundError();
  }
  branchDetails.set({
    branch_name,
    branch_identifier,
    is_active,
    is_in_filter,
    show_on_dashboard,
  });
  await branchDetails.save();
  res.status(202).send(branchDetails);
};
export { UpdateBranch };

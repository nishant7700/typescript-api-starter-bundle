import { Request, Response } from 'express';
import { NotFoundError } from '../../config';
import { Branch } from '../../models/Branch';
//import { User } from '../../models/User';
const deleteBranch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const branchDetails = await Branch.findById(id);
  if (!branchDetails) {
    throw new NotFoundError();
  }
  await branchDetails.remove();
  res.status(200).send(branchDetails);
};

export { deleteBranch };

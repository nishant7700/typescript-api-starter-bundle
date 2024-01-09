import { Request, Response } from 'express';
import { Branch } from '../../models/Branch';
import { NotFoundError } from '../../config';

const GetBranch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const branch = await Branch.findById(id);
  if (!branch) {
    throw new NotFoundError();
  }
  res.status(200).send(branch);
};

export { GetBranch };

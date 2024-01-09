import { Request, Response } from 'express';
import { Branch } from '../../models/Branch';

const AddBranch = async (req: Request, res: Response) => {
  const {
    branch_name,
    branch_identifier,
    is_active,
    is_in_filter,
    show_on_dashboard,
  } = req.body;

  const branch = Branch.build({
    branch_name,
    branch_identifier,
    is_active,
    is_in_filter,
    show_on_dashboard,
  });
  await branch.save();
  res.status(201).send(branch);
};
export { AddBranch };

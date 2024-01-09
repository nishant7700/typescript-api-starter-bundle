import { Request, Response } from 'express';

import { Branch } from '../../models/Branch';

import { filterData } from '../../services/filterService';

const AllBranches = async (req: Request, res: Response) => {
  const pageSize = 10;
  const searchParams = filterData(req);
  const { pageNumber } = req.query;
  const page = Number(pageNumber) || 1;
  const total_branches = await Branch.countDocuments({ ...searchParams });
  const branches = await Branch.find({ ...searchParams })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.status(200).send({
    branches: branches,
    page: page,
    pages: Math.ceil(total_branches / pageSize),
    total_branches: total_branches,
  });
};

export { AllBranches };

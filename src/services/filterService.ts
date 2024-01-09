import { Request } from 'express';
const filterData = (req: Request) => {
  let searchParams = {};

  if (req.query.search) {
    const searchQ = req.query.search;
    const newQData: { [key: string]: object } = {};
    if (searchQ) {
      Object.keys(searchQ).map((item) => {
        newQData[item] = {
          // @ts-ignore
          $regex: searchQ[item],
          $options: 'i',
        };
      });
    }

    searchParams = { ...searchParams, ...newQData };
  }
  if (req.query.exact) {
    const exactQ = req.query.exact;
    // @ts-ignore
    searchParams = { ...searchParams, ...exactQ };
  }
  if (req.query.conditional) {
    const conditionalQ = req.query.conditional;
    // @ts-ignore
    searchParams = { ...searchParams, ...conditionalQ };
  }

  return searchParams;
};
export { filterData };

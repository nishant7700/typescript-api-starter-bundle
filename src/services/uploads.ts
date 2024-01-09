import path from 'path';
import express, { Request } from 'express';
import multer from 'multer';
type DestinationCallback = (error: Error | null, destination: string) => void;

const router = express.Router();

const storage = multer.diskStorage({
  destination(
    request: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    // console.log('File', file);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb('Images only!');
//   }
// }

const upload = multer({
  storage,
  // fileFilter: function (req, file, cb) {
  //   checkFileType(file, cb);
  // },
});

router.post('/', upload.single('image'), (req, res) => {
  // console.log('File', req.file);

  res.send(`/${req.file?.path}`);
});
router.post('/gallery', upload.array('gallery'), (req, res) => {
  // console.log(req.files);
  if (req.files && req.files.length > 0) {
    // @ts-ignore
    const newImages = req.files.map((item) => {
      return `/${item.path}`;
    });
    res.send(newImages);
  }
});

export { router as uploadRouter };

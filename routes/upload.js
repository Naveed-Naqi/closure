const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3-transform");
const sharp = require("sharp");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-2",
});

const checkFileType = (file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "closure-bucket",
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    limits: { fileSize: 20000000 },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + file.originalname);
    },
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
    },
    shouldTransform: function (req, file, cb) {
      cb(null, /^image/i.test(file.mimetype));
    },
    transforms: [
      {
        id: "original",
        key: function (req, file, cb) {
          cb(null, Date.now().toString() + file.originalname);
        },
        transform: function (req, file, cb) {
          //Perform desired transformations
          cb(null, sharp().resize(640, 640, { fit: "contain" }));
        },
      },
    ],
  }),
});

module.exports = upload;

const fs = require("fs");
const multer = require("multer");
const sharp = require("sharp");
const Region = require("../region/model");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images !", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadFiles = upload.array("files", 6);

exports.uploadImages = (req, res, next) => {
  uploadFiles(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.send("Too many files to upload !");
      }
    } else if (err) {
      return res.send(err);
    }
    next();
  });
};

exports.resizeImages = async (req, res, next) => {
  if (!req.files) return next();

  let regionName = "error";
  try {
    const regionId = req.user.title?.region || req.body?.region;

    const doc = await Region.findById(regionId).exec();
    regionName = doc.title
      .toLowerCase()
      .trim()
      .replace(/['"]+/g, "")
      .split(" ")
      .join("-");

    if (!fs.existsSync(`./uploads/images/${regionName}`)) {
      fs.mkdirSync(`./uploads/images/${regionName}`);
    }

    if (!fs.existsSync(`./uploads/thumb/${regionName}`)) {
      fs.mkdirSync(`./uploads/thumb/${regionName}`);
    }
  } catch (err) {
    return res.status(400).json({ message: `file system errr *** ${err}` });
  }
  
  req.body.media = [];
  await Promise.all(
    req.files.map(async (file, index) => {
      const value = Date.now() + index;
      const newFilename = `${value}.jpg`;

      await sharp(file.buffer)
        .resize(200)
        .toFormat("jpg")
        .jpeg({ quality: 90 })
        .toFile(`./uploads/thumb/${regionName}/${newFilename}`);

      await sharp(file.buffer)
        .toFormat("jpg")
        .jpeg({ quality: 90 })
        .toFile(`./uploads/images/${regionName}/${newFilename}`);

      req.body.media.push({
        image: `${req.protocol}://${req.get(
          "host"
        )}/files/images/${regionName}/${newFilename}`,
        thumb: `${req.protocol}://${req.get(
          "host"
        )}/files/thumb/${regionName}/${newFilename}`,
        lat: req.body.lat,
        lng: req.body.lng,
        time: req.body.uploadTime,
      });
    })
  );

  next();
};

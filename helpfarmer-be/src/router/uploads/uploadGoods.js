const multer = require('@koa/multer');
const path = require('path');
const { v4: uuidv4 } = require('uuidv4');
//配置multer存储选项
const storage = multer.diskStorage({
  //文件上传目录
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/goods'));
  },
  //文件名
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});
// 创建 multer 实例
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 限制文件大小，最大为 5MB
  fileFilter: (req, file, cb) => {
    // 可选：根据文件类型限制上传文件
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error('只有图片类型的文件支持上传'), false);
    }
  },
});
module.exports=upload
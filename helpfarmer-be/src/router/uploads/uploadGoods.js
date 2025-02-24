const multer = require('@koa/multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// 配置multer存储选项
const storage = multer.diskStorage({
  // 文件上传目录
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../../static/goods'));
  },
  // 文件名：保留原始文件名，并在前面加上时间戳和随机ID来确保唯一性
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname); // 获取文件扩展名
    const basename = path.basename(file.originalname, extname); // 获取文件原始名称，不包括扩展名
    const uniqueSuffix = Date.now() + '-' + uuidv4(); // 生成唯一的文件名
    const newFilename = `${basename}-${uniqueSuffix}${extname}`; // 新的文件名，包含原文件名和唯一后缀
    cb(null, newFilename);
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
      cb(new Error('只支持图片类型的文件上传'), false);
    }
  },
});

module.exports = upload;

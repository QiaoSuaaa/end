// // const Router = require('@koa/router');
// // const mongoose = require('mongoose');
// // const getBody = require('../../helpers/index');
// // const Goods = mongoose.model('Goods');
// // const uploadGoods=require('../uploads/uploadGoods')
// // const router = new Router({
// //   prefix: '/goods',
// // });
// // router.post('/add', async (ctx) => {
// //   try {
// //     const { name, images,description, city, price,content, production, count,category, flag, active } =
// //       ctx.request.body;
// //     const goods = new Goods({
// //       name,
// //       description,
// //       city,
// //       price,
// //       content,
// //       production,
// //       count,
// //       flag, 
// //       active,
// //       category,
// //       images
// //     });
// //     const res = await goods.save();
// //     ctx.status = 201;
// //     ctx.body = {
// //       data: res,
// //       code: 0,
// //       msg: '商品添加成功',
// //     };
// //   } catch (error) {
// //     ctx.status = 500;
// //     ctx.body = {
// //       code: 1,
// //       msg: '出现错误',
// //       error: error.message,
// //     };
// //   }
// // });
// // router.get('/list', async (ctx) => {
// //   try {
// //     const {'pageNo[pageNo]':pageNo,'pageNo[pageSize]': pageSize}=ctx.query
// //     const goodsList = await Goods.find().skip((pageNo-1)*pageSize).limit(pageSize).exec();
// //     ctx.status = 200;
// //     ctx.body = { message: '商品列表获取成功', data: goodsList };
// //   } catch (error) {
// //     ctx.status = 500;
// //     ctx.body = { message: '出现错误', error: error.message };
// //   }
// // });
// // // 更新商品信息
// // router.put('/update', async (ctx) => {
// //   try {
// //     // 从请求体中解构出 id 和需要更新的字段
// //     const { _id, ...updateFields } = ctx.request.body;
// //     if (!_id) {
// //       ctx.status = 400;
// //       ctx.body = {
// //         success: false,
// //         code: 1,
// //         message: '缺少字段',
// //       };
// //       return;
// //     }

// //     const existingGoods = await Goods.findOne({ _id: _id }).exec();
// //     if (!existingGoods) {
// //       ctx.status = 404;
// //       ctx.body = { success: false, code: 1, message: 'Goods not found' };
// //       return;
// //     }

// //     Object.assign(existingGoods, updateFields);
// //     await existingGoods.save();

// //     ctx.status = 200;
// //     ctx.body = {
// //       success: true,
// //       code: 0,
// //       message: '更新成功',
// //       data: existingGoods,
// //     };
// //   } catch (error) {
// //     console.error('更新失败:', error);
// //     ctx.status = 500;
// //     ctx.body = {
// //       success: false,
// //       code: 1,
// //       message: '服务器错误',
// //       error,
// //     };
// //   }
// // });

// // // 删除商品
// // router.get('/delete/:id', async (ctx) => {
// //   try {
// //     const { id } = ctx.params;
// //     if (!id) {
// //       ctx.status = 400;
// //       ctx.body = {
// //         success: false,
// //         code: 1,
// //         message: '缺少字段',
// //       };
// //       return;
// //     }

// //     const result = await Goods.deleteOne({_id:id }).exec();
// //     if (result.deletedCount === 0) {
// //       ctx.status = 404;
// //       ctx.body = {
// //         success: false,
// //         code: 1,
// //         message: '找不到该商品',
// //       };
// //       return;
// //     }

// //     ctx.status = 200;
// //     ctx.body = {
// //       success: true,
// //       code: 0,
// //       message: '删除成功',
// //     };
// //   } catch (error) {
// //     console.error('删除失败:', error);
// //     ctx.status = 500;
// //     ctx.body = {
// //       success: false,
// //       code: 1,
// //       message: '服务器错误',
// //       error: error.message,
// //     };
// //   }
// // });
// // module.exports = router;
// const Router = require('@koa/router');
// const mongoose = require('mongoose');
// const uploadMiddleware = require('../uploads/uploadGoods'); // 引入上传中间件
// const Goods = mongoose.model('Goods');
// const path = require('path');
// const router = new Router({
//   prefix: '/goods',
// });

// // 上传商品图片并添加商品
// router.post('/add', uploadMiddleware.array('images', 5), async (ctx) => {
//   try {
//     const { name, description, city, price, content, production, count, category, flag, active } = ctx.request.body;
//     const imagePaths = ctx.files ? ctx.files.map(file => `../../uploads/goods${file.filename}`) : [];

//     const goods = new Goods({
//       name,
//       description,
//       city,
//       price,
//       content,
//       production,
//       count,
//       category,
//       flag,
//       active,
//       images: imagePaths, // 保存图片路径
//     });

//     const res = await goods.save();
//     ctx.status = 201;
//     ctx.body = {
//       data: res,
//       code: 0,
//       msg: '商品添加成功',
//     };
//   } catch (error) {
//     ctx.status = 500;
//     ctx.body = {
//       code: 1,
//       msg: '出现错误',
//       error: error.message,
//     };
//   }
// });

// // 获取商品列表（带分页）
// router.get('/list', async (ctx) => {
//   try {
//     const { 'pageNo[pageNo]': pageNo, 'pageNo[pageSize]': pageSize } = ctx.query;
//     const goodsList = await Goods.find().skip((pageNo - 1) * pageSize).limit(pageSize).exec();
//     ctx.status = 200;
//     ctx.body = { message: '商品列表获取成功', data: goodsList };
//   } catch (error) {
//     ctx.status = 500;
//     ctx.body = { message: '出现错误', error: error.message };
//   }
// });

// // 更新商品信息
// router.put('/update', uploadMiddleware.array('images', 5), async (ctx) => {
//   try {
//     const { _id, name, description, city, price, content, production, count, category, flag, active, images } = ctx.request.body;
//     if (!_id) {
//       ctx.status = 400;
//       ctx.body = {
//         success: false,
//         code: 1,
//         message: '缺少字段',
//       };
//       return;
//     }

//     const existingGoods = await Goods.findOne({ _id }).exec();
//     if (!existingGoods) {
//       ctx.status = 404;
//       ctx.body = { success: false, code: 1, message: 'Goods not found' };
//       return;
//     }

//     // 如果有新上传的图片，更新图片路径
//     const newImagePaths = ctx.files ? ctx.files.map(file => `../../uploads/goods/${file.filename}`) : images;
//     Object.assign(existingGoods, {
//       name,
//       description,
//       city,
//       price,
//       content,
//       production,
//       count,
//       category,
//       flag,
//       active,
//       images: newImagePaths, // 更新图片路径
//     });

//     await existingGoods.save();

//     ctx.status = 200;
//     ctx.body = {
//       success: true,
//       code: 0,
//       message: '更新成功',
//       data: existingGoods,
//     };
//   } catch (error) {
//     console.error('更新失败:', error);
//     ctx.status = 500;
//     ctx.body = {
//       success: false,
//       code: 1,
//       message: '服务器错误',
//       error,
//     };
//   }
// });

// // 删除商品
// router.get('/delete/:id', async (ctx) => {
//   try {
//     const { id } = ctx.params;
//     if (!id) {
//       ctx.status = 400;
//       ctx.body = {
//         success: false,
//         code: 1,
//         message: '缺少字段',
//       };
//       return;
//     }

//     const result = await Goods.deleteOne({ _id: id }).exec();
//     if (result.deletedCount === 0) {
//       ctx.status = 404;
//       ctx.body = {
//         success: false,
//         code: 1,
//         message: '找不到该商品',
//       };
//       return;
//     }

//     ctx.status = 200;
//     ctx.body = {
//       success: true,
//       code: 0,
//       message: '删除成功',
//     };
//   } catch (error) {
//     console.error('删除失败:', error);
//     ctx.status = 500;
//     ctx.body = {
//       success: false,
//       code: 1,
//       message: '服务器错误',
//       error: error.message,
//     };
//   }
// });

// // 图片上传接口
// router.post('/upload', uploadMiddleware.array('file', 5), async (ctx) => {
//   try {
//     if (ctx.files && ctx.files.length > 0) {
//       const fileUrls = ctx.files.map(file => `../../uploads/goods/${file.filename}`);
//       ctx.status = 200;
//       ctx.body = {
//         success: true,
//         data: fileUrls, // 返回上传的文件路径
//       };
//     } else {
//       ctx.status = 400;
//       ctx.body = {
//         success: false,
//         message: '没有文件上传',
//       };
//     }
//   } catch (error) {
//     ctx.status = 500;
//     ctx.body = {
//       success: false,
//       message: '上传失败',
//       error: error.message,
//     };
//   }
// });

// module.exports = router;
const Router = require('@koa/router');
const mongoose = require('mongoose');
const uploadMiddleware = require('../uploads/uploadGoods'); // 引入上传中间件
const Goods = mongoose.model('Goods');
const baseUrl=require('../../projectConfig')
const path = require('path');
const router = new Router({
  prefix: '/goods',
});

// 上传商品图片并添加商品
// router.post('/add', uploadMiddleware.array('images', 5), async (ctx) => {
//   try {
//     const { name, description, city, price, content, production, count, category, flag, active } = ctx.request.body;
//     const imagePaths = ctx.files ? ctx.files.map(file => `../../../static/goods/${file.filename}`) : [];

//     const goods = new Goods({
//       name,
//       description,
//       city,
//       price,
//       content,
//       production,
//       count,
//       category,
//       flag,
//       active,
//       images: imagePaths, // 保存图片路径
//     });

//     const res = await goods.save();
//     ctx.status = 201;
//     ctx.body = {
//       data: res,
//       code: 0,
//       msg: '商品添加成功',
//     };
//   } catch (error) {
//     ctx.status = 500;
//     ctx.body = {
//       code: 1,
//       msg: '出现错误',
//       error: error.message,
//     };
//   }
// });
// 上传商品图片并添加商品
router.post('/add', uploadMiddleware.array('images', 5), async (ctx) => {
  try {
    const { name, description, city, price, content, production, count, category, flag, active } = ctx.request.body;
    const imagePaths = ctx.files ? ctx.files.map(file => `http://localhost:3000/${file.filename}`) : []; // 生成完整 URL

    const goods = new Goods({
      name,
      description,
      city,
      price,
      content,
      production,
      count,
      category,
      flag,
      active,
      images: imagePaths , // 保存完整 URL
    });

    const res = await goods.save();
    ctx.status = 201;
    ctx.body = {
      data: res,
      code: 0,
      msg: '商品添加成功',
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      code: 1,
      msg: '出现错误',
      error: error.message,
    };
  }
});

// 更新商品信息
router.put('/update', uploadMiddleware.array('images', 5), async (ctx) => {
  try {
    const { _id, name, description, city, price, content, production, count, category, flag, active, images } = ctx.request.body;
    if (!_id) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        code: 1,
        message: '缺少字段',
      };
      return;
    }

    const existingGoods = await Goods.findOne({ _id }).exec();
    if (!existingGoods) {
      ctx.status = 404;
      ctx.body = { success: false, code: 1, message: '商品未找到' };
      return;
    }

    // 如果有新上传的图片，更新图片路径
   
    const newImagePaths = ctx.files ? ctx.files.map(file => `http://localhost:3000/${file.filename}`) : images;

    // 更新商品信息
    existingGoods.name = name || existingGoods.name;
    existingGoods.description = description || existingGoods.description;
    existingGoods.city = city || existingGoods.city;
    existingGoods.price = price || existingGoods.price;
    existingGoods.content = content || existingGoods.content;
    existingGoods.production = production || existingGoods.production;
    existingGoods.count = count || existingGoods.count;
    existingGoods.category = category || existingGoods.category;
    existingGoods.flag = flag || existingGoods.flag;
    existingGoods.active = active || existingGoods.active;
    existingGoods.images = newImagePaths; // 更新图片路径

    // 保存更新后的商品信息
    await existingGoods.save();

    ctx.status = 200;
    ctx.body = {
      success: true,
      code: 0,
      message: '更新成功',
      data: existingGoods,
    };
  } catch (error) {
    console.error('更新失败:', error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      code: 1,
      message: '服务器错误',
      error,
    };
  }
});
// router.put('/update', uploadMiddleware.array('images', 5), async (ctx) => {
//   try {
//     const { _id, images, ...rest } = ctx.request.body;

//     // 查找商品
//     const existingGoods = await Goods.findOne({ _id });
//     if (!existingGoods) {
//       ctx.status = 404;
//       ctx.body = { success: false, code: 1, message: '商品未找到' };
//       return;
//     }

//     // 处理图片路径（确保为字符串）
//     let newImagePath = '';
//     if (ctx.files?.length > 0) {
//       // 只取第一张新上传的图片路径
//       newImagePath = ctx.files[0].filename; 
//     } else if (images) {
//       // 直接使用传递的字符串
//       newImagePath = images;
//     }

//     // 更新字段
//     Object.assign(existingGoods, rest);
//     const filename=newImagePath
//     existingGoods.images = `http://localhost:3000/${filename}`; // 保存为字符串

//     await existingGoods.save();

//     ctx.body = {
//       success: true,
//       code: 0,
//       message: '更新成功',
//       data: existingGoods
//     };
//   } catch (error) {
//     console.error('更新失败:', error);
//     ctx.status = 500;
//     ctx.body = {
//       success: false,
//       code: 1,
//       message: '服务器错误',
//       error: error.message
//     };
//   }
// });
// 获取商品列表（带分页）
router.get('/list', async (ctx) => {
  try {
    const { 'pageNo[pageNo]': pageNo, 'pageNo[pageSize]': pageSize } = ctx.query;
    const goodsList = await Goods.find().skip((pageNo - 1) * pageSize).limit(pageSize).exec();
    ctx.status = 200;
    ctx.body = { message: '商品列表获取成功', data: goodsList };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: '出现错误', error: error.message };
  }
});

// 更新商品信息
// router.put('/update', uploadMiddleware.array('images', 5), async (ctx) => {
//   try {
//     const { _id, name, description, city, price, content, production, count, category, flag, active, images } = ctx.request.body;
//     if (!_id) {
//       ctx.status = 400;
//       ctx.body = {
//         success: false,
//         code: 1,
//         message: '缺少字段',
//       };
//       return;
//     }

//     const existingGoods = await Goods.findOne({ _id }).exec();
//     if (!existingGoods) {
//       ctx.status = 404;
//       ctx.body = { success: false, code: 1, message: '商品未找到' };
//       return;
//     }

//     // 如果有新上传的图片，更新图片路径
//     const newImagePaths = ctx.files ? ctx.files.map(file => `../../../static/goods/${file.filename}`) : images;
    
//     // 更新商品信息
//     existingGoods.name = name || existingGoods.name;
//     existingGoods.description = description || existingGoods.description;
//     existingGoods.city = city || existingGoods.city;
//     existingGoods.price = price || existingGoods.price;
//     existingGoods.content = content || existingGoods.content;
//     existingGoods.production = production || existingGoods.production;
//     existingGoods.count = count || existingGoods.count;
//     existingGoods.category = category || existingGoods.category;
//     existingGoods.flag = flag || existingGoods.flag;
//     existingGoods.active = active || existingGoods.active;
//     existingGoods.images = newImagePaths; // 更新图片路径

//     // 保存更新后的商品信息
//     await existingGoods.save();

//     ctx.status = 200;
//     ctx.body = {
//       success: true,
//       code: 0,
//       message: '更新成功',
//       data: existingGoods,
//     };
//   } catch (error) {
//     console.error('更新失败:', error);
//     ctx.status = 500;
//     ctx.body = {
//       success: false,
//       code: 1,
//       message: '服务器错误',
//       error,
//     };
//   }
// });

// 删除商品
router.get('/delete/:id', async (ctx) => {
  try {
    const { id } = ctx.params;
    if (!id) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        code: 1,
        message: '缺少字段',
      };
      return;
    }

    const result = await Goods.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      ctx.status = 404;
      ctx.body = {
        success: false,
        code: 1,
        message: '找不到该商品',
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      success: true,
      code: 0,
      message: '删除成功',
    };
  } catch (error) {
    console.error('删除失败:', error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      code: 1,
      message: '服务器错误',
      error: error.message,
    };
  }
});

// 图片上传接口
router.post('/upload', uploadMiddleware.array('file', 5), async (ctx) => {
  try {
    if (ctx.files && ctx.files.length > 0) {
      const fileUrls = ctx.files.map(file => `http://localhost:3000/${file.filename}`);
      ctx.status = 200;
      ctx.body = {
        success: true,
        message: '上传成',
        data: fileUrls, // 返回上传的文件路径
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: '没有文件上传',
      };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: '上传失败',
      error: error.message,
    };
  }
});

module.exports = router;

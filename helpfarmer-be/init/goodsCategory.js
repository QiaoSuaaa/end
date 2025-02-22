const mongoose = require('mongoose');

const { defaultCategory } = require('../src/helpers/goodsCategory');
const connectDB = require('../src/db');
const goodsCategory = mongoose.model('goodsCategory');
connectDB().then(async () => {
  console.log('角色集合初始化开始');
  const res = await goodsCategory.insertMany(defaultCategory);
  console.log('初始化完成');
});

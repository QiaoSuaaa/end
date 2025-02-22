const mongoose = require('mongoose');
const Goods = require('../src/db/Schema/goods'); // 假设 Goods 模型在 models/Goods.js 中

// MongoDB 连接字符串
const MONGO_URI = 'mongodb://localhost:27017/helpfarmer'; // 替换为你的数据库名称

// 初始商品数据
const initialGoods = [
  {
    name: '有机大米',
    description: '来自东北的优质有机大米，口感香糯',
    city: '哈尔滨',
    price: 25.5,
    production: '黑龙江农场',
    count: 100,
    content:'包含多种维生素',
    flag: true,
    category:'粮油',
    active: true,
    images: 'http://localhost:3000/d7110b56-9154-492c-97e4-2d9d020c0ab1.jpg',
  },
  {
    name: '新鲜苹果',
    description: '来自山东的红富士苹果，香甜多汁',
    city: '烟台',
    price: 8.8,
    production: '山东果园',
    count: 200,
    content:'包含多种维生素',
    flag: true,
    category:'水果',
    active: true,
    images: 'http://localhost:3000/d7110b56-9154-492c-97e4-2d9d020c0ab1.jpg',
  },
  {
    name: '有机蔬菜礼盒',
    description: '包含多种有机蔬菜，健康营养',
    city: '北京',
    price: 68.0,
    production: '北京农场',
    count: 50,
    flag: true,
    content:'包含多种维生素',
    active: true,
    category:'蔬菜',
    images:'http://localhost:3000/d7110b56-9154-492c-97e4-2d9d020c0ab1.jpg',
  },
];

// 连接 MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB 连接成功');
    // 初始化商品数据
    return Goods.insertMany(initialGoods);
  })
  .then(() => {
    console.log('商品表初始化成功');
    process.exit(0); // 退出脚本
  })
  .catch((err) => {
    console.error('初始化失败:', err);
    process.exit(1); // 退出脚本并返回错误状态
  });
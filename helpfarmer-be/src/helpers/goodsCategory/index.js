//2最低普通用户只可浏览，类似访客 1管理员,只可对比自己等级低进行修改用户和商品， 0 超级管理员只有一个
const defaultCategory = [
  {
    name: 'fruit',
    title: '水果',
  },
  {
    name: 'vegetable',
    title: '蔬菜',
  },
  {
    name: 'meat',
    title: '肉类',
  },
  {
    name: 'artfical',
    title: '手工艺品',
  },
  {
    name: 'tools',
    title: '农具',
  },
  {
    name: 'plant',
    title: '植物',
  },
  {
    name: 'grain',
    title: '粮油',
  },
];

module.exports = {
  defaultCategory,
};

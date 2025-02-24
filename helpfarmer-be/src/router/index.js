const goods=require('./goods/index');
const auth=require('./Auth/index')
const inviteCode=require('./inviteCode/index')
const character=require('./character/index')
//静态资源图片
const path =require('path')
const serve=require('koa-static')
module.exports=(app) => {
    app.use(goods.routes()).use(goods.allowedMethods());
    app.use(auth.routes());
    app.use(character.routes());
 
    app.use(inviteCode.routes());
    app.use(serve(path.join(__dirname,'../uploads/goods')))
}
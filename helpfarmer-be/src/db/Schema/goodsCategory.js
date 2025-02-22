const mongoose = require('mongoose');
const { getMeta } = require('../utils')
const CharacterSchema = new mongoose.Schema({
    name:String,
    title:String,
    // 元信息
    meta: getMeta()
})

mongoose.model('goodsCategory',CharacterSchema)
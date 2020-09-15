//第三方数据库模块
const mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost/todos', { useNewUrlParser: true , useUnifiedTopology: true })
    //连接成功
    .then(() => console.log('数据库连接成功'))
    //连接失败
    .catch(err => console.log(err, '数据库连接失败'))
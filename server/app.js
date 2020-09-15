// 引入express第三方框架
const express = require("express");
//引入第三body-parser模块，用来处理post请求参数
const bodyParser = require("body-parser");
//创建服务器
const app = express();

//引入文章集合构造函数
const { Todo } = require("./modal/todo");

//连接数据库
require("./modal/connect");

//处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }));
//拦截所有请求
app.use((req, res, next) => {
  //1、允许哪些客户端访问我
  // * 代表允许所有的客户端访问我
  //注意：如果跨域请求中涉及到cookie信息传递，值不可以为*号
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  //2、允许客户端使用哪些请求方法访问我
  res.header("Access-Control-Allow-Methods", "get,post");
  //允许客户端发送跨域请求时携带cookie信息
  // res.header('Access-Control-Allow-Credentials', true)
  next();
});

//引入todo路由模块
// const admin = require('./route/admin');
//为路由模块匹配请求地址
// app.use('/todos', admin);

//获取所有的todos任务数据
app.get("/todos", (req, res) => {
  // 查询所有的todos
  Todo.find().then((result) => {
    const data = {
      code: 200,
      data: result,
      message: "响应成功",
    };
    res.send(data);
  });
});

//添加一项todo任务
app.get("/todos-add", (req, res) => {
  // console.log(req.query)
  Todo.create(req.query)
    .then((result) => {
      const data = {
        code: 200,
        message: "添加成功",
      };
      res.send(data);
    })
    .catch((err) => {
      const data = {
        code: 400,
        message: "添加失败",
      };
      res.send(data);
    });
});

//删除一项todo任务
app.get("/todos-del", (req, res) => {
  const _id = req.query.id;
  // console.log(_id)
  Todo.findOneAndDelete({ _id })
    .then((result) => {
      const data = {
        code: 200,
        message: "删除成功",
      };
      res.send(data);
    })
    .catch((err) => {
      const data = {
        code: 400,
        message: "删除失败",
      };
      res.send(data);
    });
});

//修改一项todo任务的状态
app.get("/todos-mod", (req, res) => {
  // console.log(req.query)
  const { id, content, state } = req.query
  Todo.updateOne({_id: id}, {state, content})
    .then((result) => {
      const data = {
        code: 200,
        message: "修改成功",
      };
      res.send(data);
    })
    .catch((err) => {
      const data = {
        code: 400,
        message: "修改失败",
      };
      res.send(data);
    });
});

//启动服务器，监听端口
app.listen(3000, () => {
  console.log("服务器启动成功");
});

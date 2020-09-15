// 引入mongoose模块
const mongoose = require("mongoose");

//创建文章集合规则
const todoSchema = new mongoose.Schema({
  content: {
    type: String,
    require: [true, "请输入任务内容"],
  },
  //0 未完成
  //1 已完成
  state: {
    type: Number,
    default: 0,
  },
});

// 根据规则创建文章集合
const Todo = mongoose.model("Todo", todoSchema);

// create方法也返回promise对象
/* Todo.create({ content: "打豆豆", state: 1 })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  }); */

//将文章集合作为模块成员进行导出
module.exports = {
  Todo,
};

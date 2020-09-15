//引入文章集合构造函数
const { Todo } = require('../../modal/todo');

module.exports = (req, res) => {
    // 查询所有的todos
    Todo.find().then(result => {
      res.send(result)
    })
}
//引入express框架
const express = require('express');

//创建博客展示页面路由
const todos = express.Router();

todos.get('/todos', require('./admin/todos-index'))
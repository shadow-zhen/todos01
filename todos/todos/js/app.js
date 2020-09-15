/* 
	需求：
	功能1：在输入框中输入任务内容，按回车键时添加一个任务（20分）
		要求1：添加到任务列表的最顶部
		要求2：添加完成后，需要清空原来的内容。
		要求3：要有非空的判断，如果任务内容为空，alert提示 "任务名称不能为空"
	功能2：任务删除功能，点击任务中的删除按钮，能够删除当前任务（10分）
	功能3：任务状态修改功能，点击checkbox，要求能够修改任务的完成状态。（10分）
		提示：当checkbox选中时，需要给li添加completed类， 当checkbox不选中时，需要移除completed类
	提示1：当checkbox选中时，需要给li添加completed类， 当checkbox不选中时，需要移除completed类
	提示2：详细功能参照素材提供的gif图。

*/
$(function(){
	// 开始你的表演....
	// 获取input框
	var $newTodo = $('.todoapp .new-todo');
	// 获取jQ document文档对象
	var $document = $(document)
	// 获取$ul
	var $ul = $('.todoapp .main .todo-list')
	// 获取JQ对象，任务删除按钮
	var $destroy = $('.todoapp .main .todo-list .destroy')
	// 获取jQ对象任务修改按钮
	var $toggle = $('.todoapp .main .todo-list .toggle')


	//进入页面，发送ajax请求，获取todos任务列表，并渲染到页面中
	function render() {
		$.ajax({
			type: 'get',
			url: 'http://localhost:3000/todos',
			success: function (res) {
				console.log(res)
				if(res.code === 200) {
					let htmlStr = template('todosTpl', res)
					$ul.html(htmlStr)
				}
			}
		})
	}

	render()
	
	// 功能1：在输入框中输入任务内容，按回车键时添加一个任务,发送ajax请求
	$document.on('keydown', function (e) {
		// console.log(e.keyCode)
		if(e.keyCode === 13) {
			let txt = $newTodo.val().trim()
			if(!txt) {
				return alert('任务名称不能为空')
			}
			//当任务内容不为空时，发送Ajax请求
			$.ajax({
				type: 'get',
				url: 'http://localhost:3000/todos-add',
				data: {
					content: txt,
					state: 0
				},
				success: function (res) {
					// console.log(res)
					if(res.code === 200) {
						render()
					}
				}
			})
			// 添加完成后，需要清空原来的内容
			$newTodo.val('')
		}
	})

	// 功能2：任务删除功能，点击任务中的删除按钮，能够删除当前任务
	$ul.on('click', '.destroy', function (e) {
		$.ajax({
			type: 'get',
			url: 'http://localhost:3000/todos-del',
			data: {
				id: $(this).data('id')
			},
			success: function (res) {
				// console.log(res)
				if(res.code === 200) {
					render()
				}
			}
		})
	})

	// 功能3：任务状态修改功能，点击checkbox，要求能够修改任务的完成状态。
	$ul.on('click', '.toggle', function () {
		$(this).prop('checked', $(this).prop('checked')).parent().toggleClass('completed')
		let state = $(this).parent().hasClass('completed') ? 1 : 0
		let content = $(this).next().text()
		$.ajax({
			type: 'get',
			url: 'http://localhost:3000/todos-mod',
			data: {
				id: $(this).nextAll('button').data('id'),
				content,
				state
			},
			success: function (res) {
				console.log(res)
				if(res.code === 200) {
					render()
				}
			}
		})
	})

	function createList(value) {
		return $('<li>' +
		'<input class="toggle" type="checkbox">' +
		'<label>' + value + '</label>' +
		'<button class="destroy"></button>' +
	'</li>').prependTo($ul)
	}
});
import React from 'react';
import TodoList from '../TodoList/TodoList';
import TodoForm from '../TodoForm/TodoForm';

class TodoApp extends React.Component {
  
  constructor (props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);

    this.state = {
      todoItems: []
    };
  }

  componentWillMount() {
    fetch('http://localhost:8080/api/v1/todos')
      .then(res => res.json())
      .then(data => {
        let todos = [];
        for(let todo of data.objects) {
          todo.index = data.objects.indexOf[todo];
          todo.url = todo.links.self;
          todos.push(todo);
        }
        this.setState({
          todoItems : todos
        })
      });
  }
	
  
  addItem(todoItem) {
    fetch('http://localhost:8080/api/v1/todos', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({description: todoItem.description})
    })
    .then(res => res.json())
    .then(todo => {
      console.log(todo);
      this.setState({
        todoItems: [
          ...this.state.todoItems,
          {
            done: todo.done,
            url: todo.links.self,
            description : todo.description,
            index: this.state.todoItems.length + 1,
          }
        ]
      });
    });
  
  }

  removeItem (itemIndex) {
    let todoItems = this.state.todoItems.slice(0);
    let todo = todoItems.splice(itemIndex, 1)[0];
    fetch('http://localhost:8080' + todo.url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    this.setState({
      todoItems: todoItems
    });
  }

  markTodoDone(itemIndex) {
    let todoItems = this.state.todoItems.slice(0);
    var todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
    
    fetch('http://localhost:8080' + todo.url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({description: todo.description, done: todo.done})
    });
    this.setState({todoItems: todoItems});  
  }

  render() {
    return (
      <>
        <TodoList items={this.state.todoItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone} />
        <TodoForm addItem={this.addItem} />
      </>
    );
  }
}

export default TodoApp;
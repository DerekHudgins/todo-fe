import React, { Component } from 'react'
import { addTodo, completeTodo, getTodos } from './Fetch-Utils'

export default class TodoPage extends Component {
    state = {
        todos: [],
        name: ''
    }

    componentDidMount = async () => {
        await this.doFetch()
    }

    doFetch = async () => {
        const todos = await getTodos(this.props.token);
        this.setState({todos: todos })
    }

    handleSubmit = async e => {
        e.preventDefault();
        await addTodo(this.state.name, this.props.token);
        await this.doFetch()
        console.log(this.state.todos)
    }

    handleNameChange = e => {
        this.setState({ name: e.target.value })
    }

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        name
                        <input onChange={this.handleNameChange}/>
                    </label>
                    <button>Add a Todo</button>
                </form>
                <div>
                    {
                        this.state.todos.map(todo => 
                        <p 
                            className={ todo.completed ? 'completed' : 'not-completed'}
                            key={`${todo.name}${todo.id}`} 
                            onClick={async () => {
                                await completeTodo(todo.id, this.props.token)
                                await this.doFetch()
                            }}
                            >
                            {todo.todo}
                        </p>)
                    }
                </div>
            </div>
            
        )
    }
}

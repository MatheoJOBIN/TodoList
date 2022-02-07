import Todo from './todo';
import Graph from './graph';
import { collection, doc, getDoc, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import React, { Component } from 'react';

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            newTask: '',
            authId: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getTodos();
    }
    componentDidUpdate() {
        this.render();
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("Task: ", this.state.newTask, " Id : ", this.state.authId)
        this.addTodo();
    }
    handleChange(event) {
        this.setState({ newTask: event.target.value })
        console.log("Task: ", this.state.newTask, " Id : ", this.state.authId)
    }

    addTodo() {
        const docRef = collection(db, "todos", this.state.authId, "todo");
        addDoc(docRef, {
            done: false,
            task: this.state.newTask,
            img: "null"
        });
        console.log("Id Doc : ", docRef.id);
    }

    getTodos() {
        const authorId = this.props.todo;
        getDocs(collection(db, "todos", `${authorId}`, "todo"))
            .then((todos) => {
                todos.forEach((todoId) => {
                    var docRef1 = doc(db, "todos", `${authorId}`, "todo", `${todoId.id}`)
                    getDoc(docRef1)
                        .then((todo) => {
                            try {
                                if (todo.exists()) {
                                    this.setState({
                                        todoList: [...this.state.todoList, {
                                            id: todo.id,
                                            value: todo.data()
                                        }]
                                    });
                                    this.setState({ authId: this.props.todo })

                                    console.log(todo.data().img)
                                }
                            } catch (e) {
                                console.log(e);
                            }
                        })
                });
            });
        this.render();
    }

    render() {
        return (
            <div className="todoTable">
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Tâche</th>
                            <th>Fait</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    {this.state.todoList ? this.state.todoList.map((todo) => {
                        return (<Todo todo={todo.value} authorId={this.props.todo} id={todo.id} key={todo.id} />)
                    })
                        : ''}
                </table>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" defaultValue="Exemple: Chasser des baleines lunaires" onChange={this.handleChange} className="textNameTask"></input>
                    <input type="submit" value="Ajouter une tâche" className="btnCreateTask"></input>
                </form>
            </div>
        )
    }
}
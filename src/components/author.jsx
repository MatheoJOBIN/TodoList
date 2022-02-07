import TodoList from './todoTable';
import React, { Component } from 'react';

export default class Author extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: "",
        }
    }

    componentDidMount() {
        this.render();
    }

    componentDidUpdate() {
        this.render();
    }

    handleClick(Id) {
        if (this.state.todo == Id) {
            this.setState({ todo: "" });
        } else {
            this.setState({ todo: this.state.todo = Id });
        }
    }

    _renderSubComp() {
        switch (this.state.todo) {
            case `${this.props.id}`: return (<div className="todoList"><TodoList todo={this.state.todo} /></div>);
        }
    }

    render() {
        const { author, id } = this.props;
        return (
            <div>
                <div className="author">
                    <button className="authorButton" value={id} onClick={() => this.handleClick(id)}>{author}</button>
                </div>
                {this._renderSubComp()}
            </div>
        )
    }
}
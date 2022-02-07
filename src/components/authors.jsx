import Author from './author';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';
import React, { Component } from 'react';
import Graph from './graph';

export default class Authors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authorList: [],
            maxLength: false,
        }
    }

    componentWillMount() {
        this.getAuthors();
        this.setState({maxLength: true})
        this.render();
    }
    componentDidMount() {
        this.render();
    }

    getAuthors() {
        console.log("1")
        getDocs(collection(db, "todos"))
            .then((authors) => {
                console.log("2")
                authors.forEach((authorId) => {
                    console.log("3")
                    var docRef = doc(db, "todos", `${authorId.id}`);
                    getDoc(docRef).then((author) => {
                        console.log("4")
                        try {
                            if (author.exists()) {
                                this.setState({
                                    authorList: [...this.state.authorList, {
                                        id: author.id,
                                        value: author.data()
                                    }]
                                })
                            } else {
                                // doc.data() will be undefined in this case
                                this.state.authorList.push({ "Name": "Rien" });
                            }
                        } catch (e) {
                            console.log(e)
                        }
                    })
                });
            });
        this.render();
    }

    componentDidUpdate() {

        console.log(this.state.authorList);
        console.log("recharge");
        this.render();
    }

    render() {
        console.log(this.state.maxLength, this.state.authorList.length)
        var hasValue = false;
        if (this.state.maxLength) {
            hasValue = true;
            
        }
        return (
            <div className="authorList">
                {this.state.authorList ? this.state.authorList.map((author) => {
                    return (<Author author={author.value.Nom} id={author.id} key={author.id} />)
                })
                    : ''}
                {hasValue ? (<Graph authorList={this.state.authorList}/>)
                : ''}
            </div>
        );
    }

}
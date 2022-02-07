import React, { Component } from 'react';
import { updateDoc } from 'firebase/firestore';
import { doc, deleteDoc } from 'firebase/firestore';
import { db, storage } from '../firebase.js';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Modal from "./modal";

export default class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authId: "",
            id: "",
            img: "",
            task: "",
            done: false,
            show: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeImg = this.handleChangeImg.bind(this);
    }

    deleteTodo(Id, authId) {
        const docRef = doc(db, "todos", `${authId}`, "todo", `${Id}`)
        try {
            deleteDoc(docRef)
        } catch (e) {
            console.log(e);
        }
    }

    completeTodo(Id, authId) {
        const docRef = doc(db, "todos", `${authId}`, "todo", `${Id}`)
        try {
            updateDoc(docRef, { done: !this.state.done });
            this.setState({ done: !this.state.done });
        } catch (e) {
            console.log(e);
        }
    }

    handleChange(event) {

        console.log(this.state.img, this.state.imgRef, this.props.todo.img)
        if (event.target.value != this.state.task) {
            const docRef = doc(db, "todos", `${this.state.authId}`, "todo", `${this.state.id}`)
            try {
                updateDoc(docRef, { task: event.target.value })
                this.setState({ task: event.target.value })
            } catch (e) {
                console.log(e);
            }
        }
    }

    handleChangeImg(event) {
        console.log(event.target.files[0])

        console.log("Ajout img tag");

        const docRef = doc(db, "todos", `${this.state.authId}`, "todo", `${this.state.id}`)
        try {
            updateDoc(docRef, { img: event.target.files[0].name })
            this.setState({ img: event.target.files[0].name })

            console.log("Ajout img storage");
            const imgStorage = ref(storage, 'img/' + event.target.files[0].name);
            const uploadImg = uploadBytes(imgStorage, event.target.files[0]);
            uploadImg.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;
                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadImg.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                    });
                }
            );
        } catch (e) {
            console.log(e);
        }



        this.hideModalImg();
    }

    deleteImg = () => {
        const docRef = doc(db, "todos", `${this.state.authId}`, "todo", `${this.state.id}`)
        try {
            updateDoc(docRef, { img: "null" });
            this.setState({ img: "null" });
        } catch (e) {
            console.log(e);
        }
        this.hideModalImg();
    }

    showModalImg = () => {
        console.log("Click image");
        this.setState({ show: true });
    }
    hideModalImg = () => {
        this.setState({ show: false });
    }

    componentDidMount() {
        this.setState({ authId: this.props.authorId, id: this.props.id, task: this.props.todo.task, done: this.props.todo.done, img: this.props.todo.img });
        const imgRef = ref(storage, 'img/' + this.props.todo.img);
        getDownloadURL(imgRef).then((url) => {
            const img = document.getElementById(this.state.img);
            img.setAttribute('src', url);
            const imgModal = document.getElementById(this.state.img + "Modal");
            imgModal.setAttribute('src', url);
        });
        this.render();
    }
    componentDidUpdate() {
        this.render();
    }

    render() {
        return (
            <tbody>
                <tr>
                    <td className="tdImg">
                        {this.state.img != "null" ?
                            <img onClick={this.showModalImg} src="" className="imgIllustrationTask" id={this.state.img} alt="Illustration task"></img>
                            :
                            <div>
                                <input type="file" className="dlImg" id={this.state.id} accept="image/png, image/jpeg" onChange={this.handleChangeImg}></input>
                                <label htmlFor={this.state.id} className="lblDlImg">Mettre une image d'illustration</label>
                            </div>
                        }
                    </td>
                    <td className="tdTask"><input type="text" className="textTask" value={this.state.task} onChange={this.handleChange}></input></td>
                    {
                        this.state.done ?
                            <td><input type="checkbox" checked onChange={() => this.completeTodo(this.state.id, this.state.authId)}></input></td>
                            :
                            <td><input type="checkbox" onClick={() => this.completeTodo(this.state.id, this.state.authId)}></input></td>
                    }
                    <td><button className="btnSupprTask" onClick={() => this.deleteTodo(this.state.id, this.state.authId)}>Supprimer</button></td>
                </tr>

                <Modal show={this.state.show} handleClose={this.hideModalImg} handleChangeModal={this.handleChangeImg} deleteImg={this.deleteImg}>
                    <img src="" id={this.state.img + "Modal"} className="imgIllustrationModal" alt="Illustration task modal"></img>
                </Modal>
            </tbody>
        )
    }
}
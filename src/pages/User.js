import React from "react";
import axios from "axios";
import Navbar from '../component/Navbar';
import { Modal, Button, Card, Container, Form } from "react-bootstrap";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin2Fill } from "react-icons/ri";

export default class User extends React.Component {
    constructor() {
        super()
        this.state = {
            token:"",
            id_user: "",
            email: "",
            username: "",
            password: "",
            role: "",
            users: [],
            action: "",
            isModalOpen: false
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/signin"
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization : `Bearer ${this.state.token}` }
        }
        return header
  }
    
    getUser = async () => {
        let url = "http://localhost:4040/api/user"
        await axios.get(url, this.headerConfig())
        .then(response => { 
            this.setState({users: response.data.data})
            console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        console.log(this.state.users)
    }
    componentDidMount = () => {
        this.getUser()
    }
    handleAdd = () =>{
        this.setState({
            id_user: 0,
            email: "",
           username: "",
            password: "",
            role: "",
            action: "insert",
            isModalOpen: true
        })
    }
    handleEdit = (item) =>{
        this.setState({
            id_user: item.id_user,
            email: item.email,
            username: item.username,
            password: item.password,
            role: item.role,
            action: "update",
            isModalOpen: true
        })
    }
    handleSave = (event) =>{
        event.preventDefault();
        // $("#modal_member").modal("hide")
        let url = "http://localhost:4040/api/user"
        let form = {
            id_user: this.state.id_user,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            role: this.state.role,
        }
        
        if(this.state.action === "insert"){
            axios.post(url, form,this.headerConfig())
            .then(response => { 
                window.alert("SUCCESS")
                this.getUser()
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
        }else if(this.state.action === "update"){
            axios.put(url, form,this.headerConfig())
            .then(response => {
                window.alert("UPDATE SUCCESS")
                this.getUser()
                console.log(response)
            })
            .catch(error => {
                console.error();
            })
        } 
    }
    handleDelete = (id_user) => {
        let url = "http://localhost:4040/api/user/" + id_user
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
          axios.delete(url,this.headerConfig())
          .then(response => {
            this.getUser();
            console.log(response)
          })
          .catch(error => {
            console.log(error);
          })
        }
    }
    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }
    render() {
        return (
            <div>
                <Navbar />
                <Container className="my-4">
                    <Card className="card">
                        <Card.Body className="card-body">
                            <h2 className="text-black text-center my-4">
                                List user
                            </h2>
                            <br />
                          

                            <ul className="list-group mx-3">
                            {this.state.users.map(user => (
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <small className="text-secondary">email :</small>
                                            <h6>{user.email}</h6>
                                        </div>
                                        <div className="col-lg-3">
                                            <small className="text-secondary">Username :</small> <br />
                                            <h6>{user.username}</h6>
                                        </div>
                                        {/* <div className="col-lg-2">
                                            <small className="text-secondary">Password :</small> <br />
                                            <h6>{member.jenis_kelammin}</h6>
                                        </div> */}
                                        <div className="col-lg-2">
                                            <small className="text-secondary">Role :</small> <br />
                                            <h6>{user.role}</h6>
                                        </div>
                                        <div className="col-lg-2">
                                            <button className="btn btn-sm btn-success m-2" onClick={() => this.handleEdit(user)}>
                                                <FiEdit2 style={{color: "white"}}/>
                                            </button>
                                            <button className="btn btn-sm btn-danger m-2" onClick={() => this.handleDelete(user.id_user)}>
                                                <RiDeleteBin2Fill style={{color: "white"}}/>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                ))}
                            </ul>
                            <div className="">
                                <Button className="btn btn-warning my-3 mx-3" onClick={() => this.handleAdd()}>
                                    Add User
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>

                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah User</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSave}>
                        <Modal.Body>
                            <Form.Group className="mb-2">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={this.state.email} 
                                onChange={ev => this.setState({email: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> Username </Form.Label>
                                <Form.Control type="text" value={this.state.username}
                                onChange={ev => this.setState({username: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> Password </Form.Label>
                                <Form.Control type="text" value={this.state.password}
                                onChange={ev => this.setState({password: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> Role </Form.Label>
                                <Form.Select value={this.state.role} 
                                onChange={ev => this.setState({role: ev.target.value})}>
                                    <option value="">~Pilih Role~</option>
                                    <option value={"admin"}>Admin</option>
                                    <option value="kasir">Kasir</option>
                                    <option value="owner">Owner</option>
                                </Form.Select>
                            </Form.Group>
                            
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Modal.Body>
                    </Form>
                </Modal>
            </div>
        );
    }
}

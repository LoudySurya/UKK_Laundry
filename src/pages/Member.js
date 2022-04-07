import React from "react";
import axios from "axios";
import Navbar from '../component/Navbar';
import { Modal, Button, Card, Container, Form } from "react-bootstrap";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin2Fill } from "react-icons/ri";  

export default class Member extends React.Component {
    constructor() {
        super()
        this.state = {
            token:"",
            id_member: "",
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            tlp: "",
            members: [],
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
    getMember = async () => {
        let url = "http://localhost:4040/api/member"
        await axios.get(url, this.headerConfig())    
        .then(response => { 
            this.setState({members: response.data.data})
            console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        console.log(this.state.members)
    }
    componentDidMount = () => {
        this.getMember()
    }
    handleAdd = () =>{
        this.setState({
            id_member: 0,
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            tlp: "",
            action: "insert",
            isModalOpen: true
        })
    }
    handleEdit = (item) =>{
        this.setState({
            id_member: item.id_member,
            nama: item.nama,
            alamat: item.alamat,
            jenis_kelamin: item.jenis_kelamin,
            tlp: item.tlp,
            action: "update",
            isModalOpen: true
        })
    }
    handleSave = (event) =>{
        event.preventDefault();
        // $("#modal_member").modal("hide")
        let url = "http://localhost:4040/api/member"
        let form = {
            id_member: this.state.id_member,
            nama: this.state.nama,
            alamat: this.state.alamat,
            jenis_kelamin: this.state.jenis_kelamin,
            tlp: this.state.tlp
        }
        
        if(this.state.action === "insert"){
            axios.post(url, form,this.headerConfig())
            .then(response => { 
                window.alert("SUCCESS")
                this.getMember()
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
        }else if(this.state.action === "update"){
            axios.put(url, form,this.headerConfig())
            .then(response => {
                window.alert("UPDATE SUCCESS")
                this.getMember()
                console.log(response)
            })
            .catch(error => {
                console.error();
            })
        } 
    }
    handleDelete = (id_member) => {
        let url = "http://localhost:4040/api/member/" + id_member
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
          axios.delete(url,this.headerConfig())
          .then(response => {
            this.getMember();
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
                                List Member
                            </h2>
                            <br />
                            <ul className="list-group mx-3">
                            {this.state.members.map(member => (
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <small className="text-secondary">Nama :</small>
                                            <h6>{member.nama}</h6>
                                        </div>
                                        <div className="col-lg-3">
                                            <small className="text-secondary">Alamat :</small> <br />
                                            <h6>{member.alamat}</h6>
                                        </div>
                                        <div className="col-lg-2">
                                            <small className="text-secondary">Jenis Kelamin :</small> <br />
                                            <h6>{member.jenis_kelamin}</h6>
                                        </div>
                                        <div className="col-lg-2">
                                            <small className="text-secondary">Telepon :</small> <br />
                                            <h6>{member.tlp}</h6>
                                        </div>
                                        <div className="col-lg-2">
                                            <button className="btn btn-sm btn-success m-2" onClick={() => this.handleEdit(member)}>
                                                <FiEdit2 style={{color: "white"}}/>
                                            </button>
                                            <button className="btn btn-sm btn-danger m-2" onClick={() => this.handleDelete(member.id_member)}>
                                                <RiDeleteBin2Fill style={{color: "white"}}/>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                
                                ))}
                            </ul>
                            <div className="">
                                <Button className="btn btn-warning my-3 mx-3" onClick={() => this.handleAdd()}>
                                    Add Member
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>

                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Form tambah member</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSave}>
                        <Modal.Body>
                            <Form.Group className="mb-2">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text" value={this.state.nama} 
                                onChange={ev => this.setState({nama: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> Alamat </Form.Label>
                                <Form.Control type="text" value={this.state.alamat}
                                onChange={ev => this.setState({alamat: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> Jenis Kelamin </Form.Label>
                                <Form.Select value={this.state.jenis_kelamin} 
                                onChange={ev => this.setState({jenis_kelamin: ev.target.value})}>
                                    <option value="jenis_kelamin">~Jenis Kelamin~</option>
                                    <option value={"wanita"}>Wanita</option>
                                    <option value="pria">Pria</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> Telepon </Form.Label>
                                <Form.Control type="text" value={this.state.tlp}
                                onChange={ev => this.setState({tlp: ev.target.value})} />
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

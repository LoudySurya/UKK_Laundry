import React from 'react';
import axios from "axios";
import { Modal, Button, Card, Container, Form } from 'react-bootstrap';
import Navbar from '../component/Navbar';
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin2Fill } from "react-icons/ri"; 

export default class Outlet extends React.Component{
constructor(){
super()
        this.state = {
            token:"",
            id_outlet: "",
            lokasi: "",
            nama_outlet:"",
            outlets: [],
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
    getOutlet = async () => {
        let url = "http://localhost:4040/api/outlet"
        await axios.get(url, this.headerConfig())    
        .then(response => { 
            this.setState({outlets: response.data.data})
            console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        console.log(this.state.outlets)
    }
   componentDidMount = () =>{
        this.getOutlet()
    }
    handleAdd = () => {
        this.setState({
            id_outlet: 0,
            lokasi: "",
            alamat:"",
            nama_outlet:"",
            action: "insert",
            isModalOpen: true
        })
    }
    handleEdit = (item) => {
        this.setState({
            id_outlet: item.id_outlet,
            lokasi: item.lokasi,
            alamat:item.alamat,
            nama_outlet:item.nama_outlet,
            action: "update",
            isModalOpen: true
        })
    }
    handleSave = (event) => {
        event.preventDefault();
        let url = "http://localhost:4040/api/outlet"
        let form = {
            id_outlet: this.state.id_outlet,
            lokasi: this.state.lokasi,
            alamat:this.state.alamat,
            nama_outlet:this.state.nama_outlet
        }
        if (this.state.action === "insert") {
            axios.post(url, form,this.headerConfig())
            .then(response => {
                window.alert("SUCCESS")
                this.getOutlet()
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
        }else if(this.state.action === "update"){
            axios.put(url, form,this.headerConfig())
            .then(response => {
                window.alert("UPDATE SUCCESS")
                this.getOutlet()
                console.log(response)
            })
            .catch(error => {
                console.error();
            })
        }
    }
    handleDelete = (id_outlet) => {
        let url = "http://localhost:4040/api/outlet/" + id_outlet
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
          axios.delete(url,this.headerConfig())
          .then(response => {
            this.getOutlet();
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
   render(){
      return(
            <div>
                <Navbar />
                <Container className="my-4"> 
                    <Card className="card shadow">
                        <Card.Body className='card-body'>
                            <h2 className='text-black text-center my-4'>
                               List Outlet
                            </h2>
                            <br />
                          
                            <ul className="list-group mx-3">
                            {this.state.outlets.map(outlet => (
                                <li className="list-group-item">
                                    <center className="row">   
                                        <div className="col-lg-3 col-md-3 col-sm-3">
                                            <small className="text-secondary">Lokasi :</small>
                                            <h6>{outlet.lokasi}</h6>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3">
                                            <small className="text-secondary">Alamat :</small>
                                            <h6>{outlet.alamat}</h6>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3">
                                            <small className="text-secondary">Nama Outlet :</small>
                                            <h6>{outlet.nama_outlet}</h6>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3">
                                            <button className="btn btn-sm btn-success m-4" onClick={() => this.handleEdit(outlet)}>
                                                <FiEdit2 style={{color: "white"}}/>
                                            </button>
                                            <button className="btn btn-sm btn-danger m-4d" onClick={() => this.handleDelete(outlet.id_outlet)}>
                                                < RiDeleteBin2Fill style={{color: "white"}}/>
                                            </button>
                                        </div>
                                    </center>
                                </li>
                            ))}
                              <div className="">
                                <Button className="btn btn-warning shadow my-3 mx-3" onClick={() => this.handleAdd()}>
                                    Add Outlet
                                </Button>
                            </div>
                            </ul>
                        </Card.Body>
                    </Card>
                </Container>

                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Form  Outlet</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSave}>
                        <Modal.Body>
                            {/* <Form.Group className="mb-2">
                                <Form.Label>Id</Form.Label>
                                <Form.Control type="text" value={this.state.id_outlet} 
                                onChange={ev => this.setState({id_outlet: ev.target.value})} />
                            </Form.Group> */}
                            <Form.Group className="mb-2">
                                <Form.Label> Lokasi </Form.Label>
                                <Form.Control type="text" value={this.state.lokasi}
                                onChange={ev => this.setState({lokasi: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> Alamat </Form.Label>
                                <Form.Control type="text" value={this.state.alamat}
                                onChange={ev => this.setState({alamat: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> Nama outlet </Form.Label>
                                <Form.Control type="text" value={this.state.nama_outlet}
                                onChange={ev => this.setState({nama_outlet: ev.target.value})} />
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
        )     
    }
}
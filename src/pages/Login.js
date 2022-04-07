import React from 'react';
import {Card, Form, Button, Container, Nav} from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from 'axios';
import { base_url } from '../Config';


export default class Login extends React.Component {
constructor(){
        super()
        this.state = {
            email: "",
            password: "",
            role:"",
            massage: "",
            logged: true
        }
    }
    Login = event => {
        event.preventDefault()
        let sendData = {
            username: this.state.username,
            password: this.state.password,
            role:this.state.role
        }

        let url = base_url + "user/auth"

    //     axios.post(url, sendData)
    //     .then(response => {
    //         this.setState({logged: response.data.logged})
    //         if (this.state.logged){
    //             let user = response.data.data
    //             let token = response.data.token
    //             localStorage.setItem("user", JSON.stringify(user))
    //             localStorage.setItem("token", token)
    //             this.props.history.push("/")
    //         }else{
    //             this.setState({massage: response.data.massage})
    //         }
    //     })
    //     .catch(error => console.log(error))
    // }
    
    axios.post(url, sendData)
    .then(response => {
        this.setState({logged: response.data.logged})
        if (this.state.logged){
            switch (this.state.role) {
                case "admin":
                    let admin = response.data.data
                    let token = response.data.token
                    localStorage.setItem("admin", JSON.stringify(admin))
                    localStorage.setItem("token", token)
                    this.props.history.push("/")
                    break;
                case "owner":
                    let owner = response.data.data
                    let token_owner = response.data.token
                    localStorage.setItem("owner", JSON.stringify(owner))
                    localStorage.setItem("token", token_owner)
                    this.props.history.push("/homeowner")
                    break;
                case "kasir":
                    let kasir = response.data.data
                    let token_kasir = response.data.token
                    localStorage.setItem("kasir", JSON.stringify(kasir))
                    localStorage.setItem("token", token_kasir)
                    this.props.history.push("/homekasir")
                    break;
                default:
                    break;
            }
                
                
        }else{
            this.setState({massage: response.data.massage})
        }
    })
    .catch(error => console.log(error))
}
    
    render() {
        return (
            <Container className="container d-flex justify-content-center align-items-center">
                <Card className="col-sm-5 card my-5">
                <Card.Body className='my-5 px-5'>
                    <h2 className='text-center'>Sign In</h2>
                    <br />
                    
                    <Form onSubmit={ev => this.Login(ev)}>
                        <Card.Text>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" value={this.state.username}
                                onChange={ev => this.setState({username: ev.target.value})}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label> Password </Form.Label>
                                <Form.Control type="password" placeholder="Password" value={this.state.password}
                                onChange={ev => this.setState({password: ev.target.value})}
                                autoComplete="false" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select select value={this.state.role}
                                onChange={ev => this.setState({role: ev.target.value})}
                                autoComplete="false" >
                                    <option select>Pilih Role</option>
                                <option value="admin" >admin</option>
                                <option value="owner" >owner</option>
                                <option value="kasir" >kasir</option>
                                </Form.Select>
                            </Form.Group>
                        </Card.Text>
                        { !this.state.logged ? 
                        (
                            <div className="alert alert-danger mt-1 text-center">
                                your username or password is not registered{ this.state.message }
                            </div>
                        ) : null }
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit">Submit</Button>
                        </div>
                    </Form>
                </Card.Body>
            
                </Card>
            </Container>
        );
    }
}
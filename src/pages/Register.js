import React from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import { base_url } from '../Config';

export default class Register extends React.Component {
        constructor(){
        super()
        this.state = {
            email: "",
            password: "",
            massage: "",
            logged: true
        }
    }
    Login = event => {
        event.preventDefault()
        let sendData = {
            email: this.state.email,
            password: this.state.password
        }

        let url = base_url + "user/auth"

        axios.post(url, sendData)
        .then(response => {
            this.setState({logged: response.data.logged})
            if (this.state.logged){
                let admin = response.data.data
                let token = response.data.token
                localStorage.setItem("admin", JSON.stringify(admin))
                localStorage.setItem("token", token)
                this.props.history.push("/")
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
                <Card.Body className='my-4 px-5'>
                    <h2 className='text-center'>Sign Up</h2>
                    <br />
                    <Form onSubmit={ev => this.Login(ev)}>
                        <Card.Text>
                            <Form.Group className="mb-2">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Username" value={this.state.username}
                                onChange={ev => this.setState({username: ev.target.value})}
                                autoComplete="false" />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> Email </Form.Label>
                                <Form.Control type="text" placeholder="Email"value={this.state.email}
                                onChange={ev => this.setState({email: ev.target.value})}
                                autoComplete="false"  />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> Password </Form.Label>
                                <Form.Control type="password" placeholder="Password"value={this.state.password}
                                onChange={ev => this.setState({password: ev.target.value})}
                                autoComplete="false"   />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> Role </Form.Label>
                                <Form.Select>
                                    <option>Admin</option>
                                    <option>Owner</option>
                                </Form.Select>
                            </Form.Group>
                        </Card.Text>
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit">Submit</Button>
                            <Card.Text className='forgot-password text-end'>Already registered ?<Link to='/login'><strong> Sign In</strong></Link></Card.Text>
                        </div>
                    </Form>
                </Card.Body>
                </Card>
            </Container>
        );
    }
}
import axios from 'axios';
import React from 'react';
import { Card, Container } from 'react-bootstrap';
import Navbar from '../component/Navbar';
import {Link} from 'react-router-dom'


export default class Home extends React.Component{
constructor(){
super()
        this.state = {
            userName: "",
            countMember: "",
            countUser: "",
            countPaket: "",
            countTransaksi: "",
            token: ""
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/"
        }
}
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getUsers = () => {
        let admin = JSON.parse(localStorage.getItem('admin'))
        this.setState({userName: admin.username})
    }
    getMember = () => {
        let url = "http://localhost:4040/api/member"
        axios.get(url, this.headerConfig())
        .then(response => {
          this.setState({countMember: response.data.data.length});
        })
        .catch(error => {
            if (error.res) {
                if (error.res.status) {
                    window.alert(error.res.data.message)
                    this.props.history.push("/")
                }
            } else {
                console.log(error);
            }
        })
    }
    getUser = () => {
        let url = "http://localhost:4040/api/user"
        axios.get(url,this.headerConfig())
        .then(response => {
          this.setState({countUser: response.data.data.length});
          console.log(response)
        })
        .catch(error => {
          console.log(error);
        });
    }
 
    getPaket = () => {
        let url = "http://localhost:4040/api/paket"
        axios.get(url,this.headerConfig())
        .then(response => {
          this.setState({countPaket: response.data.data.length});
          console.log(response)
        })
        .catch(error => {
          console.log(error);
        });
    }
    getTransaksi = () => {
        let url = "http://localhost:4040/api/transaksi"
        axios.get(url,this.headerConfig())
        .then(response => {
          this.setState({countTransaksi: response.data.data.length});
          console.log(response)
        })
        .catch(error => {
          console.log(error);
        });
    }
    getOutlet = () => {
        let url = "http://localhost:4040/api/outlet"
        axios.get(url,this.headerConfig())
        .then(response => {
          this.setState({countOutlet: response.data.data.length});
          console.log(response)
        })
        .catch(error => {
          console.log(error);
        });
    }
    componentDidMount = () => {
        this.getMember()
        this.getUsers()
        this.getPaket()
        this.getTransaksi()
        this.getUser()
        this.getOutlet()
    }
render(){
    return(
            <div>
                <Navbar />
                <Container className="container my-4">
                    <Card className="card shadow p-4 rounded rounded-5 border-0">
                        <Card.Body className="card-body">
                            <h3 className="my-2">
                                <strong>Welcome Back, {this.state.userName}</strong>
                            </h3>
                            <div className="row">
                                
                                <div className="col-lg-6 col-md-3 col-sm-5 mt-2">
                                    <div className="border border-secondary bg-warning">
                                        <div className="card-body" >
                                            <h5 className="text-secondary">
                                                <strong>Jumlah Member</strong>
                                            </h5>
                                            <h1 className="text text-end">
                                                <h5>{this.state.countMember}</h5>
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-lg-6 col-md-6 col-sm-12 mt-2">
                                    <div className="border border-secondary bg-warning">
                                        <div className="card-body" >
                                            <h5 className="text-secondary">
                                                <strong>Jumlah User</strong>
                                            </h5>
                                            <h1 className="text text-end">
                                                <h5>{this.state.countUser}</h5>
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 mt-2">
                                    <div className="border border-secondary bg-warning">
                                        <div className="card-body" >
                                            <h5 className="text-secondary">
                                                <strong>Jumlah Paket</strong>
                                            </h5>
                                            <h1 className="text text-end">
                                                <h5>{this.state.countPaket}</h5>
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 mt-2">
                                    <div className="border border-secondary bg-warning">
                                        <div className="card-body" >
                                            <h5 className="text-secondary">
                                                <strong>Jumlah Transaksi</strong>
                                            </h5>
                                            <h1 className="text text-end">
                                                <h5>{this.state.countTransaksi}</h5>
                                            </h1>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 mt-2">
                                    <div className="border border-secondary bg-warning">
                                        <div className="card-body" >
                                            <h5 className="text-secondary">
                                                <strong >Jumlah Outlet</strong>
                                            </h5>
                                            <h1 className="text text-end">
                                                <h5>{this.state.countOutlet}</h5>
                                            </h1>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>    
                </Container>
            </div>
        )
}
}


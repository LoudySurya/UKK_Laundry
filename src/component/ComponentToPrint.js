import React from "react";
import axios from "axios";
// import Navbar from '../component/Navbar';
import { Modal, Button, Card, Container, Form } from "react-bootstrap";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin2Fill } from "react-icons/ri"; 
import { FaPrint } from "react-icons/fa";  

export default class transaksi extends React.Component {
    constructor() {
        super()
        this.state = {
            token:"",
            id_transaksi: "",
            id_member: "",
            id_paket:"",
            tgl: "",
            batas_waktu:"",
            tgl_bayar:"",
            status:"",
            dibayar:"",
            id_user:"",
            idUser:"",
            namaUser:"",
            id_outlet:"",
            qty:0,
            users:[],
            user:[],
            paket:[],
            transaksi: [],
            member: [],
            outlet:[],
            detail_transaksi: [],
            nama: "",
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
  convertTime = time => {
    let date = new Date(time)
    return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()} `
  }
  getTransaksi() {
    let url = "http://localhost:4040/api/transaksi/"
    axios.get(url, this.headerConfig())
        .then(response => {
            let dataTransaksi = response.data.data
            for (let i = 0; i < dataTransaksi.length; i++) {
                let total = 0;
                for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
                    let harga = dataTransaksi[i].detail_transaksi[j].paket.harga
                    let qty = dataTransaksi[i].detail_transaksi[j].qty

                    total += (harga * qty)
                }

                //tambahkan key "total"
                dataTransaksi[i].total = total
            }
            this.setState({ transaksi: dataTransaksi })
        })
        .catch(error => console.log(error))
}
    // getTransaksi = async () => {
    //     let url = "http://localhost:4040/api/transaksi"
    //     await axios.get(url, this.headerConfig())    
    //     .then(response => { 
    //         this.setState({transaksi: response.data.data})
    //         console.log(response)
    //     })
    //     .catch(error => {
    //             console.log(error);
    //     })
    //     console.log(this.state.transaksi)
    // }
    getUser = async () => {
        let url = "http://localhost:4040/api/user"
        await axios.get(url, this.headerConfig())    
        .then(response => { 
            this.setState({user: response.data.data})
            console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        console.log(this.state.user)
    }
    getMember = async () => {
        let url = "http://localhost:4040/api/member"
        await axios.get(url, this.headerConfig())    
        .then(response => { 
            this.setState({member: response.data.data})
            console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        console.log(this.state.member)
    }
    getPaket = async () => {
        let url = "http://localhost:4040/api/paket"
        await axios.get(url, this.headerConfig())    
        .then(response => { 
            this.setState({paket: response.data.data})
            console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        console.log(this.state.paket)
    }
    getOutlet = async () => {
        let url = "http://localhost:4040/api/outlet"
        await axios.get(url, this.headerConfig())    
        .then(response => { 
            this.setState({outlet: response.data.data})
            console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        console.log(this.state.outlet)
    }
    
    getUsers = () => {
        let admin = JSON.parse(localStorage.getItem('admin'))
        this.setState({id_user: admin.id_user})
    }
    componentDidMount = () => {
        this.getTransaksi()
        this.getMember()
        this.getUsers()
        this.getPaket()
        this.getUser()
        this.getOutlet()
    }
    handleAdd = () =>{
        this.setState({
            id_transaksi: 0,
            id_member: "",
            tgl: "",
            batas_waktu:"",
            tgl_bayar:"",
            status:"baru",
            dibayar:"",
            id_user: this.state.id_user,
            id_outlet:"",
            id_paket:"",
            qty:"",
            detail_transaksi:[],
            action: "insert",
            isModalOpen: true
        })
    }
    handleEdit = (item) =>{
        this.setState({
            id_transaksi: item.id_transaksi,
            id_member: item.id_member,
            tgl: item.tgl,
            batas_waktu: item.batas_waktu,
            tgl_bayar: item.tgl_bayar,
            status: item.status,
            dibayar: item.dibayar,
            id_user: item.id_user,
            id_outlet: item.id_outlet,
            action: "update",
            isModalOpen1: true
        })
    }
    handleSave = (event) =>{
        event.preventDefault();
        let url = "http://localhost:4040/api/transaksi"
        let detail = {
            id_paket: this.state.id_paket,
            qty: this.state.qty,
        }
  
        //ambil array detail_transaksi
        let temp = this.state.detail_transaksi
        temp.push(detail)
        this.setState({ detail_transaksi: temp })
        let form = {
                id_transaksi: this.state.id_transaksi,
                id_member: this.state.id_member,
                tgl: this.state.tgl,
                batas_waktu: this.state.batas_waktu,
                tgl_bayar: this.state.tgl_bayar,
                status: this.state.status,
                dibayar: this.state.dibayar,
                id_user: this.state.id_user,
                id_outlet: this.state.id_outlet,
                detail_transaksi: this.state.detail_transaksi
            }
        
        if(this.state.action === "insert"){
            axios.post(url, form,this.headerConfig())
            .then(response => { 
                window.alert("success")
                this.getTransaksi()
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
        }else if(this.state.action === "update"){
            axios.put(url, form,this.headerConfig())
            .then(response => {
                window.alert("UPDATE SUCCESS")
                this.getTransaksi()
                console.log(response)
            })
            .catch(error => {
                console.error();
            })
        } 
    }
    handleDelete = (id_transaksi) => {
        let url = "http://localhost:4040/api/transaksi/" + id_transaksi
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
          axios.delete(url,this.headerConfig())
          .then(response => {
            this.getTransaksi();
            console.log(response)
          })
          .catch(error => {
            console.log(error);
          })
        }
    }
    handleClose = () => {
        this.setState({
            isModalOpen: false,
            isModalOpen1:false
        })
    }
    render() {
        return (
            <div>
                
                <Container className="my-4">
                    <Card className="card">
                        <Card.Body className="card-body">
                            <h2 className="text-black text-center my-4">
                                List TRANSAKSI
                            </h2>
                            <br />
                            <ul className="list-group mx-3">
                            {this.state.transaksi.map(transaksi => (
                                
                                <li className="list-group-item">
                                    {transaksi.detail_transaksi.map(detail=>(
                                    <div className="row">
                                        <div className="col-lg-2 ">
                                            <small className="text-secondary">Member Name :</small>
                                            <h6>{transaksi.member.nama}</h6>
                                        </div>
                                        {/* <div className="col-lg-2">
                                            <small className="text-secondary"> :</small> <br />
                                            <h6>{this.convertTime(transaksi.tgl_bayar)}</h6>
                                        </div> */}
                                        {/* <div className="col-lg-2">
                                            <small className="text-secondary">batas waktu :</small> <br />
                                            <h6>{this.convertTime(transaksi.batas_waktu)}</h6>
                                        </div> */}
                                        
                                        <div className="col-lg-2">
                                            <small className="text-secondary">qty :</small> <br />
                                            <h6>{detail.qty}</h6>
                                        </div>
                                        
                                        <div className="col-lg-2">
                                            <small className="text-secondary">status :</small> <br />
                                            <h6>{transaksi.status}</h6>
                                        </div>
                                        <div className="col-lg-2">
                                            <small className="text-secondary">dibayar :</small> <br />
                                            <h6>{transaksi.dibayar}</h6>
                                        </div>
                                        <div className="col-lg-2">
                                            <small className="text-secondary">Total:Rp.</small> <br />
                                            <h6>{transaksi.total}</h6>
                                        </div>
                                        <div className="col-lg-2">
                                            <small className="text-secondary">Jenis:</small> <br />
                                            <h6>{detail.paket.jenis}</h6>
                                        </div>
                                        {/* <div className="col-lg-1">
                                            <Button className="btn btn-sm btn-success m-2" onClick={() => this.handleEdit(transaksi)}>
                                                <FiEdit2 style={{color: "white"}}/>
                                            </Button>
                                            <Button className="btn btn-sm btn-danger m-2" onClick={() => this.handleDelete(transaksi.id_transaksi)}>
                                                <RiDeleteBin2Fill style={{color: "white"}}/>
                                            </Button>
                                            <Button className="btn btn-sm btn-info m-2" >
                                                <FaPrint style={{color: "white"}}/>
                                            </Button>
                                        </div> */}
                                    </div>
                                    ))}
                                </li>
                                
                            ))}
                                <div className="">
                                <Button className="btn btn-warning shadow my-3 mx-3" onClick={() => this.handleAdd()}>
                                    Add transaksi
                                </Button>
                            </div>
                            </ul>
                        </Card.Body>
                    </Card>
                </Container>

            </div>
        );
    }
}
import React from "react";
import axios from "axios";

import { Modal, Button, Card, Container, Form } from "react-bootstrap";
 
import Navbar from "../component/Navbar";
import ComponentToPrint from "../component/ComponentToPrint";
import ReactToPrint from "react-to-print";

export default class LaporanAdmin extends React.Component {
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
            nama: "",
            action: "",
            isModalOpen: false
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/"
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization : `Bearer ${this.state.token}` }
        }
        return header
    }

    render() {
        return (
            <div>
                <Navbar/>
                <Container className="my-4">
                    <Card className="card">
                        <Card.Body className="card-body">
                            
                            <br />
                            <ReactToPrint
                                trigger={()=> {
                                return <button type="button">print pdf</button>}}
                                content={()=>this.componentRef}
                            />
                            <br/>
                            <ComponentToPrint ref={el => (this.componentRef = el)} />
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}
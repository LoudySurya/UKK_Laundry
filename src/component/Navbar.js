import React from "react";
// import { Link } from "react-router-dom";

export default class Navbar extends React.Component{
    Logout=()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        localStorage.removeItem("kasir")
        window.location="/Login"
    }
  render(){
    return (
    <container>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-lg">
            {/* Navbar brand */}
            <div class="navbar-brand" href="/">
                LOONDREE
            </div>
            {/* tombol dropdown responsive */}
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            {/* navbar items */}
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/transaction">Transaction</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/outlet">Outlet</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/paket">Paket</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/member">Member</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/user">User</a>
                    </li>
                    {/* <li class="nav-item">
                        <a class="nav-link" href="/laporan">Laporan</a>
                    </li> */}
                    <li class="nav-item">
                        <a class="nav-link" onClick={()=> this.Logout()}>Logout</a>
                    </li>
                </ul>
            </div>
        </div>
      </nav>
    </container>
    )
  }
}


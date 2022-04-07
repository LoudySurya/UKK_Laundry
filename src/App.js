import './App.css';
import React from "react"
//import react router dom
import {Route, Switch} from "react-router-dom"
//importp pages
import Home from "./pages/Home"
import Transaksi from './pages/Transaksi';
// import Administrator from './pages/Administrator';
import Login from './pages/Login';
import Register from './pages/Register';
import Member from'./pages/Member';
import User from'./pages/User';
import Outlet from './pages/Outlet';
import Paket from './pages/Paket';
import HomeKasir from'./pages/HomeKasir';
import HomeOwner from'./pages/HomeOwner';
import MemberKasir from'./pages/MemberKasir';
import TransaksiKasir from'./pages/TransaksiKasir';
import TransaksiOwner from'./pages/TransaksiOwner';
import Laporan from'./pages/Laporan';
import DetailTransaksi from './pages/DetailTransaksi';
import FormTransaksi from './pages/FormTransaksi';
import PaketKasir from './pages/PaketKasir';
class App extends React.Component{
  render(){
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/transaction" component={Transaksi} />
        <Route exact path="/outlet" component={Outlet} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/member" component={Member} />
        <Route exact path="/user" component={User} />
        <Route exact path="/paket" component={Paket} />
        <Route exact path="/homekasir" component={HomeKasir} />
        <Route exact path="/homeowner" component={HomeOwner} />
        <Route exact path="/memberkasir" component={MemberKasir} />
        <Route exact path="/transactionkasir" component={TransaksiKasir} />
        <Route exact path="/transactionowner" component={TransaksiOwner} />
        <Route exact path="/laporan" component={Laporan} />
        <Route exact path="/detail" component={DetailTransaksi} />
        <Route exact path="/tambahtransaksi" component={FormTransaksi} />
        <Route exact path="/paketkasir" component={PaketKasir} />
      </Switch>  
    );
  }
}

export default App;
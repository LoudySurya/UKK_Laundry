import React from 'react';
import Navbar from '../component/Navbar';


export default class Transaction extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <Navbar />
                <div class='container-lg'> 
                    <h1>Administrator</h1>
                </div>
            </div>
        )     
    }
}
import React, { Component } from 'react';
import "./facts.css"


function currentDate(){
    var today = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var date = today.getDate()+' '+months[today.getMonth()];
    return date
}

function Navbar(){

    



    return(
    <nav>        
        <div class="topnav">
            <a class="active" href="#home">{currentDate()}</a>
            <a href="#news">Notable events in history</a>            
        </div>
    </nav>
    );
}

export default Navbar;
import React, { Component } from 'react'; // this is destructuring, now I dont have to do extends React.Component



class Header extends Component {

    render(){
        return (
            <header className='header'>
                <div id='logo'>JobTracker</div>
                
            </header>
        );
    }
    

}

export default Header;
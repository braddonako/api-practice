import React, { Component } from 'react'; // this is destructuring, now I dont have to do extends React.Component



class Header extends Component {

    render(){
        return (
            <header>
                <div className='container'>
                    <div className='left'>
                      <div id='logo'>JobTracker</div>
                    </div>
                    <div className='right'>
                      <div className='top'>
                           top
                        </div>
                     <div className='bottom'>
                         Bottom
                    </div>
                </div>
                </div>
            </header>
        );
    }
    

}

export default Header;
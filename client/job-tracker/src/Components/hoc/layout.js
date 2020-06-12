import React, { Component } from 'react';
import Header from '../Header_Footer/header'
import Footer from '../Header_Footer/footer'

class Layout extends Component {
    render() {
        return (
            <div>
            <Header/>
            <div className='page_container'>
                {this.props.children}
            </div>
            <Footer/>
            </div>
        );
    }
}

export default Layout;
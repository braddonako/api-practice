import React, { Component } from 'react';

class Layout extends Component {
    render() {
        return (
            <div>
            HEADER
            <div className='page_container'>
                {this.props.children}
            </div>
            Footer
            </div>
        );
    }
}

export default Layout;
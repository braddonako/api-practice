import React from 'react';
import ReactDOM from 'react-dom';
import './Resources/CSS/styles.css';

import Header from './Components/Header_Footer/header'
import JobsList from './Components/jobsList/jobsList'


const App = () => {
  return(
    <div>
      <Header/>
      <JobsList/>
    </div>
  )
  
}


ReactDOM.render(<App/>, document.querySelector('#root'));

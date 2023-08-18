import React, { Component } from 'react'
import './NavbarCSS.css'
import Logo from '../Images/Logo.png'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  constructor(props){
    super(props)
    this.state = { 
        tab:0,
    }
  }
  handleTab=(index)=>{
    this.setState({
      tab:index
    })
  }
  render() {
    // const {tab} = this.state
    return (
      <div className='Navbar'>
        <div className='NavLogo'>
          <img src={Logo} alt='logo' width='120px'></img>
        </div>
        <div className='NavText'>
        <ul>
           <li className={this.state.tab ===0 ? 'active' :''} onClick={()=>this.handleTab(0)}><Link to='/'>Home</Link></li>
           <li><a href='#ActivitySection'>Activity</a></li>
          <li><a href='#AboutSection'>About</a></li>
          <li><a href='#Diagnose'>Diagnose</a></li>
          <li><a href='#ModelInfo'>Model Info</a></li>
        </ul>
        </div>
      </div>
    )
  }
}

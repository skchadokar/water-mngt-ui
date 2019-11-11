import React from "react";
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { Icon } from 'react-icons-kit';
import {home} from 'react-icons-kit/fa/home';
import {ic_fiber_new} from 'react-icons-kit/md/ic_fiber_new';
import {save} from 'react-icons-kit/fa/save';
import {play} from 'react-icons-kit/entypo/play'
import {logOut} from 'react-icons-kit/ionicons/logOut';
import {helpCircled} from 'react-icons-kit/ionicons/helpCircled';
import {ic_list} from 'react-icons-kit/md/ic_list'

const NavBar=(props) => {
  return (
      <div >
           
    <SideNav className="sideNav"
    onSelect={ (event)=>props.onChangedHandler(event)}>

    <SideNav.Nav defaultSelected="home">
        <NavItem >
            <NavIcon>
            <div style={{ color: '#610B0B' }}><Icon  icon={home} size={30} tooltip='Home'/></div>
            </NavIcon>
            <NavItem eventKey="1" >
                <NavText >
                <Icon  icon={play} size={10}/> <span className='menuSubOptions'> Home  </span>
                </NavText>
            </NavItem>

        </NavItem>

        <NavItem >
            <NavIcon>
            <div style={{ color: '#610B0B' }}><Icon  icon={ic_fiber_new} size={30}/></div>
            </NavIcon>

            <NavItem eventKey="2" >
                <NavText >
                <Icon  icon={play} size={10}/>  <span className='menuSubOptions'>Add Customer</span>
                </NavText>
            </NavItem>
        </NavItem>

        <NavItem >
            <NavIcon>
            <div style={{ color: '#610B0B' }}><Icon  icon={ic_list} size={30}/></div>
            </NavIcon>

            <NavItem eventKey="3" >
                <NavText >
                <Icon  icon={play} size={10}/>  <span className='menuSubOptions'>All Orders</span>
                </NavText>
            </NavItem>
        </NavItem>
        

        <NavItem >
            <NavIcon>
            <div style={{ color: '#610B0B' }}><Icon  icon={save} size={30}/></div>
            </NavIcon>
            <NavItem eventKey="5" >
                <NavText >
                <Icon  icon={play} size={10}/><span className='menuSubOptions'> Save</span>
                </NavText>
            </NavItem>
        </NavItem>

        <NavItem >
            <NavIcon>
            <div style={{ color: '#610B0B' }}><Icon  icon={logOut} size={30}/></div>
            </NavIcon>
            <NavItem eventKey="6" >
                <NavText >
                <Icon  icon={play} size={10}/> <span className='menuSubOptions'> Logout</span>
                </NavText>
            </NavItem>
        </NavItem>
        <NavItem >
            <NavIcon>
            <div style={{ color: '#610B0B' }}><Icon  icon={helpCircled} size={30}/></div>
            </NavIcon>
            <NavItem eventKey="7" >
                <NavText >
                <Icon  icon={play} size={10}/><span className='menuSubOptions'> Help</span>
                </NavText>
            </NavItem>
        </NavItem>
    </SideNav.Nav>
</SideNav>
</div>
  );
};
export default NavBar;

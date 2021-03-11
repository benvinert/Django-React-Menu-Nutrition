import React,{ useState } from 'react'
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { SideBarData } from './SideBarData';
import ClearIcon from '@material-ui/icons/Clear';
import '../App.css';
function NavBar(){
    const [SideBar,SetSideBar] = useState(false);
    const showSideBar = () => SetSideBar(!SideBar)
    return <>
        <nav>
            <div className="Links">
                <Link style={{color : "white"}}>
                    <MenuIcon style={{marginTop: '0.2rem',fontSize:"50px"}} fontSize='large' onClick={showSideBar}/>
                </Link>
            </div>
            </nav>
            <div className={SideBar ? 'sidebar active' : 'sidebar'}>
                <ul className="navbar-items">
                    <li className="navbarToggle" onClick={() => showSideBar()}><Link style={{color : "red"}}><ClearIcon style={{fontSize:'50px'}}/></Link></li>
                {SideBarData.map((item,index) => {
                    return <li key={index} className={item.cName}>
                        <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                         </li>
                    
                })}
                </ul>
            </div>
        
            </>
        


    


}


export default NavBar;
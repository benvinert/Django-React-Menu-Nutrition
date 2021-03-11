import React from 'react'
import AcUnitIcon from '@material-ui/icons/AcUnit';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import CreateIcon from '@material-ui/icons/Create';

export const SideBarData = [{
    title : "דף בית",
    path : "/",
    icon : <HomeIcon/>,
    cName : 'nav-text'
},{
    title : "עלינו",
    path : "/",
    icon : <InfoIcon/>,
    cName : 'nav-text'
},{
    title : "צור תפריט",
    path : "/",
    icon : <CreateIcon/>,
    cName : 'nav-text'
},]

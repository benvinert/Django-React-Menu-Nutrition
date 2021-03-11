import React,{ useContext,useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { MenuContext } from './MenuContext';
import { SummaryValuesOfFood } from './SummaryOfValues';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import { blue } from '@material-ui/core/colors';



const useRowStyles = makeStyles({
  root: {
    '&hover:hover': {
      // Set hover color
      backgroundColor: 'red !important',
    },
  }});


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [Select,SetSelect] = useState(true);

  const SumCalories = () => {
    let SumCalories = 0;
    props.Meal.map((each) => {
      SumCalories += parseFloat(each.ValuesOfFood[0])
    })
    if(SumCalories == ""){
      SumCalories = 0;
    }
    return SumCalories.toFixed(2);
  }

  const SumCarbs = () => {
    let SumCarbs = 0;
    props.Meal.map((each) => {
      SumCarbs += parseFloat(each.ValuesOfFood[3])
    })
    if(SumCarbs == ""){
      SumCarbs = 0;
    }
    return SumCarbs.toFixed(2);
  }

  const SumProtein = () => {
    let SumProtein = 0;
    props.Meal.map((each) => {
      SumProtein += parseFloat(each.ValuesOfFood[1])
    })
    if(SumProtein == ""){
      SumProtein = 0;
    }
    return SumProtein.toFixed(2);
  }

  const SumFat = () => {
    let SumFat = 0;
    props.Meal.map((each) => {
      SumFat += parseFloat(each.ValuesOfFood[2])
    })
    if(SumFat == ""){
      SumFat = 0;
    }
    return SumFat.toFixed(2);
  }

  const SumFiber = () => {
    let SumFiber = 0;
    props.Meal.map((each) => {
      SumFiber += parseFloat(each.ValuesOfFood[4])
    })
    if(SumFiber == ""){
      SumFiber = 0;
    }

    return SumFiber.toFixed(2);
  }

  

  
  
  return (
    <React.Fragment>
      <TableRow hover onClick={() => 
      {
        props.SetSel(props.NumbefOfMeal);
        props.ChanageStateToMeal(props.NumbefOfMeal);

      }} selected={props.indexSelect} className={classes} >
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.TimeEat}
        </TableCell>
        <TableCell component="th" scope="row">
        <IconButton>
           <AddCircleOutlineIcon style={{ fontSize: 30 }} color="primary"/>
        </IconButton>
        </TableCell>
        
        <TableCell classsName="Foc" align="right" >{SumCalories()}</TableCell>
        <TableCell align="right">{SumProtein()}</TableCell>
        <TableCell align="right">{SumCarbs()}</TableCell>
        <TableCell align="right">{SumFat()}</TableCell>
        <TableCell align="right">{SumFiber()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                מאכלים
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>שם מאכל</TableCell>
                    <TableCell>קלוריות</TableCell>
                    <TableCell align="right">חלבון</TableCell>
                    <TableCell align="right">פחמימות</TableCell>
                    <TableCell align="right">שומן</TableCell>
                    <TableCell align="right">סיבים תזונתיים</TableCell>
                    <TableCell align="right">גרם</TableCell>
                    <TableCell align="right">מחיקה</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                {row.foods.map((food,index) =>
                    {
                      if(food.Foodname) {
                        return <TableRow key={food.Foodname}>
                        <TableCell component="th" scope="row">
                          {food.Foodname ? food.Foodname : "דוגמה"}
                        </TableCell>
                        <TableCell>{food.ValuesOfFood[0]}</TableCell>
                        <TableCell align="right">{food.ValuesOfFood[1].toFixed(2)}</TableCell>
                        <TableCell align="right">{food.ValuesOfFood[3].toFixed(2)}</TableCell>
                        <TableCell align="right">{food.ValuesOfFood[2].toFixed(2)}</TableCell>
                        <TableCell align="right">{food.ValuesOfFood[4].toFixed(2)}</TableCell>
                        <TableCell align="right">{food.Grams}</TableCell>
                        <TableCell align="right"><IconButton><HighlightOffTwoToneIcon color="secondary" onClick={() => props.DeleteFood(props.NumbefOfMeal,index)}/></IconButton></TableCell>
                        
                      </TableRow>
                      }
                      return ""
                    })}
                    
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}




export default function TableMenu(props) {

  const ClientMenuContext = useContext(MenuContext);
  const [indexSelect,SetindexSelected] = useState({
    listCheck : [false,false,false,false,false]
  })
  const SummaryOfValuesContext = useContext(SummaryValuesOfFood);

  function SetSel(getRow)
  {
    /// Return new Array with Index True Of Select Row
    var NewSelect = [false,false,false,false,false];
      for(var i = 0 ; i < 5 ;i++)
      { 
        if(i == getRow)
        {
          NewSelect[i] = true;
        }
        else
        {
          NewSelect[i] = false;
        }
      }
      console.log(NewSelect);
      SetindexSelected((prev) => {
        return {listCheck : NewSelect}
      })
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>שעות אכילה</TableCell>
            <TableCell>הוספה</TableCell>
            <TableCell align="right">סה"כ קלוריות</TableCell>
            <TableCell align="right">סה"כ חלבונים&nbsp;(g)</TableCell>
            <TableCell align="right">סה"כ פחמימות&nbsp;(g)</TableCell>
            <TableCell align="right">סה"כ שומן&nbsp;(g)</TableCell>
            <TableCell align="right">סה"כ סיבים תזונתיים&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ClientMenuContext[0].Meals.map((row,index) => (
            <Row key={index} 
            Meal={ClientMenuContext[0].Meals[index].foods}
            DeleteFood={props.DeleteFood}
            SetSummaryOfMeal={ClientMenuContext[1]} 
            indexSelect={indexSelect.listCheck[index]} 
            SetSel={SetSel} row={row} NumbefOfMeal={index} 
            ChanageStateToMeal={props.ChanageStateToMeal} />
          ))}
        </TableBody>
      </Table>
      <h2>סה"כ קלוריות : {SummaryOfValuesContext[0].sumCalories.toFixed(2)}</h2>
      <h2>סה"כ פחמימות : {SummaryOfValuesContext[0].sumCarbs.toFixed(2)}</h2>
      <h2>סה"כ חלבון : {SummaryOfValuesContext[0].sumProtein.toFixed(2)}</h2>
      <h2>סה"כ שומן : {SummaryOfValuesContext[0].sumFat.toFixed(2)}</h2>
      <h2>סה"כ סיבית תזונתיים : {SummaryOfValuesContext[0].sumFiber.toFixed(2)}</h2>
    </TableContainer>

  );
}
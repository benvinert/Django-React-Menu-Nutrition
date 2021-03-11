import logo from './logo.svg';
import React ,{useState} from 'react'
import './App.css';
import { Switch,Route, BrowserRouter as Router } from 'react-router-dom';
import {Home,NavBar,Check} from './index';
import Grid from '@material-ui/core/Grid';
import { UserContext } from './Components/UserContext';
import { MenuContext } from './Components/MenuContext';
import { SummaryValuesOfFood } from './Components/SummaryOfValues';

function App() {
  const ValuesOfFood = {Calories : 0,Fat : 0, Protein : 0,Carbs : 0,Fiber : 0}

  const [Clientmenu,SetClientMenu] = useState({
    Meals : [
        {foods : [{ValuesOfFood : [0,0,0,0,0,0]}],sumCalc : 0,sumCarbs : 0,sumFat : 0,sumFiber : 0,sumProtein : 0,TimeEat : "בוקר"},
        {foods : [{ValuesOfFood : [0,0,0,0,0,0]}],sumCalc : 0,sumCarbs : 0,sumFat : 0,sumFiber : 0,sumProtein : 0,TimeEat : "ארוחת עשר"},
        {foods : [{ValuesOfFood : [0,0,0,0,0,0]}],sumCalc : 0,sumCarbs : 0,sumFat : 0,sumFiber : 0,sumProtein : 0,TimeEat : "צהריים"},
        {foods : [{ValuesOfFood : [0,0,0,0,0,0]}],sumCalc : 0,sumCarbs : 0,sumFat : 0,sumFiber : 0,sumProtein : 0,TimeEat : "ערב"},
        {foods : [{ValuesOfFood : [0,0,0,0,0,0]}],sumCalc : 0,sumCarbs : 0,sumFat : 0,sumFiber : 0,sumProtein : 0,TimeEat : "תרום שינה"}
      ],
})

  const [Food,SetFood] = useState({
    Foodname : "none",
    ValuesOfFood : []
  })

  const [SummaryOfValues,SetSummaryOfValues] = useState({
    sumCalories : 0,
    sumCarbs : 0,
    sumFat : 0,
    sumFiber : 0,
    sumProtein : 0
})

  

  return (
    <div>
      <UserContext.Provider value={[Food,SetFood]}>
        <MenuContext.Provider value={[Clientmenu,SetClientMenu]}>
          <SummaryValuesOfFood.Provider value={[SummaryOfValues,SetSummaryOfValues]}>
          <Router>
            <NavBar/>
              <Switch>
                <Grid> 
                  <Route path="/" component={Home} exact={true} />
                  <Route path="/Check" component={Check} exact={true} />
                </Grid>
              </Switch>
          </Router>
          </SummaryValuesOfFood.Provider>
        </MenuContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;

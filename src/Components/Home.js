import React,{useContext,useState} from 'react';
import Grid from '@material-ui/core/Grid';
import SearchInput from './SearchInput';
import TableMenu from './TableMenu';
import { UserContext } from './UserContext';
import { MenuContext } from './MenuContext';
import { SummaryValuesOfFood } from './SummaryOfValues';
import { Button } from '@material-ui/core';
import GramsPicker  from './GramsPicker';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Preview, print } from 'react-html2pdf';
import Check from './Check';


    function Home(){
    const ClientMenuContext = useContext(MenuContext); // in Cell 0 is Object ,in 2 Is Setter Function
    const foodContext = useContext(UserContext);// in Cell 0 is Object ,in 2 Is Setter Function
    const SummaryOfValues = useContext(SummaryValuesOfFood);// in Cell 0 is Object ,in 2 Is Setter Function

    const [ValuesOfFood,SetValuesFood] = useState(null)
    const [MealSelected,SetMealSelected] = useState(null)
    const [ShowValues,SetShowValues] = useState(false);


    function ChanageStateToMeal(NumbefOfMeal)
    {
        SetMealSelected(NumbefOfMeal)
        console.log("TimeEat",NumbefOfMeal)
    }


    //Calculate summary of all Menu
    function calculateSumFood(Operator,whichMeal,indexFood)
    {
        if(Operator == "Add")
        {
        SummaryOfValues[1]((prev) => {
            var NewSumCalories = SummaryOfValues[0].sumCalories + foodContext[0].ValuesOfFood[0];
            var NewSumCarbs = SummaryOfValues[0].sumCarbs + foodContext[0].ValuesOfFood[3];
            var NewSumProtein = SummaryOfValues[0].sumProtein + foodContext[0].ValuesOfFood[1];
            var NewSumFiber = SummaryOfValues[0].sumFiber + foodContext[0].ValuesOfFood[4];
            var NewSumFat = SummaryOfValues[0].sumFat + foodContext[0].ValuesOfFood[2];
            return {
                sumCalories : NewSumCalories,
                sumCarbs : NewSumCarbs,
                sumProtein : NewSumProtein,
                sumFiber : NewSumFiber,
                sumFat : NewSumFat,
                sumFiber : NewSumFiber

            }
        })
    }else
    {
        SummaryOfValues[1]((prev) => {
            var NewSumCalories = SummaryOfValues[0].sumCalories - ClientMenuContext[0].Meals[whichMeal].foods[indexFood].ValuesOfFood[0];
            var NewSumCarbs = SummaryOfValues[0].sumCarbs - ClientMenuContext[0].Meals[whichMeal].foods[indexFood].ValuesOfFood[3];
            var NewSumProtein = SummaryOfValues[0].sumProtein - ClientMenuContext[0].Meals[whichMeal].foods[indexFood].ValuesOfFood[1];
            var NewSumFiber = SummaryOfValues[0].sumFiber - ClientMenuContext[0].Meals[whichMeal].foods[indexFood].ValuesOfFood[4];
            var NewSumFat = SummaryOfValues[0].sumFat - ClientMenuContext[0].Meals[whichMeal].foods[indexFood].ValuesOfFood[2];
            return {
                sumCalories : NewSumCalories,
                sumCarbs : NewSumCarbs,
                sumProtein : NewSumProtein,
                sumFiber : NewSumFiber,
                sumFat : NewSumFat,
                sumFiber : NewSumFiber
            }
        })
    }
    
    }

    function AddFood(foodname)
    {
        if(foodContext[0].Foodname != 'none')
        {
            ClientMenuContext[1]((prev) => ({
                Meals : prev.Meals.map((eachmeal,index) => {
                    if(index == MealSelected){
                        console.log(foodContext[0])
                        calculateSumFood("Add");
                        return {...eachmeal,foods : [...eachmeal.foods,foodContext[0]]}
                        }
                        return {...eachmeal}
                    })}))
        }
    }


    function DeleteFood(WhichMeal,indexFood)
    {
        var newFoods;// New Array Of foods after filter
        console.log(WhichMeal,indexFood);  
        ClientMenuContext[1]((prev) => ({
        //My New Object     All This runs 5 Times(Each Meal) and return new meal
            Meals : prev.Meals.map((eachMeal,index) => {
                if(index == WhichMeal)
                {
                    newFoods = eachMeal.foods.filter((eachFood,indexF) => {
                        return indexFood != indexF;
                    })
                    calculateSumFood("Minus",WhichMeal,indexFood);
                    return {...eachMeal,foods : newFoods}
                }
                return {...eachMeal}
            })
        }))
        
    }

    //Calculate Values Of Picked Grams
    function CalculatePerGrams()
    {
        if(foodContext[0].Foodname != "none" && foodContext[0].Grams != 0 )
        {
            let PerGrams = foodContext[0].valuesPer100Gram.map((each) => {
                let PerGram = parseInt(each)/100 * parseInt(foodContext[0].Grams);
                return PerGram;
            })
            
            foodContext[1]((prev) => {
                return {...prev,ValuesOfFood : PerGrams}})
           SetShowValues(true);
        }
        console.log(foodContext[0])
    }

    //Display Values Of Food
    function ShowValuesToFalse(){
        SetShowValues(false);
    }
    
    // Get data from Server
    function GetRequest(food_id,food_name)
    {
        return fetch(`/Calculate/GetValuesOfFood/${food_id}`,
         {
             method : 'GET'    
        }).then((response) => response.json()).then((resp) => foodContext[1]((prev) => {console.log("AllValues : ",resp); return {...prev,Foodname : food_name,ValuesOfFood : resp,valuesPer100Gram : resp}}))
    }

    return <>
        <Grid container>
            <Grid item lg={2}>

            </Grid>
            <Grid className="form" item lg={8}>
                <h1 align='center'>צור תפריט</h1>
                <Grid container justify="center" alignItems="center">
                    <h4 align='center'>הקלד שני אותיות בישביל החיפוש</h4>
                </Grid>
                <Grid container spacing={1} justify="center">
                    <Grid item lg={6}>
                        <SearchInput 
                         ShowValues={ShowValues}
                         ShowValuesToFalse={() => ShowValuesToFalse()}
                         GetRequest={GetRequest} 
                         CalculatePerGrams={CalculatePerGrams} 
                         AddFood={AddFood}/>
                    </Grid>
                    <Grid >
                        <GramsPicker ShowValuesToFalse={ShowValuesToFalse}/>
                    </Grid>
                    <Grid item lg={12} align='right'>
                        {ShowValues ? <div style={{padding: '25px 25px 25px 25px'}}>
                        <h1>ערכים תזונתיים ל-{foodContext[0].Foodname}</h1>
                        <h1>קלוריות : {foodContext[0].ValuesOfFood[0].toFixed(2)}</h1>
                        <h1>חלבונים : {foodContext[0].ValuesOfFood[1].toFixed(2)}</h1>
                        <h1> שומן: {foodContext[0].ValuesOfFood[2].toFixed(2)}</h1>
                        <h1>פחמימות : {foodContext[0].ValuesOfFood[3].toFixed(2)}</h1>
                        <h1>סיבית תזונתיים : {foodContext[0].ValuesOfFood[4].toFixed(2)}</h1>
                        </div> : null}

                        
                    </Grid>
                    <Grid align='center' style={{marginTop : '40px'}} item lg={12}>
                        <TableMenu 
                        DeleteFood={DeleteFood}
                        MealsToSelect={MealSelected} 
                        SetMealToSelect={SetMealSelected}
                        ChanageStateToMeal={ChanageStateToMeal}
                        />
                        
                    </Grid>
                </Grid>
            </Grid>     
            <Grid  item lg={2}>
                    
            </Grid>     
        </Grid>
    </>

}

export default Home;


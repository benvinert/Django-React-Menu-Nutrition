import React,{useContext,useState,useEffect } from 'react'
import { Preview, print,A4Page } from 'react-html2pdf';
import TableMenu from './TableMenu';
import { MenuContext } from './MenuContext';
import { useHistory } from 'react-router';
import { SummaryValuesOfFood } from './SummaryOfValues';

function Check()
{
    const ClientMenuContext = useContext(MenuContext);
    const { push } = useHistory();
    const SummaryOfValuesContext = useContext(SummaryValuesOfFood);

    const Meals = () => {
        console.log("On Check:",ClientMenuContext[0])
        return ClientMenuContext[0].Meals.map((eachmeal) => {
            return <div><tr><th align='center' colSpan='7'><h3>{eachmeal.TimeEat}</h3></th></tr>
            <tr><th>סיבים תזונתיים</th><th>שומן</th><th>פחמימות</th><th>חלבונים</th><th>קלוריות</th><th>גרם</th><th>מאכלים</th></tr>
             {eachmeal.foods.map((eachFood) => {
                 if(eachFood.Grams != undefined)
                 {
                    return <tr>
                        <th>{eachFood.ValuesOfFood[4].toFixed(2)}</th>
                        <th>{eachFood.ValuesOfFood[2].toFixed(2)}</th>
                        <th>{eachFood.ValuesOfFood[3].toFixed(2)}</th>
                        <th>{eachFood.ValuesOfFood[1].toFixed(2)}</th>
                        <th>{eachFood.ValuesOfFood[0].toFixed(2)}</th>
                        <th>{eachFood.Grams}</th>
                        <th>{eachFood.Foodname}</th>
                        
                        </tr>
                 }
                 return  null
             })}
            </div>
            
        })
    }

    useEffect(() => {
        function ScreenSHot()
        {
            print('תפריט תזונה', 'jsx-template')
        }
        ScreenSHot();
    }, [])


    setTimeout(() => {
        push("/")
    },2000)

    return(
        <A4Page>
        <Preview className="Page" id={'jsx-template'} >
            <div align='center'>
                <table border='1' align='center'>
                    <Meals/>
                    <tr>
                        <th>
                    <table border='1' align='center'>
                <tr>
                    <td>
                        סה"כ קלוריות
                    </td>
                    <td>
                        סה"כ חלבונים
                    </td>
                    <td>
                        סה"כ פחמימות
                    </td>
                    <td>
                        סה"כ שומן
                    </td>
                    <td>
                        סה"כ סיבית תזונתיים
                    </td>
                </tr>
                <tr>
                    <td>{SummaryOfValuesContext[0].sumCalories.toFixed(2)}</td>
                    <td>{SummaryOfValuesContext[0].sumProtein.toFixed(2)}</td>
                    <td>{SummaryOfValuesContext[0].sumCarbs.toFixed(2)}</td>
                    <td>{SummaryOfValuesContext[0].sumFat.toFixed(2)}</td>
                    <td>{SummaryOfValuesContext[0].sumFiber.toFixed(2)}</td>
                </tr>
            </table>
            </th>
            </tr>
                </table>
            </div>
            
            
            
        
        
        </Preview>
        </A4Page>

    )
}

export default Check;
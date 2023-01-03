import { Types } from "mongoose";
import { Doughnut,Bar } from 'react-chartjs-2';
import Grid from "@mui/material/Grid"
import InputFoodlimit from "./InputFoodlimit"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,LinearScale,Title,BarElement);


interface AcountingData {
  name: string;
  cost: number;
  food: boolean;
  currentmoney: number;
  incomename: string;
  income: number;
  foodlimit: number;
  _id: string;
  user?: Types.ObjectId;
  Date?: Date;
}

interface FoodandLivingData {
  food: number;
  living: number;
  total: number;
}

interface Props {
  acountingdata: AcountingData[],
  selectmonth: number,
  foodlimits: number,
  setfoodlimit: any,
  onClick: any,
}

export default function DisplayAllCost(props: Props) {
  
  function displayfoodandlivingCost(): FoodandLivingData {
    let cost = { food: 0, living: 0, total: 0 };
    props.acountingdata.map((item: AcountingData) => {
      const ItemMonth: number = new Date(item.Date).getMonth() + 1;
      if (ItemMonth == props.selectmonth) {
        if (item.cost != undefined) {
          if (item.food) {
            cost.food += item.cost;
          } else {
            cost.living += item.cost;
          }
          cost.total += item.cost;
        }
      }
    });
    return cost;
  }
  const { food, living, total } = displayfoodandlivingCost();

  function displaycurrentmoney(): number {
    let money = 0;
    props.acountingdata.map((item: AcountingData) => {
      const ItemMonth: number = new Date(item.Date).getMonth() + 1;
      const PreviousMonth: number = new Date(item.Date).getMonth();
      if (ItemMonth == props.selectmonth) {
        if (item.income != undefined) {
          money += item.income;
        } else if (item.cost != undefined) {
          money -= item.cost;
        }
      }
    })
    return money;
  }
  
  function displayfoodlimit(): number {
    let limit = 0;
    props.acountingdata.map((item: AcountingData) => {
      const ItemMonth: number = new Date(item.Date).getMonth() + 1;
      if (ItemMonth == props.selectmonth) {
        if(item.foodlimit != undefined) {
          limit = item.foodlimit;
        }
      }
    })
    return limit;
  }

  const livingtotal = props.acountingdata.filter((item: Acountingdata) => !item.food).length;
  const foodtotal = props.acountingdata.filter((item: Acountingdata) => item.food).length;

  const Bardata = {
    labels:[`食費${food}円`],
    datasets:[
      {
        label:"円",
        data:[food,displayfoodlimit()],
        borderColor:"rgb(255, 99, 132)",
        backgroundColor:"rgba(255, 99, 132, 0.5)",
      }
    ]
  }

  const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    plugins: {
      legend: {
        display:false
      }
    },
    responsive: false,
  }
  
  const Doughnutdata = {
      labels: [`生活費${living}円`,`食費${food}円`,`残金${displaycurrentmoney()}円`],
      datasets: [
        {
          label: '',
          data: [living,food,displaycurrentmoney()],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(23,5,5,1)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(23,5,5,1)'
          ],
          borderWidth: 1,
        },
      ],
  };
  
  return (
    <div className="costwrapper">
      <Grid container>
        <Grid item>
          <h2 style={{fontSize:"40px"}}>所持金:{displaycurrentmoney()}円</h2>
          <Grid container>
            <Grid item>
              <h2 style={{fontSize:"33px",color:"#F10351"}}>食費残り{displayfoodlimit() - food}円</h2>
              <Bar data={Bardata} options={options} width={300} height={100} />
            </Grid>
            <Grid item style={{marginTop:"20px"}}>
              <InputFoodlimit
                foodlimit={props.foodlimits}
                setfoodlimit={props.setfoodlimit}
                onClick={props.onClick}
                displayfoodlimit={displayfoodlimit}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{marginLeft:"100px"}}>
          <Doughnut data={Doughnutdata} />
          <h1 style={{fontSize:"40px"}}>合計{total}円</h1>
        </Grid>
      </Grid>
    </div>
  )
}

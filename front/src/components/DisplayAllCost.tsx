import { Types } from "mongoose";

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
  selectmonth: number
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
        if (item.foodlimit != undefined) {
          limit = item.foodlimit;
        } else if (item.cost != undefined && item.food == true) {
          limit -= item.cost;
        }
      }
    })
    return limit;
  }
  
  return (
    <div className="costwrapper">
      <h2 style={{fontSize:"40px"}}>所持金:{displaycurrentmoney()}円</h2>
      <h2 style={{fontSize:"30px"}}>食費合計{food}円</h2>
      <h2 style={{fontSize:"33px",color:"#F10351"}}>食費残り{displayfoodlimit()}円</h2>
      <br></br>
      <h2 style={{fontSize:"30px"}}>生活費合計{living}円</h2>
      <br></br>
      <h2 style={{fontSize:"35px"}}>合計{total}円</h2>
      <br></br>
    </div>
  )
}

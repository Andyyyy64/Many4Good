import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './Home.css'
import { Types } from "mongoose";
import axios from "axios";
import requests from "../../utils/request";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

interface AcountingData {
  name: string;
  cost: number;
  food: boolean;
  currentmoney: number;
  income:number;
  isincome:boolean;
  user?: Types.ObjectId;
  Date?: Date;
}

interface FoodandLivingData {
  food: number;
  living: number;
  total: number;
}

export default function Home() {
  const { logout } = useAuth0();
  const [name, setName] = useState<string>();
  const [cost, setCost] = useState<number | string>();
  const [isfood, setisFood] = useState<boolean>();
  const [currentmoney,setcurrentmoney] = useState<number | string>();
  const [incomename,setincomname] = useState<string>();
  const [income,setincom] = useState<number | string>();
  const [acountingdata, Setacountingdata] = useState<any>([]);

  useEffect(() => {
    fetchAcountingData();
  }, []);

  const fetchAcountingData = async (): Promise<void> => {
    const data = await fetch(requests.fetchacounting);
    const acountingData: AcountingData = await data.json();
    Setacountingdata(acountingData);
    console.log(acountingData);
  };
  
  const addAcounting = (): void => {
    axios
      .post(requests.addacounting, {
        name: name,
        cost: cost,
        food: isfood,
        currentmoney: undefined,
        incomename: undefined,
        income: undefined,
      })
      .then(() => {
        Setacountingdata([
          ...acountingdata,
          {
            name: name,
            cost: cost,
            food: isfood,
            currentmoney: undefined,
            incomename: undefined,
            income: undefined,
          },
        ]);
      });
    location.href = "/";
  };

  const saveCurrentmoney = (): void => {
    axios.post(requests.savecurrentmoney,{
      name: undefined,
      cost: undefined,
      food: undefined,
      currentmoney: currentmoney,
      incomename: undefined,
      income: undefined,
    }).then(() => {
      Setacountingdata([
        ...acountingdata,
        {
          name: undefined,
          cost: undefined,
          food: undefined,
          currentmoney: currentmoney,
          incomename: undefined,
          income: undefined,
        },
      ]);
    });
    location.href = "/";
  };

  const addIncome = (): void => {
    axios.post(requests.addincome,{
      name: undefined,
      cost: undefined,
      food: undefined,
      currentmoney: undefined,
      incomename: incomename,
      income: income,
    }).then(() => {
      Setacountingdata([
        ...acountingdata,
        {
          name: undefined,
          cost: undefined,
          food: undefined,
          currentmoney: undefined,
          incomename: incomename,
          income: income,
        },
      ]);
    });
    location.href = "/";
  };
  

  const deleteAcounting = (id: string): void => {
    axios.delete(`http://localhost:4000/deleteacounting/${id}`);
    location.href = "/";
  };

  function foodandlivingCost(): FoodandLivingData {
    let cost = { food: 0, living: 0, total: 0 };
    acountingdata.map((items: AcountingData) => {
     if (items.cost != undefined) {
      if (items.food) {
        cost.food += items.cost;
      } else {
        cost.living += items.cost;
      }
       cost.total += items.cost;
     }
    });
    return cost;
  }
  const { food, living, total } = foodandlivingCost();

  function foodcostlimit(): number{
    let Foodlimit = 60000;
    acountingdata.map((item:any) => {
      if (item.food && item.cost != undefined) {
        Foodlimit -= item.cost
      }
    }) 
    return Foodlimit
  }

  function displaycurrentmoney():number {
    let money = 0;
    acountingdata.map((item: AcountingData) => {
      if(item.currentmoney != undefined) {
        money = item.currentmoney;
      } else if (item.cost != undefined) {
        money -= item.cost;
      } else if (item.income != undefined) {
        money += item.income;
      }
    })
    return money;
  }

  function checkinput(input): boolean {
    if (input.name != undefined && input.cost != undefined) {
      return true;
    } else{
      return false;
    }
  }
  
  const displayacountingData = acountingdata.map((item:any) => {
    if(checkinput(item)){
      return (
        <div className="itemwrapper">
          <i>
            {item.name}: {item.cost}円
            <Button
              variant="outlined"
              onClick={() => deleteAcounting(item._id)}
            >
              delete
            </Button>
          </i>
        </div>
      )
    } else if (item.income != undefined) {
      return (
        <div className="itemwrapper">
          <i>
           収入- {item.incomename}: {item.income}円
            <Button
              variant="outlined"
              onClick={() => deleteAcounting(item._id)}
            >
             delete 
            </Button>
          </i>
        </div>
      )
    }
  });


  return (
    <div className="homewrapper">
      <h2>所持金:{displaycurrentmoney()}円</h2>
      <TextField
        label="currentmoney"
        onChange={(e) => setcurrentmoney(e.target.value) }
      />
      <Button variant="outlined" onClick={saveCurrentmoney}>
        保存
      </Button><br/>
      <TextField
        label="incomename"
        onChange={(e) => {
          setincomname(e.target.value);
        }}
      />
      <TextField
        label="income"
        onChange={(e) => {
          setincom(e.target.value);
         }}
      />
      <Button variant="outlined" onClick={addIncome}>
        追加
      </Button><br/>
        <TextField
        label="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <TextField
        label="cost"
        onChange={(e) => {
          setCost(e.target.value);
        }}
      />
      <Checkbox
        sx={{ '& .MuiSvgIcon-root': { fontSize: 30} }}
        onChange={(e) => {
          setisFood(e.target.checked);
        }}
      />
      <Button variant="outlined" onClick={addAcounting} type="reset">
        add
      </Button>
      <br></br>

      {displayacountingData}
      
      <div className="costwrapper">
        <h2>食費合計{food}円</h2>
        <h2>食費残り{foodcostlimit()}円</h2>
      <br></br>
      <h2>生活費合計{living}円</h2>
      <br></br>
      <h2>合計{total}円</h2>
      <br></br>
      </div>
      <Button
      className="logout"
        variant="outlined"
        onClick={() => logout({ returnTo: "http://localhost:5173/login" })}
      >
        logout
      </Button>
    </div>
  );
}

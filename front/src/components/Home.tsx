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
  const [incomename,setincomname] = useState<string>();
  const [income,setincom] = useState<number | string>();
  const [foodlimit,setfoodlimit] = useState<number | String>();
  const [acountingdata, Setacountingdata] = useState<any>([]);

  useEffect(() => {
    fetchAcountingData();
  }, []);

  const fetchAcountingData = async (): Promise<void> => {
    const data = await axios.get(requests.fetchacounting);
    const acountingData: AcountingData = await data.data;
    Setacountingdata(acountingData as Array<any>)
    console.log(
        acountingData
    )
  }
  
  const addAcounting = async(): Promise<void> => {
    axios
      .post(requests.addacounting, {
        name: name,
        cost: cost,
        food: isfood,
      })
    fetchAcountingData();
  };
  

  const addIncome = async(): Promise<void> => {
    await axios.post(requests.addincome,{
      incomename: incomename,
      income: income,
    })
    fetchAcountingData();
  };

  const changeFoodlimit = async (): Promise<void> => {
    await axios.post(requests.changefoodlimit,{
      foodlimit: foodlimit,
    }).then(() => {
      Setacountingdata([
        ...acountingdata,
        {
          foodlimit: foodlimit,
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


  function displaycurrentmoney():number {
    let money = 0;
    acountingdata.map((item: AcountingData) => {
      if(item.income != undefined) {
        money += item.income;
      } else if (item.cost != undefined) {
        money -= item.cost;
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


  
  
  const displayacountingData = () => acountingdata.map((item:any,index:number) => {
    if(checkinput(item)){
      return (
        <div className="itemwrapper" key={index}>
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
      <Button variant="outlined" onClick={addAcounting}>
        add
      </Button>
      <br></br>
      <TextField
        label="setfoodlimit"
        onChange={(e) => {
          setfoodlimit(e.target.value);
        }}
      />
      <Button variant="outlined" onClick={changeFoodlimit}>changefoodlimit</Button>
      {displayacountingData()}
      
      <div className="costwrapper">
        <h2>食費合計{food}円</h2>
        <h2>食費残り円</h2>
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

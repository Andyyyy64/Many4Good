import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './Home.css'
import { Types } from "mongoose";
import axios from "axios";
import requests from "../../utils/request";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

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

export default function Home() {
  const { logout, user, isAuthenticated } = useAuth0<any>();
  const [open, setopen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [cost, setCost] = useState<number | string>('');
  const [isfood, setisFood] = useState<boolean>(false);
  const [incomename, setincomname] = useState<string>('');
  const [income, setincom] = useState<number | string>('');
  const [foodlimit, setfoodlimit] = useState<number | String>('');
  const [acountingdata, Setacountingdata] = useState<any>([]);
  const now: Date = new Date();
  const months: number = now.getMonth() + 1;
  const [selectmonth, setmonth] = useState<number>(months);

  useEffect(() => {
    fetchAcountingData();
  }, [isAuthenticated]);

  const fetchAcountingData = async (): Promise<void> => {
    const data = await axios.get(requests.fetchacounting, {
      params: {
        email: user?.email
      }
    });
    const acountingData: AcountingData[] = await data.data;
    Setacountingdata(acountingData);
    console.log(acountingData);
  }


  const addAcounting = async (): Promise<void> => {
    if (name != '' && cost != null) {
      await axios.post(requests.addacounting, {
        name: name,
        cost: cost,
        food: isfood,
        email: user?.email,
      })
      setName('');
      setCost('');
      setisFood(false);
      setopen(true);
      fetchAcountingData();
    } else {
      alert("please put acounting detail");
    }
  };


  const addIncome = async (): Promise<void> => {
    if (income != '' && incomename != null) {
      await axios.post(requests.addincome, {
        incomename: incomename,
        income: income,
        email: user?.email,
      })
      setincomname('');
      setincom('');
      setopen(true);
      fetchAcountingData();
    } else {
      alert("please put income detail");
    }
  };


  const changeFoodlimit = async (): Promise<void> => {
    if (foodlimit != '') {
      await axios.post(requests.changefoodlimit, {
        foodlimit: foodlimit,
        email: user?.email,
      })
      setfoodlimit('');
      setopen(true);
      fetchAcountingData();
      acountingdata.map((item: AcountingData) => {
        if (item.foodlimit != undefined) {
          if (now.toISOString() > item.Date) {
            deleteAcounting(item._id)
          } else {
            console.log(now.toISOString(), item.Date)
          }
        }
      })
    } else {
      alert("please put foodlimit");
    }
  };


  const deleteAcounting = async (id: string): Promise<void> => {
    await axios.delete(`http://localhost:4000/deleteacounting/${id}`);
    fetchAcountingData();
  };


  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    acountingdata.map((item: AcountingData) => {
      if (now.getSeconds() == new Date(item.Date).getSeconds()) {
        //deleteAcounting(item._id)
        console.log("ok")
      }
    })
    setopen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  function displayfoodandlivingCost(): FoodandLivingData {
    let cost = { food: 0, living: 0, total: 0 };
    acountingdata.map((item: AcountingData) => {
      const ItemMonth: number = new Date(item.Date).getMonth() + 1;
      if (ItemMonth == selectmonth) {
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
    acountingdata.map((item: AcountingData) => {
      const ItemMonth: number = new Date(item.Date).getMonth() + 1;
      if (ItemMonth == selectmonth) {
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
    acountingdata.map((item: AcountingData) => {
      const ItemMonth: number = new Date(item.Date).getMonth() + 1;
      if (ItemMonth == selectmonth) {
        if (item.foodlimit != undefined) {
          limit = item.foodlimit;
        } else if (item.cost != undefined && item.food == true) {
          limit -= item.cost;
        }
      }
    })
    return limit;
  }

  const Month = [
    { name: "1月", num: 1 },
    { name: "2月", num: 2 },
    { name: "3月", num: 3 },
    { name: "4月", num: 4 },
    { name: "5月", num: 5 },
    { name: "6月", num: 6 },
    { name: "7月", num: 7 },
    { name: "8月", num: 8 },
    { name: "9月", num: 9 },
    { name: "10月", num: 10 },
    { name: "11月", num: 11 },
    { name: "12月", num: 12 },
  ]

  const displayacountingData = () => acountingdata.map((item: AcountingData, index: number) => {
    const ItemMonth: number = new Date(item.Date).getMonth() + 1;
    if (ItemMonth == selectmonth) {
      if (item.name != undefined && item.cost != undefined) {
        return (
          <div className="itemwrapper" key={index}>
            <i style={item.food ? { color: "green" } : { color: "black" }}>
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
          <div className="itemwrapper" key={index}>
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
    }
  }).reverse();


  return (
    <div className="homewrapper">
      <Box sx={{ width: 500 }}>
        <BottomNavigation
          showLabels
          value={selectmonth}
          onChange={(_event, newValue) => {
            setmonth(newValue);
            setName('');
            setCost('');
            setincom('');
            setincomname('');
            setisFood(false);
            setfoodlimit('');
          }}
        >
          {
            Month.map((item, index: number) => {
              return (
                <BottomNavigationAction key={index} label={item.name} value={item.num} />
              )
            })
          }
        </BottomNavigation>
      </Box><br />
      <h2>所持金:{displaycurrentmoney()}円</h2>
      <TextField
        label="incomename"
        value={incomename}
        onChange={(e) => {
          setincomname(e.target.value);
        }}
      />
      <TextField
        label="income"
        value={income}
        onChange={(e) => {
          setincom(e.target.value);
        }}
      />
      <Button variant="outlined" onClick={addIncome}>
        追加
      </Button><br />
      <TextField
        label="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <TextField
        label="cost"
        value={cost}
        onChange={(e) => {
          setCost(e.target.value);
        }}
      />
      <Checkbox
        sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
        value={food}
        onChange={(e) => {
          setisFood(e.target.checked);
        }}
      />
      <Button variant="outlined" onClick={addAcounting}>
        add
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="successfully added acounting"
        action={action}
      /> <br></br>
      <TextField
        label="foodlimit"
        value={foodlimit}
        onChange={(e) => {
          setfoodlimit(e.target.value);
        }}
      />
      <Button variant="outlined" onClick={changeFoodlimit}>changefoodlimit</Button>


      {displayacountingData()}

      <div className="costwrapper">
        <h2>食費合計{food}円</h2>
        <h2>食費残り{displayfoodlimit()}円</h2>
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

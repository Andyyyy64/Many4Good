import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './App.css'
import { Types } from "mongoose";
import axios from "axios";
import requests from "../utils/request";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DisplayAcounting from "./components/DisplayAcounting.tsx"
import DisplayAllCost from "./components/DisplayAllCost.tsx"
import InputExpense from "./components/InputExpense.tsx"
import InputIncome from "./components/InputIncome.tsx"
import InputFoodlimit from "./components/InputFoodlimit.tsx"
import Grid from "@mui/material/Grid"
import Login from "./components/Login.tsx"

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
  const { logout, user, isAuthenticated, loginWithRedirect } = useAuth0();
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

  const Month = Array.from({ length: 12 }, (_, i) => i + 1).map(num => ({
    name: `${num}月`,
    num
  }));

  return (
    <div className="homewrapper">
      <Login />
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
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="successfully added acounting"
        action={action}
      /> <br/>
      
      <DisplayAllCost
        selectmonth={selectmonth}
        acountingdata={acountingdata}
      />
      
      <DisplayAcounting
        selectmonth={selectmonth}
        acountingdata={acountingdata}
        onClick={deleteAcounting}
      />
      
      <Grid container spacing={4}>
        <Grid item>
          <InputExpense
            name={name}
            cost={cost}
            isfood={isfood}
            setName={setName}
            setCost={setCost}
            setisFood={setisFood}
            onClick={addAcounting}
          />
        </Grid>
        <Grid item>
          <InputIncome
            incomename={incomename}
            income={income}
            setincomname={setincomname}
            setincom={setincom}
            onClick={addIncome}
          />
        </Grid>
      </Grid>

      <InputFoodlimit
        foodlimit={foodlimit}
        setfoodlimit={setfoodlimit}
        onClick={changeFoodlimit}
      />
      
    </div>
  );
}

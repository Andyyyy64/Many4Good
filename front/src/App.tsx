import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './App.css'
import { Types } from "mongoose";
import axios from "axios";
import requests from "../utils/request";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import Grid from "@mui/material/Grid"
import DisplayAcounting from "./components/DisplayAcounting"
import DisplayAllCost from "./components/DisplayAllCost"
import InputExpense from "./components/InputExpense"
import InputIncome from "./components/InputIncome"
import InputFoodlimit from "./components/InputFoodlimit"
import Login from "./components/Login"
import SelectDate from "./components/SelectDate"
import Profile from "./components/Profile"
import SelectUser from "./components/SelectUser"

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

interface UserData {
  connection: string,
  client_id: string,
  email: string,
  username: string,
  password: string,
  tenant: string,
  transaction?: Object,
  request_language: string,
}


export default function Home() {
  const {  user, isAuthenticated, isLoading } = useAuth0();
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
  const years: number = now.getFullYear()
  const [selectmonth, setmonth] = useState<number>(months);
  const [selectyear, setyear] = useState<number>(years);
  const [userdata,setuserdata] = useState<any>([]);
  const [user2name,setuser2name] = useState<string>("");
  const [inputopen,setinputopen] = useState<boolean>(false);
  const [selectuser,setuser] = useState<string>("All");
  
  useEffect(() => {
    fetchAcountingData();
    fetchLoginUser();
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

  const fetchLoginUser = async (): Promise<void> => {
    const data = await axios.get(requests.getloginuser, {
      params: {
        email: user?.email
      }
    });
    const userData: UserData[] = await data.data;
    setuserdata(userData);
    console.log(userData);
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
      setopen(true);
      fetchAcountingData();
    } else {
      alert("please put acounting detail");
    }
  };

  const addUser = async (): Promise<void> => {
    setinputopen(!inputopen);
    if (user2name != "") {
      await axios.post(requests.adduser, {
        user2name: user2name,
        email: user?.email,
      })
      setuser2name("");
    }
    fetchLoginUser();
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

  const deleteUser = async (id: string): Promise<void> => {
    await axios.delete(`http://localhost:4000/deleteuser/${id}`);
    fetchLoginUser();;
  }
  
  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
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

  return (
    <div className="homewrapper">
      <Profile
        isLoading={isLoading}
        userdata={userdata}
        user2name={user2name}
        setuser2name={setuser2name}
        addUser={addUser}
        inputopen={inputopen}
        setinputopen={setinputopen}
        onClick={deleteUser}
      />
      <Snackbar
        open={open}
        autoHideDuration={2500}
        message="successfully a1dded acounting"
        action={action}
      />
      
      <div className="costandselect">
        <Grid container spacing={27}>
          <Grid item>
            <DisplayAllCost
              selectmonth={selectmonth}
              selectyear={selectyear}
              acountingdata={acountingdata}
              foodlimits={foodlimit}
              setfoodlimit={setfoodlimit}
              onClick={changeFoodlimit}
            />
          </Grid>
          <Grid item>
            <SelectUser
              selectmonth={selectmonth}
              selectyear={selectyear}
              selectuser={selectuser}
              setuser={setuser}
              userdata={userdata}
              email={user?.email}
            />
            <SelectDate
              selectmonth={selectmonth}
              selectyear={selectyear}
              setName={setName}
              setCost={setCost}
              setincom={setincom}
              setincomname={setincomname}
              setisFood={setisFood}
              setfoodlimit={setfoodlimit}
              setmonth={setmonth}
              setyear={setyear}
            />
          </Grid>
        </Grid>
      </div>
      
      <DisplayAcounting
        selectmonth={selectmonth}
        selectyear={selectyear}
        acountingdata={acountingdata}
        onClick={deleteAcounting}
        addAcounting={addAcounting}
        addIncome={addIncome}
        name={name}
        cost={cost}
        isfood={isfood}
        setName={setName}
        setCost={setCost}
        setisFood={setisFood}
        incomename={incomename}
        income={income}
        setincomname={setincomname}
        setincom={setincom}
        isLoading={isLoading}
      />
      
      <Login />
      
    </div>
  );
}

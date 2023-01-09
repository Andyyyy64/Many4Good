import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import { Types } from "mongoose";
import axios from "axios";
import requests from "../utils/request";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import DisplayAcounting from "./components/DisplayAcounting";
import DisplayAllCost from "./components/DisplayAllCost";
import Login from "./components/Login";
import SelectDate from "./components/SelectDate";
import Profile from "./components/Profile";
import SelectUser from "./components/SelectUser";
import SelectDateDirectory from "./components/SelectDateDirectory"

interface AcountingData {
  name: string;
  cost: number;
  food: boolean;
  incomename: string;
  income: number;
  foodlimit: number;
  whichuser: string;
  _id: string;
  user?: Types.ObjectId;
  Date?: Date;
}

interface UserData {
  connection: string;
  client_id: string;
  email: string;
  username: string;
  password: string;
  tenant: string;
  transaction?: object;
  request_language: string;
  _id: Types.ObjectId;
}

export default function Home() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [open, setopen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<number | string>("");
  const [isfood, setisFood] = useState<boolean>(false);
  const [incomename, setincomname] = useState<string>("");
  const [income, setincom] = useState<number | string>("");
  const [foodlimit, setfoodlimit] = useState<number | string>("");
  const [acountingdata, Setacountingdata] = useState<Array<AcountingData>>([]);
  const now: Date = new Date();
  const months: number = now.getMonth() + 1;
  const years: number = now.getFullYear();
  const [selectmonth, setmonth] = useState<number>(months);
  const [selectyear, setyear] = useState<number>(years);
  const [userdata, setuserdata] = useState<Array<UserData>>([]);
  const [user2name, setuser2name] = useState<string>("");
  const [inputopen, setinputopen] = useState<boolean>(false);
  const [selectuser, setuser] = useState<string>("All");
  const [whichuser, setwhichuser] = useState<string>("");
  
  useEffect(() => {
    fetchAcountingData();
    fetchLoginUser();
  }, [isAuthenticated]);

  const fetchAcountingData = async (): Promise<void> => {
    const data = await axios.get(requests.fetchacounting, {
      params: {
        email: user?.email,
      },
    });
    const acountingData: AcountingData[] = await data.data;
    Setacountingdata(acountingData);
  };

  const fetchLoginUser = async (): Promise<void> => {
    const data = await axios.get(requests.getloginuser, {
      params: {
        email: user?.email,
      },
    });
    const userData: UserData[] = await data.data;
    setuserdata(userData);
  };

  const addAcounting = async (): Promise<void> => {
    if(isAuthenticated) {
      if (whichuser != "" && name != "" && cost != "") {
        await axios.post(requests.addacounting, {
          name: name,
          cost: cost,
          food: isfood,
          whichuser: whichuser,
          email: user?.email,
        });
        setName("");
        setCost("");
        setisFood(false);
        setwhichuser("");
        setopen(true);
        fetchAcountingData();
      } else {
        alert("please put acounting detail");
      }
    } else {
      alert("please login or sign up");
    }
  };

  const addUser = async (): Promise<void> => {
    setinputopen(!inputopen);
    if(isAuthenticated) {
      if (user2name != "") {
        await axios.post(requests.adduser, {
        user2name: user2name,
        email: user?.email,
      });
      setuser2name("");
      }
      fetchLoginUser();
    } else {
      alert("please login or sign up");
    }
  };

  const addIncome = async (): Promise<void> => {
    if(isAuthenticated) {
      if (whichuser != "" && income != "" && incomename != "") {
        await axios.post(requests.addincome, {
          incomename: incomename,
          income: income,
          whichuser: whichuser,
          email: user?.email,
        });
        setincomname("");
        setincom("");
        setwhichuser("");
        setopen(true);
        fetchAcountingData();
      } else {
        alert("please put income detail");
      }
    } else {
      alert("please login or sign up");
    }
  };

  const changeFoodlimit = async (): Promise<void> => {
    if(isAuthenticated) {
      if (foodlimit != "") {
        await axios.post(requests.changefoodlimit, {
          foodlimit: foodlimit,
          email: user?.email,
        });
        setfoodlimit("");
        setopen(true);
        fetchAcountingData();
        acountingdata.map((item: AcountingData) => {
          if (item.foodlimit != undefined) {
            if (new Date(now.toISOString()) > new Date(item.Date ?? "")) {
              deleteAcounting(item._id);
            }
          }
        });
      } else {
        alert("please put foodlimit");
      }
    } else {
      alert("please login or sign up");
    }
  };

  const deleteAcounting = async (id: string): Promise<void> => {
    if(isAuthenticated) {
      await axios.delete(`${requests.deleteacounting}/${id}`);
      fetchAcountingData();
    } else {
      alert("please login or sign up");
    }
  };

  const deleteUser = async (id: string): Promise<void> => {
    if(isAuthenticated) {
      await axios.delete(`${requests.deleteuser}/${id}`);
      fetchLoginUser();
    } else {
      alert("please login or sign up");
    }
  };

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    acountingdata.map((item: AcountingData) => {
      if (now.getSeconds() == new Date(item.Date ?? "").getSeconds()) {
        deleteAcounting(item._id);
      }
    });
    setopen(false);
  };

  const handleClose2 = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setopen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton size="small" aria-label="close" color="inherit">
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
        deleteUser={deleteUser}
      />
      <SelectDateDirectory
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
      <Snackbar
        open={open}
        autoHideDuration={2000}
        message="successfully a1dded acounting"
        onClose={handleClose2}
        action={action}
      />

      <div className="costandselect">
        <Grid container spacing={27}>
          <Grid item>
            <DisplayAllCost
              selectmonth={selectmonth}
              selectyear={selectyear}
              selectuser={selectuser}
              acountingdata={acountingdata}
              foodlimits={foodlimit}
              setfoodlimit={setfoodlimit}
              changeFoodlimit={changeFoodlimit}
            />
          </Grid>
          <Grid item>
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
            <SelectUser
              selectmonth={selectmonth}
              selectyear={selectyear}
              selectuser={selectuser}
              setuser={setuser}
              userdata={userdata}
              email={user?.email}
            />
          </Grid>
        </Grid>
      </div>

      <DisplayAcounting
        selectmonth={selectmonth}
        selectyear={selectyear}
        selectuser={selectuser}
        whichuser={whichuser}
        setwhichuser={setwhichuser}
        userdata={userdata}
        acountingdata={acountingdata}
        deleteAcounting={deleteAcounting}
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

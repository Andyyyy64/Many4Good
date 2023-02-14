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
import Box from "@mui/material/Box";
import DisplayAcounting from "./components/DisplayAcounting";
import DisplayAllCost from "./components/DisplayAllCost";
import Login from "./components/Login";
import SelectDate from "./components/SelectDate";
import Profile from "./components/Profile";
import SelectUser from "./components/SelectUser";
import SelectDateDirectory from "./components/SelectDateDirectory";
import AIadvice from "./components/AIadvice";

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
  const [prompt, setprompt] = useState<string>("");
  const [AIRes, setRes] = useState<string>("");

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
    if (userData.length == 1) {
      setwhichuser(userData[0].username);
    }
  };

  const askAI = async (): Promise<void> => {
    const res = await axios.post(requests.askAI, {
      prompt: prompt,
    });
    const AIres: any = await res.data.result;
    setRes(AIres.choices[0].text);
  };

  const addAcounting = async (): Promise<void> => {
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
    if (userdata.length != 1) {
      setwhichuser("");
    }
    setopen(true);
    fetchAcountingData();
  };

  const addUser = async (): Promise<void> => {
    setinputopen(!inputopen);
    if (user2name != "") {
      await axios.post(requests.adduser, {
        user2name: user2name,
        email: user?.email,
      });
      setuser2name("");
    }
    fetchLoginUser();
  };

  const addIncome = async (): Promise<void> => {
    await axios.post(requests.addincome, {
      incomename: incomename,
      income: income,
      whichuser: whichuser,
      email: user?.email,
    });
    setincomname("");
    if (userdata.length != 1) {
      setwhichuser("");
    }
    setincom("");
    setopen(true);
    fetchAcountingData();
  };

  const changeFoodlimit = async (): Promise<void> => {
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
  };

  const deleteAcounting = async (id: string): Promise<void> => {
    await axios.delete(`${requests.deleteacounting}/${id}`);
    fetchAcountingData();
  };

  const deleteUser = async (id: string): Promise<void> => {
    await axios.delete(`${requests.deleteuser}/${id}`);
    fetchLoginUser();
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
    <Box sx={{ textAlign: "center" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={2300}
        message="successfully added acounting"
        onClose={handleClose2}
        action={action}
      />
      <Profile
        isLoading={isLoading}
        userdata={userdata}
        user2name={user2name}
        setuser2name={setuser2name}
        addUser={addUser}
        inputopen={inputopen}
        setinputopen={setinputopen}
        deleteUser={deleteUser}
        isAuthenticated={isAuthenticated}
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
      <AIadvice
        isAuthenticated={isAuthenticated}
        AIRes={AIRes}
        askAI={askAI}
        setRes={setRes}
      />
      <Box>
        <Grid container>
          <Grid item sx={{ minWidth: "820px" }}>
            <DisplayAllCost
              selectmonth={selectmonth}
              selectyear={selectyear}
              selectuser={selectuser}
              acountingdata={acountingdata}
              foodlimits={foodlimit}
              setfoodlimit={setfoodlimit}
              changeFoodlimit={changeFoodlimit}
              isAuthenticated={isAuthenticated}
              setprompt={setprompt}
            />
          </Grid>
          <Grid item sx={{ minWidth: "400px" }}>
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
      </Box>
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
        isAuthenticated={isAuthenticated}
      />
      <Login />
    </Box>
  );
}

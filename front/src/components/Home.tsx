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

  useEffect(() => {
    fetchAcountingData();
  }, []);

  const [acountingdata, Setacountingdata] = useState<any>([]);

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
      })
      .then(() => {
        Setacountingdata([
          ...acountingdata,
          {
            name: name,
            cost: cost,
            food: isfood,
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
      if (items.food) {
        cost.food += items.cost;
      } else {
        cost.living += items.cost;
      }
      cost.total += items.cost;
    });
    return cost;
  }
  const { food, living, total } = foodandlivingCost();

  return (
    <div className="homewrapper">
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

      {acountingdata.map((item: any) => (
        <div className="itemwrapper">
          <i key={item.cost}>
            {item.name}: {item.cost}円
            <Button
              variant="outlined"
              onClick={() => deleteAcounting(item._id)}
            >
              delete
            </Button>
          </i>
        </div>
      ))}
      <div className="costwrapper">
      <h2>食費合計{food}円</h2>
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

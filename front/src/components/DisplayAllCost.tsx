import React, { useEffect } from "react";
import { Types } from "mongoose";
import { Doughnut, Bar } from "react-chartjs-2";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputFoodlimit from "./InputFoodlimit";
import { Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
  BarElement
);

interface Acounting {
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

interface FoodandLivingData {
  food: number;
  living: number;
  total: number;
}

interface Props {
  acountingdata: Acounting[];
  selectmonth: number;
  selectyear: number;
  selectuser: string;
  foodlimits: string | number;
  isAuthenticated: boolean;
  setfoodlimit: React.Dispatch<React.SetStateAction<string | number>>;
  setprompt: React.Dispatch<React.SetStateAction<string>>;
  changeFoodlimit: () => Promise<void>;
}

export default function DisplayAllCost(props: Props) {
  useEffect(() => {
    askAIaboutmoney();
  });

  function returnitemuser(item: Acounting): string {
    if (props.selectuser != "All") {
      return item.whichuser;
    } else {
      return "All";
    }
  }

  function displayfoodandlivingCost(): FoodandLivingData {
    const cost = { food: 0, living: 0, total: 0 };
    props.acountingdata.map((item: Acounting) => {
      const ItemMonth: number = new Date(item.Date ?? "").getMonth() + 1;
      const ItemYear: number = new Date(item.Date ?? "").getFullYear();
      if (
        ItemYear == props.selectyear &&
        ItemMonth == props.selectmonth &&
        props.selectuser == returnitemuser(item)
      ) {
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

  function displayselectmonthmoney(): number {
    let money = 0;
    props.acountingdata.map((item: Acounting) => {
      const ItemMonth: number = new Date(item.Date ?? "").getMonth() + 1;
      const ItemYear: number = new Date(item.Date ?? "").getFullYear();
      if (
        ItemYear == props.selectyear &&
        ItemMonth == props.selectmonth &&
        props.selectuser == returnitemuser(item)
      ) {
        if (item.income != undefined) {
          money += item.income;
        } else if (item.cost != undefined) {
          money -= item.cost;
        }
      }
    });
    return money;
  }

  function displaycurrentmoney(): number {
    let money = 0;
    props.acountingdata.map((item: Acounting) => {
      if (props.selectuser == returnitemuser(item)) {
        if (item.income != undefined) {
          money += item.income;
        } else if (item.cost != undefined) {
          money -= item.cost;
        }
      }
    });
    return money;
  }

  function displayfoodlimit(): number {
    let limit = 0;
    props.acountingdata.map((item: Acounting) => {
      const ItemMonth: number = new Date(item.Date ?? "").getMonth() + 1;
      const ItemYear: number = new Date(item.Date ?? "").getFullYear();
      if (ItemYear == props.selectyear && ItemMonth == props.selectmonth) {
        if (item.foodlimit != undefined) {
          limit = item.foodlimit;
        }
      }
    });
    return limit;
  }

  function askAIaboutmoney(): void {
    const prompts = `Please advise on the future based on the value(yen which is japanese money) of income and expenses I give.
foodlimit: ${displayfoodlimit()}yen, leftmoney: ${displaycurrentmoney()}yen, totalfood: ${food}yen,totallivingfee: ${living}yen. 
    `;
    props.setprompt(prompts);
  }

  const Bardata = {
    labels: [`食費:${food.toLocaleString()}円`],
    datasets: [
      {
        label: "円",
        data: [food, displayfoodlimit()],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    maintainAspectRatio: false,
    aspectRatio: 2,
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: false,
  };

  const Doughnutdata = {
    labels: [
      `生活費${living.toLocaleString()}円`,
      `食費${food.toLocaleString()}円`,
      `残高${displaycurrentmoney().toLocaleString()}円`,
    ],
    datasets: [
      {
        label: "",
        data: [living, food, displaycurrentmoney()],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(192,192,192,192)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(10,10,10,10)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box
      sx={{
        marginLeft: "45px",
        display: { xs: "inline", md: "block", lg: "flex" },
      }}
    >
      <Grid item sx={{ marginLeft: 10 }}>
        <Doughnut data={Doughnutdata} />
      </Grid>
      <Grid container>
        <Grid item>
          <Typography variant="h2" sx={{ fontSize: "40px" }}>
            残高:{displaycurrentmoney().toLocaleString()}円
          </Typography>
          <Typography variant="h6">
            (今月{displayselectmonthmoney().toLocaleString()}円)
          </Typography>
          <Grid container>
            <Grid item>
              <Typography
                variant="h2"
                sx={{ fontSize: "33px", color: "#F10351" }}
              >
                食費残り{(displayfoodlimit() - food).toLocaleString()}円
              </Typography>
              <Bar data={Bardata} options={options} />
            </Grid>
            <Grid item>
              <InputFoodlimit
                foodlimit={props.foodlimits}
                setfoodlimit={props.setfoodlimit}
                changeFoodlimit={props.changeFoodlimit}
                displayfoodlimit={displayfoodlimit}
                isAuthenticated={props.isAuthenticated}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

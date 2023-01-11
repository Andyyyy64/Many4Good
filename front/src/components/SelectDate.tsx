import React from "react"
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";

interface Props {
  selectmonth: number;
  selectyear: number;
  setmonth: React.Dispatch<React.SetStateAction<number>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setCost: React.Dispatch<React.SetStateAction<string | number>>;
  setincom: React.Dispatch<React.SetStateAction<string | number>>;
  setincomname: React.Dispatch<React.SetStateAction<string>>;
  setisFood: React.Dispatch<React.SetStateAction<boolean>>;
  setfoodlimit: React.Dispatch<React.SetStateAction<string | number>>;
  setyear: React.Dispatch<React.SetStateAction<number>>;
}

export default function selectDate(props: Props) {
  const Month = Array.from({ length: 12 }, (_, i) => i + 1).map((num) => ({
    name: `${num}月`,
    num,
  }));

  const Year = Array.from({ length: 3 }, (_, i) => i + 2022).map((num) => ({
    name: `${num}年`,
    num,
  }));

  function SelectMonth(props: Props) {
    return (
      <Box sx={{ minWidth: 100 }}>
        <FormControl>
          <InputLabel id="label">month</InputLabel>
          <Select
            labelId="label"
            id="select"
            value={props.selectmonth}
            label="month"
            onChange={(e) => {
              props.setmonth(e.target.value as number);
              props.setName("");
              props.setCost("");
              props.setincom("");
              props.setincomname("");
              props.setisFood(false);
              props.setfoodlimit("");
            }}
          >
            {Month.map((item, index: number) => {
              return (
                <MenuItem key={index} value={item.num}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    );
  }

  function SelectYear(props: Props) {
    return (
      <Box sx={{ minWidth: 100 }}>
        <FormControl>
          <InputLabel id="label">year</InputLabel>
          <Select
            labelId="label"
            id="select"
            value={props.selectyear}
            label="month"
            onChange={(e) => {
              props.setyear(e.target.value as number);
              props.setName("");
              props.setCost("");
              props.setincom("");
              props.setincomname("");
              props.setisFood(false);
              props.setfoodlimit("");
            }}
          >
            {Year.map((item, index: number) => {
              return (
                <MenuItem key={index} value={item.num}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    );
  }
  
  return (
    <Box sx={{ margin: "40px",display: "inline-block" }} alignItems="center" justify="center">
      <Grid container  >
        <Grid item>{SelectYear(props)}</Grid>
        <Grid item>{SelectMonth(props)}</Grid>
      </Grid>
    </Box>
  );
}

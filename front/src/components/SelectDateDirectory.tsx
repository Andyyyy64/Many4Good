import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import KeyboardArrowLeftTwoToneIcon from "@mui/icons-material/KeyboardArrowLeftTwoTone";
import KeyboardArrowRightTwoToneIcon from "@mui/icons-material/KeyboardArrowRightTwoTone";

interface Props {
  selectmonth: number;
  selectyear: number;
  setmonth: React.Dispatch<React.SetStateAction<number>>;
  setyear: React.Dispatch<React.SetStateAction<number>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setCost: React.Dispatch<React.SetStateAction<string | number>>;
  setincom: React.Dispatch<React.SetStateAction<string | number>>;
  setincomname: React.Dispatch<React.SetStateAction<string>>;
  setisFood: React.Dispatch<React.SetStateAction<boolean>>;
  setfoodlimit: React.Dispatch<React.SetStateAction<string | number>>;
}

export default function SelectDateDirectory(props: Props) {
  const Previousmonth = (): void => {
    if (props.selectmonth == 1) {
      props.setyear(props.selectyear - 1);
      props.setmonth(12);
    } else {
      props.setmonth(props.selectmonth - 1);
    }
    props.setName("");
    props.setCost("");
    props.setincom("");
    props.setincomname("");
    props.setisFood(false);
    props.setfoodlimit("");
  };

  const Nextmonth = (): void => {
    if (props.selectmonth == 12) {
      props.setyear(props.selectyear + 1);
      props.setmonth(1);
    } else {
      props.setmonth(props.selectmonth + 1);
    }
    props.setName("");
    props.setCost("");
    props.setincom("");
    props.setincomname("");
    props.setisFood(false);
    props.setfoodlimit("");
  };

  return (
    <Box sx={{ display: "inline-block" }}>
      <Grid container>
        <Grid item>
          <IconButton sx={{ marginTop: 2.2 }} onClick={() => Previousmonth()}>
            <KeyboardArrowLeftTwoToneIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item sx={{ fontSize: 25 }}>
          <h2>
            {props.selectyear}/{props.selectmonth}
          </h2>
        </Grid>
        <Grid item>
          <IconButton sx={{ marginTop: 2.2 }} onClick={() => Nextmonth()}>
            <KeyboardArrowRightTwoToneIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton"
import Grid from "@mui/material/Grid";
import KeyboardArrowLeftTwoToneIcon from '@mui/icons-material/KeyboardArrowLeftTwoTone';
import KeyboardArrowRightTwoToneIcon from '@mui/icons-material/KeyboardArrowRightTwoTone';

interface Props {
  selectmonth: number;
  selectyear: number;
  setmonth: Function;
  setyear: Function;
  setName: Function;
  setCost: Function;
  setincom: Function;
  setincomname: Function;
  setisFood: Function;
  setfoodlimit: Function;
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
  }

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
  }

  return (
    <Box sx={{ display: 'inline-block' }}>
      <Grid container>
        <Grid item>
          <IconButton sx={{ marginTop: 2.6 }} onClick={() => Previousmonth()}>
            <KeyboardArrowLeftTwoToneIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item sx={{ fontSize: 28, fontFamily: "cursiv" }}>
          <h2>{props.selectyear}/{props.selectmonth}</h2>
        </Grid>
        <Grid item>
          <IconButton sx={{ marginTop: 2.6 }} onClick={() => Nextmonth()}>
            <KeyboardArrowRightTwoToneIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  )
}

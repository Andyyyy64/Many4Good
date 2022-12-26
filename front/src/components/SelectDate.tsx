import { useState } from "react"
import Box from "@mui/material/Box"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  selectmonth: number,
  setmonth: any,
  setName: any,
  setCost: any,
  setincom: any,
  setincomname: any,
  setisFood: any,
  setfoodlimit: any,
}

export default function selectDate(props: Props) {
  
  const Month = Array.from({ length: 12 }, (_, i) => i + 1).map(num => ({
      name: `${num}月`,
      num
  }));

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl>
        <InputLabel id="label">month</InputLabel>
        <Select
          labelId="label"
          id="select"
          value={props.selectmonth}
          label="month"
          onChange={(_e, newValue) => {
            props.setmonth(newValue.props.value);
            props.setName('');
            props.setCost('');
            props.setincom('');
            props.setincomname('');
            props.setisFood(false);
            props.setfoodlimit('');
          } }
        >
          {
            Month.map((item,index:number) => {
              return (
                <MenuItem key={index} value={item.num}>{item.name}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
    </Box>
  )
}

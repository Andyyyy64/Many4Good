import { useState } from "react"
import Box from "@mui/material/Box"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from "@mui/material/Grid"
import FormHelperText from '@mui/material/FormHelperText';

interface UserData {
  connection?: string,
  client_id?: string,
  email: string,
  username: string,
  password?: string,
  tenant?: string,
  transaction?: Object,
  request_language?: string,
  _id: Types.ObjectId,
}

interface Props {
  userdata: UserData[],
  selectuser: string,
  setuser: any,
  selectmonth: number,
  selectyear: number,
  email: string,
}

export default function SelectUser(props: Props) {
  const selectuserArray = [ { username:"All", email:props.email }, ...props.userdata ];
  
  return (
    <Box sx={{ Width: 150 }}>
      <FormControl>
        <Select
          id="select"
          value={props.selectuser}
          onChange={(_e, newValue) => {
            props.setuser(newValue.props.value);
          }}
        >
          {
            selectuserArray.map((item: UserData, index: number) => (
                <MenuItem key={index} value={item.username}>{item.username}</MenuItem>
            )
            )
          }
        </Select>
        <FormHelperText>select user</FormHelperText>
      </FormControl>
    </Box>
  )
}

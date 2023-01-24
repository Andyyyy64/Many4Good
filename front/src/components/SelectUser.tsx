import React from "react";
import { Types } from "mongoose";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

interface UserData {
  connection?: string;
  client_id?: string;
  email: string | undefined;
  username: string;
  password?: string;
  tenant?: string;
  transaction?: object;
  request_language?: string;
  _id?: Types.ObjectId;
}

interface Props {
  userdata: UserData[];
  selectuser: string;
  setuser: React.Dispatch<React.SetStateAction<string>>;
  selectmonth: number;
  selectyear: number;
  email: string | undefined;
}

export default function SelectUser(props: Props) {
  const selectuserArray = [
    { username: "All", email: props.email },
    ...props.userdata,
  ];

  return (
    <Box sx={{ marginTop: 5 }}>
      <FormControl>
        <Select
          id="select"
          value={props.selectuser}
          onChange={(e) => {
            props.setuser(e.target.value);
          }}
        >
          {selectuserArray.map((item: UserData, index: number) => {
            return (
              <MenuItem key={index} value={item.username}>
                {item.username}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>select user</FormHelperText>
      </FormControl>
    </Box>
  );
}

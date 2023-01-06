import React from "react"
import { Types } from "mongoose";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface UserData {
  connection?: string;
  client_id?: string;
  email: string;
  username: string;
  password?: string;
  tenant?: string;
  transaction?: object;
  request_language?: string;
  _id: Types.ObjectId;
}

interface Props {
  userdata: UserData[];
  incomename: string;
  income: string | number;
  whichuser: string;
  addIncome: (e: Event) => void;
  setincomname: React.Dispatch<React.SetStateAction<string>>;
  setincom: React.Dispatch<React.SetStateAction<string | number>>;
  setwhichuser: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputIncome(props: Props) {
  return (
    <div className="inputincome">
      <FormControl style={{ marginLeft: "10px" }} sx={{ minWidth: 85 }}>
        <InputLabel>user</InputLabel>
        <Select
          labelId="label"
          id="id"
          value={props.whichuser}
          label="user"
          onChange={(e) => {
            props.setwhichuser(e.target.value);
          }}
        >
          {props.userdata.map((user: UserData, index: number) => (
            <MenuItem key={index} value={user.username}>
              {user.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        sx={{ width: 150 }}
        style={{ marginRight: "30px", marginLeft: "30px" }}
        label="incomename"
        value={props.incomename}
        onChange={(e) => {
          props.setincomname(e.target.value);
        }}
      />
      <TextField
        sx={{ width: 150 }}
        style={{ marginRight: "10px" }}
        label="income"
        value={props.income}
        onChange={(e) => {
          props.setincom(e.target.value);
        }}
      />
      <IconButton
        style={{ marginTop: "4px" }}
        onClick={() => props.addIncome()}
      >
        <AddCircleRoundedIcon />
      </IconButton>
    </div>
  );
}

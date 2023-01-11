import React from "react";
import { Types } from "mongoose";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Tooltip from "@mui/material/Tooltip";

interface Props {
  userdata: UserData[];
  name: string;
  cost: string | number;
  isfood: boolean;
  whichuser: string;
  isAuthenticated: boolean;
  addAcounting: () => void;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setCost: React.Dispatch<React.SetStateAction<string | number>>;
  setisFood: React.Dispatch<React.SetStateAction<boolean>>;
  setwhichuser: React.Dispatch<React.SetStateAction<string>>;
}

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

export default function InputExpense(props: Props) {
  return (
    <div>
      <FormControl sx={{ marginLeft: "10px", minWidth: 85 }}>
        <InputLabel>user</InputLabel>
        <Select
          disabled={!props.isAuthenticated}
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
        disabled={!props.isAuthenticated}
        sx={{ width: 150, marginRight: "30px", marginLeft: "30px" }}
        label="expense name"
        value={props.name}
        onChange={(e) => {
          props.setName(e.target.value);
        }}
      />
      <TextField
        disabled={!props.isAuthenticated}
        sx={{ marginRight: "10px", width: 150 }}
        label="expense cost"
        value={props.cost}
        onChange={(e) => {
          props.setCost(e.target.value);
        }}
      />
      <Tooltip title="isfood?">
        <Checkbox
          disabled={!props.isAuthenticated}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
          value={props.isfood}
          checked={props.isfood}
          onChange={(e) => {
            props.setisFood(e.target.checked);
          }}
        />
      </Tooltip>
      <Tooltip title="add expense">
        <IconButton
          onClick={() => props.addAcounting()}
          disabled={
            !props.isAuthenticated || props.name == "" || props.cost == ""
          }
        >
          <AddCircleRoundedIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}

import React from "react"
import { Types } from "mongoose";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

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
  isAuthenticated: boolean;
  addIncome: () => void;
  setincomname: React.Dispatch<React.SetStateAction<string>>;
  setincom: React.Dispatch<React.SetStateAction<string | number>>;
  setwhichuser: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputIncome(props: Props) {
  return (
    <div>
    <FormControl sx={{ marginLeft: "10px", minWidth: 85 }} >
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
    label="income name"
    value={props.incomename}
    onChange={(e) => {
      props.setincomname(e.target.value);
    }}
    />
    <TextField
    disabled={!props.isAuthenticated}
    sx={{ width: 150, marginRight: "10px" }}
    label="income cost"
    value={props.income}
    onChange={(e) => {
      props.setincom(e.target.value);
    }}
    />
    <Tooltip title="add income">
    <IconButton
    disabled={!props.isAuthenticated || props.incomename == "" || props.income == ""}
      sx={{ marginTop: "4px" }}
      onClick={() => props.addIncome()}
      >
      <AddCircleRoundedIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
    }

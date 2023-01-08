import React from "react"
import { Types } from "mongoose"
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

interface Props {
  userdata: UserData[];
  name: string;
  cost: string | number;
  isfood: boolean;
  whichuser: string;
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
    <div className="inputexpense">
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
        label="name"
        value={props.name}
        onChange={(e) => {
          props.setName(e.target.value);
        }}
      />
      <TextField
        style={{ marginRight: "10px" }}
        sx={{ width: 150 }}
        label="cost"
        value={props.cost}
        onChange={(e) => {
          props.setCost(e.target.value);
        }}
      />
      <Checkbox
        sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
        value={props.isfood}
        checked={props.isfood}
        onChange={(e) => {
          props.setisFood(e.target.checked);
        }}
      />
      <IconButton onClick={() => props.addAcounting()}>
        <AddCircleRoundedIcon />
      </IconButton>
    </div>
  );
}

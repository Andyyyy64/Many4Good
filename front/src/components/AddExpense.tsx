import React, { useState } from "react";
import { Types } from "mongoose";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { IconButton, TextField, Checkbox } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

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
  name: string;
  cost: string | number;
  isfood: boolean;
  whichuser: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setCost: React.Dispatch<React.SetStateAction<string | number>>;
  setisFood: React.Dispatch<React.SetStateAction<boolean>>;
  setwhichuser: React.Dispatch<React.SetStateAction<string>>;
  addAcounting: () => void;
  isAuthenticated: boolean;
}

interface State {
  bottom: boolean;
}

export default function AddExpense(props: Props) {
  const [open, setopen] = useState<State>({ bottom: false });

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setopen({ bottom: open });
    };

  const list = (_anchor: string) => (
    <Box role="presentation" sx={{ height: 250 }}>
      <Typography variant="h2" sx={{ textAlign: "center", marginTop: "10px" }}># add expense</Typography>
      <Box sx={{ display: "block", textAlign: "center", marginTop: "40px" }}>
        <FormControl sx={{ marginLeft: "10px", minWidth: 85 }}>
          <InputLabel>user</InputLabel>
          <Select
            sx={{ marginRight: "10px" }}
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
          sx={{ marginRight: "10px" }}
          label="expense name"
          value={props.name}
          onChange={(e) => {
            props.setName(e.target.value);
          }}
        />
        <TextField
          label="expense cost"
          value={props.cost}
          onChange={(e) => {
            props.setCost(e.target.value);
          }}
        />
        <Tooltip title="isfood?">
          <Checkbox
            sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
            value={props.isfood}
            onChange={(e) => {
              props.setisFood(e.target.checked);
            }}
          />
        </Tooltip>
        <Tooltip title="add expense">
          <IconButton
            onClick={() => props.addAcounting()}
            disabled={props.name == "" || props.cost == ""}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Tooltip title="add expense from modal">
          <IconButton
            onClick={toggleDrawer(true)}
            disabled={!props.isAuthenticated}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Drawer
          anchor="bottom"
          open={open["bottom"]}
          onClose={toggleDrawer(false)}
        >
          {list("bottom")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

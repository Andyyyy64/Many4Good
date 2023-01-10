import React, { useState } from "react";
import { Types } from "mongoose";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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
  addIncome: () => void;
  setincomname: React.Dispatch<React.SetStateAction<string>>;
  setincom: React.Dispatch<React.SetStateAction<string | number>>;
  setwhichuser: React.Dispatch<React.SetStateAction<string>>;
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
    <Box role="presentation" sx={{ height: 300 }}>
      <h1 style={{ textAlign: "center" }}># add income</h1>
      <Box sx={{ display: "block", textAlign: "center" }}>
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
          label="income name"
          value={props.incomename}
          onChange={(e) => {
            props.setincomname(e.target.value);
          }}
        />
        <TextField
          label="income cost"
          value={props.income}
          onChange={(e) => {
            props.setincom(e.target.value);
          }}
        />
        <Tooltip title="add income">
          <IconButton
            sx={{ marginTop: "4px" }}
            onClick={() => props.addIncome()}
            disabled={props.incomename == "" || props.income == ""}
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
        <Tooltip title="add income from modal">
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

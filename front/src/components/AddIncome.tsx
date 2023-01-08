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
}

interface State {
  bottom: boolean;
}

export default function AddExpense(props: Props) {
  const [open, setopen] = useState<State>({ bottom: false });

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setopen({ bottom: open });
    };

  const list = ( _anchor: string ) => (
    <Box role="presentation" sx={{ height: 300 }}>
      <h1 style={{ textAlign: "center" }}># Add Income</h1>
      <div style={{ marginLeft: "500px", marginTop: "60px" }}>
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
          style={{ marginRight: "10px" }}
          label="incomename"
          value={props.incomename}
          onChange={(e) => {
            props.setincomname(e.target.value);
          }}
        />
        <TextField
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
          <AddIcon />
        </IconButton>
      </div>
    </Box>
  );

  return (
    <div className="addtodo">
      {(["bottom"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(true)}>
            <AddIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={open[anchor]}
            onClose={toggleDrawer(false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

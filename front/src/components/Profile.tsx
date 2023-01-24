import React, { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { TextField } from "@mui/material";
import RemoveTwoToneIcon from "@mui/icons-material/RemoveTwoTone";
import CircularProgress from "@mui/material/CircularProgress";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import { Types } from "mongoose";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
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
  isLoading: boolean;
  user2name: string;
  setuser2name: React.Dispatch<React.SetStateAction<string>>;
  addUser: () => Promise<void>;
  inputopen: boolean;
  setinputopen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteUser: (id: string) => Promise<void>;
  isAuthenticated: boolean;
}

interface State {
  bottom: boolean;
}

export default function Profile(props: Props) {
  const [open, setopen] = useState<State>({ bottom: false });
  const { loginWithRedirect } = useAuth0();
  const user1 = props.userdata[0];

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      props.setinputopen(false);
      setopen({ bottom: open });
    };

  const list = (_anchor: string) =>
    !props.isAuthenticated ? (
      <CircularProgress />
    ) : (
      <Box role="presentation" sx={{ height: 1200 }}>
        <IconButton sx={{ ml: "95%" }} onClick={toggleDrawer(false)}>
          <RemoveTwoToneIcon />
        </IconButton>
        <Box sx={{ textAlign: "center" }}>
          {props.userdata.map((user: UserData, index: number) => (
            <Typography
              variant="h2"
              key={index}
              sx={index + 1 == 1 ? { color: "red" } : { color: "brack" }}
            >
              user{index + 1}: {user.username}
              <Tooltip title="delete user">
                <IconButton
                  sx={
                  index + 1 == 1
                  ? { visibility: "hidden" }
                  : { visibility: "visible", marginLeft: "10px" }
                  }
                  onClick={() => {
                    props.deleteUser(user._id.toString());
                  }}
                >
                  <DeleteIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </Typography>
          ))}
          <h1>email: {user1?.email}</h1>
          {props.inputopen ? (
            <TextField
              value={props.user2name}
              label="adduser"
              onChange={(e) => {
                props.setuser2name(e.target.value);
              }}
            />
          ) : (
            <div></div>
          )}
          <Tooltip title="add user">
            <IconButton onClick={() => props.addUser()}>
              <PersonAddIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    );

  return (
    <div>
      {props.isAuthenticated ? (
        <React.Fragment>
          <IconButton
            onClick={toggleDrawer(true)}
            disabled={!props.isAuthenticated}
          >
            <AccountCircleTwoToneIcon fontSize="large" />
          </IconButton>
          <Drawer
            anchor="bottom"
            open={open["bottom"]}
            onClose={toggleDrawer(false)}
          >
            {list("bottom")}
          </Drawer>
        </React.Fragment>
      ) : (
        <div/>
      )}
    </div>
  );
}

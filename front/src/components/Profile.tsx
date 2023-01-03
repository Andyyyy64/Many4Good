import React, { useState } from "react"
import { IconButton } from "@mui/material"
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { TextField } from "@mui/material";
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import CircularProgress from '@mui/material/CircularProgress';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import { Types } from "mongoose"

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
  isLoading: boolean,
  user2name: string,
  setuser2name: any,
  addUser: any,
  inputopen: boolean,
  setinputopen: any,
  onClick: any,
}

export default function Profile(props: Props) {
  const [open, setopen] = useState<any>({ bottom: false });
  const user1 = props.userdata[0];
  
  const toggleDrawer =
    (anchor: any, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        props.setinputopen(false);
        setopen({ open, [anchor]: open });
      };
  
  const list = (_anchor: any) => (
    props.isLoading ? (
      <CircularProgress />
    ) : (
      <Box
        role="presentation"
        sx={{ height: 1200 }}
      >
        <IconButton sx={{ ml: "95%" }} onClick={toggleDrawer('bottom', false)}>
          <RemoveTwoToneIcon />
        </IconButton>
        <div style={{textAlign:"center"}}>
          {
            props.userdata.map((user: UserData,index: number) => (
              <h1 key={index} style={index + 1 == 1 ? { color : "red"} : {color : "brack"} }>
                user{index + 1}: {user.username}
                <IconButton
                  style={index + 1 == 1 ? {visibility : "hidden"} : {visibility : "visible"} }
                  onClick={() => { props.onClick(user._id) }}
                >
                  <DeleteIcon />
                </IconButton>
              </h1>
            ))
          }
          <h1>email: {user1?.email}</h1>
          {
            props.inputopen ? (
              <TextField value={props.user2name} label="adduser" onChange={(e) => {
                props.setuser2name(e.target.value)
              } } />
            ) : (
              <div></div>
            )
          }
      <IconButton onClick={props.addUser}><PersonAddIcon /></IconButton>
        </div>
      </Box>
    )
  );

  return (
    <div className="addtodo">
      {(["bottom"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <AccountCircleTwoToneIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={open[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}



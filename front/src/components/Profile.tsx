import React, { useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { IconButton } from "@mui/material"
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { TextField, Checkbox } from "@mui/material";
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import CircularProgress from '@mui/material/CircularProgress';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface UserData {
  connection: string,
  client_id: string,
  email: string,
  username: string,
  password: string,
  tenant: string,
  transaction?: Object,
  request_language: string,
}

interface Props {
  userdata: UserData[],
}

export default function AddExpense(props: Props) {
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
  
  const list = (anchor: any) => (
    props.isLoding ? (
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
            props.userdata.map((user: userData,index: number) => (
              <div key={index}>
                <h1>{user.username}</h1>
                <h1>{user?.email}</h1>
              </div>
            ))
          }
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



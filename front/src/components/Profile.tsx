import React, { useState } from "react"
import { IconButton } from "@mui/material"
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { TextField, Checkbox } from "@mui/material";
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';

export default function AddExpense(props: Props) {
  const [open,setopen] = useState<any>({ bottom: false });

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
        setopen({ open, [anchor]: open });
      };
  
  const list = (anchor: any) => (
    <Box
      role="presentation"
      sx={{ height: 1200 }}
    >
      <IconButton onClick={toggleDrawer('bottom',false)}><RemoveTwoToneIcon /></IconButton>
    </Box>
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



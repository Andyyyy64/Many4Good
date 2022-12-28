import React,{ useState } from "react"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { IconButton, TextField, Checkbox } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"

interface Props {
  name: string,
  cost: number,
  isfood: boolean,
  onClick: any,
  setName: any,
  setCost: any,
  setisFood: any
  addAcounting: any,
}

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
      sx={{ height: 300 }}
    >
      <h1 style={{textAlign:"center"}}># Add Expense</h1>
      <div style={{marginLeft:"500px",marginTop:"60px"}}> 
        <TextField
          style={{marginRight:"10px"}}
          label="name"
          value={props.name}
          onChange={(e) => {
            props.setName(e.target.value);
          }}
        />
        <TextField
          label="cost"
          value={props.cost}
          onChange={(e) => {
            props.setCost(e.target.value);
          }}
        />
        <Checkbox
          sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
          value={props.isfood}
          onChange={(e) => {
            props.setisFood(e.target.checked);
          }}
        />
        <IconButton onClick={props.onClick}><AddIcon/></IconButton>
      </div>

    </Box>
  );

  return (
    <div className="addtodo">
      {(["bottom"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <AddIcon />
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

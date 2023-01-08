import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

interface Props {
  foodlimit: string | number;
  setfoodlimit: React.Dispatch<React.SetStateAction<string | number>>;
  changeFoodlimit: () => void;
  displayfoodlimit: () => number;
}

interface State {
  bottom: boolean 
}

export default function InputFoodlimit(props: Props) {
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
      <div
        className="inputfoodlimit"
        style={{ marginTop: "100px", marginLeft: "580px" }}
      >
        <h1 style={{ fontSize: "40px" }}>
          現在は{props.displayfoodlimit()}円です
        </h1>
        <TextField
          label="foodlimit"
          value={props.foodlimit}
          onChange={(e) => {
            props.setfoodlimit(e.target.value);
          }}
        />
        <Button
          sx={{ margin: "8px" }}
          variant="outlined"
          onClick={() => props.changeFoodlimit()}
        >
          chage
        </Button>
      </div>
    </Box>
  );

  return (
    <div className="addtodo">
      {(["bottom"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(true)}>
            <ChangeCircleIcon />
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

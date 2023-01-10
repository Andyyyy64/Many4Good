import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { IconButton, Typography } from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

interface Props {
  foodlimit: string | number;
  setfoodlimit: React.Dispatch<React.SetStateAction<string | number>>;
  changeFoodlimit: () => void;
  displayfoodlimit: () => number;
  isAuthenticated: boolean;
}

interface State {
  bottom: boolean;
}

export default function InputFoodlimit(props: Props) {
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
      <Box sx={{ display: "block", textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h1" sx={{ fontSize: "40px" }}>
          現在は{props.displayfoodlimit()}円です
        </Typography>
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
      </Box>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <IconButton
          onClick={toggleDrawer(true)}
          disabled={props.isAuthenticated}
        >
          <ChangeCircleIcon />
        </IconButton>
        <Drawer
          anchor={"bottom"}
          open={open["bottom"]}
          onClose={toggleDrawer(false)}
        >
          {list("bottom")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

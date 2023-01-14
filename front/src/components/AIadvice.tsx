import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  isAuthenticated: boolean;
  AIRes: string;
  setRes: React.Dispatch<React.SetStateAction<string>>;
  askAI: () => Promise<void>;
}

interface State {
  bottom: boolean;
}

export default function InputFoodlimit(props: Props) {
  const [open, setOpen] = useState<State>({ bottom: false });
  const [btnOpen, setBtn] = useState<boolean>(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      props.setRes("");
      setBtn(false);
      setOpen({ bottom: open });
    };

  const list = (_anchor: string) => (
    <Box
      role="presentation"
      sx={{
        height: 300,
        display: "block",
        textAlign: "center",
        bgcolor: "#fff",
        margin: "50px",
        marginBottom: "1%",
      }}
    >
      {btnOpen ? (
        <Box>
          {props.AIRes == "" ? (
            <CircularProgress sx={{ marginTop: "8%" }} />
          ) : (
            <Box>
              <Typography
                sx={{ fontSize: "35px", letterSpacing: "1px" }}
                variant="caption"
                color="#708090"
              >
                {props.AIRes}
              </Typography><br/>
              <Button variant="contained" color="success" sx={{ marginTop: "15px" }} onClick={() => {
                props.setRes("");
                props.askAI();
              }}>Regenerate</Button>
            </Box>
          )}
        </Box>
      ) : (
        <Button
          sx={{ marginTop: "8%" }}
          variant="contained"
          onClick={() => {
            props.askAI();
            setBtn(true);
          }}
        >
          Ask AI about current state
        </Button>
      )}
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Tooltip title="ask AI">
          <IconButton
            onClick={toggleDrawer(true)}
            disabled={!props.isAuthenticated}
          >
            <LiveHelpIcon />
          </IconButton>
        </Tooltip>
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

import * as React from "react"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

interface Props {
  foodlimit: number,
  setfoodlimit: any
  onClick: any
}

export default function InputFoodlimit(props: Props) {
  return (
    <div className="inputfoodlimit"> 
      <TextField
        label="foodlimit"
        value={props.foodlimit}
        onChange={(e) => {
          props.setfoodlimit(e.target.value);
        }}
      />
      <Button variant="outlined" onClick={props.onClick}>
        chage
      </Button>
    </div>
  )
}

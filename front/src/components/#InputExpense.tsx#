import * as React from "react"
import TextField from "@mui/material/TextField"
import Checkbox from "@mui/material/Checkbox"
import Button from "@mui/material/Button"

interface Props {
  name: string,
  cost: number,
  isfood: boolean,
  onClick: any,
  setName: any,
  setCost: any,
  setisFood: any
}

export default function InputExpense(props: Props) {
  return (
    <div className="inputexpense"> 
      <TextField
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
      <Button variant="outlined" onClick={props.onClick}>
        add
      </Button>
    </div>
  )
}

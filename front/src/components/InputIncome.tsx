import * as React from "react"
import TextField from "@mui/material/TextField"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

interface Props {
  incomename: string,
  income: number,
  onClick: any,
  setincomname: any,
  setincom: any,
}

export default function InputIncome(props: Props) {
  return (
    <div className="inputincome">
      <TextField
      style={{marginRight:"10px"}}
        label="incomename"
        value={props.incomename}
        onChange={(e) => {
          props.setincomname(e.target.value);
        }}
      />
      <TextField
        label="income"
        value={props.income}
        onChange={(e) => {
          props.setincom(e.target.value);
        }}
      />
      <IconButton onClick={props.onClick}><AddCircleRoundedIcon/></IconButton>
    </div>
  )
}

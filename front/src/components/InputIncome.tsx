import * as React from "react"
import TextField from "@mui/material/TextField"
import Checkbox from "@mui/material/Checkbox"
import Button from "@mui/material/Button"

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
      <Button variant="outlined" onClick={props.onClick}>
        追加
      </Button>
    </div>
  )
}

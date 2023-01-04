import TextField from "@mui/material/TextField"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Select from "@mui/material/Select"
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Box from "@mui/material/Box"

interface Props {
  name: string,
  cost: number,
  isfood: boolean,
  whichuser: string
  onClick: any,
  setName: any,
  setCost: any,
  setisFood: any
}

interface UserData {
  connection?: string,
  client_id?: string,
  email: string,
  username: string,
  password?: string,
  tenant?: string,
  transaction?: Object,
  request_language?: string,
  _id: Types.ObjectId,
}

export default function InputExpense(props: Props) {

  return (
    <div className="inputexpense">
      <FormControl style={{marginLeft:"10px"}} sx={{ minWidth: 85}}>
        <InputLabel>user</InputLabel>
        <Select
          labelId="label"
          id="id"
          value={props.whichuser}
          label="user"
          onChange={(_e, newValue) => {
            props.setwhichuser(newValue.props.value)
          }}
        >
          {
            props.userdata.map((user: UserData, index: number) => (
              <MenuItem key={index} value={user.username}>{user.username}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <TextField
        sx={{width: 150}}
        style={{ marginRight: "30px",marginLeft: "30px" }}
        label="name"
        value={props.name}
        onChange={(e) => {
          props.setName(e.target.value);
        }}
      />
      <TextField
      style={{marginRight: "10px"}}
        sx={{width: 150}}
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
      <IconButton onClick={props.onClick}><AddCircleRoundedIcon /></IconButton>
    </div>
  )
}

import { Types } from "mongoose";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

interface UserData {
  connection?: string;
  client_id?: string;
  email: string | undefined;
  username: string;
  password?: string;
  tenant?: string;
  transaction?: Object;
  request_language?: string;
  _id?: Types.ObjectId;
}

interface Props {
  userdata: UserData[];
  selectuser: string;
  setuser: Function;
  selectmonth: number;
  selectyear: number;
  email: string | undefined;
}

export default function SelectUser(props: Props) {
  const selectuserArray = [
    { username: "All", email: props.email },
    ...props.userdata,
  ];

  return (
    <Box sx={{ Width: 150 }} style={{ marginTop: "100px" }}>
      <FormControl>
        <Select
          id="select"
          value={props.selectuser}
          onChange={(e, _newValue) => {
            props.setuser(e.target.value);
          }}
        >
          {selectuserArray.map((item: UserData, index: number) => {
            return (
              <MenuItem key={index} value={item.username}>
                {item.username}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>select user</FormHelperText>
      </FormControl>
    </Box>
  );
}

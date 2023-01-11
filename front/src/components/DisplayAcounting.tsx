import React, { useEffect } from "react";
import { Types } from "mongoose";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddIncome from "./AddIncome";
import AddExpense from "./AddExpense";
import CircularProgress from "@mui/material/CircularProgress";
import InputExpense from "./InputExpense";
import InputIncome from "./InputIncome";

interface UserData {
  connection?: string;
  client_id?: string;
  email: string;
  username: string;
  password?: string;
  tenant?: string;
  transaction?: object;
  request_language?: string;
  _id: Types.ObjectId;
}

interface Acounting {
  name: string;
  cost: number;
  food: boolean;
  incomename: string;
  income: number;
  whichuser: string;
  foodlimit: number;
  _id: string;
  user?: Types.ObjectId;
  Date?: Date | undefined;
}

interface Props {
  acountingdata: Acounting[];
  userdata: UserData[];
  name: string;
  cost: string | number;
  isfood: boolean;
  incomename: string;
  income: string | number;
  selectmonth: number;
  selectyear: number;
  selectuser: string;
  whichuser: string;
  isAuthenticated: boolean;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setCost: React.Dispatch<React.SetStateAction<string | number>>;
  setisFood: React.Dispatch<React.SetStateAction<boolean>>;
  setincomname: React.Dispatch<React.SetStateAction<string>>;
  setincom: React.Dispatch<React.SetStateAction<string | number>>;
  setwhichuser: React.Dispatch<React.SetStateAction<string>>;
  deleteAcounting: (id: string) => Promise<void>;
  addAcounting: () => Promise<void>;
  addIncome: () => Promise<void>;
  isLoading: boolean;
}

function expenseData(
  name: string,
  cost: number,
  food: boolean,
  user: string,
  Date: Date | undefined,
  _id: string
) {
  return { name, cost, food, user, Date, _id };
}

function incomeData(
  incomename: string,
  income: number,
  user: string,
  Date: Date | undefined,
  _id: string
) {
  return { incomename, income, user, Date, _id };
}

export default function DisplayAcounting(props: Props) {
  useEffect(() => {
    props;
  }, [props]);

  function returnitemmonth(item: Acounting): number {
    const ItemMonth: number = new Date(item.Date ?? "").getMonth() + 1;
    return ItemMonth;
  }

  function returnitemyear(item: Acounting): number {
    const ItemYear: number = new Date(item.Date ?? "").getFullYear();
    return ItemYear;
  }

  function returnitemTime(item: Acounting): string {
    const ItemMonth: number = new Date(item.Date ?? "").getMonth() + 1;
    const ItemDate: number = new Date(item.Date ?? "").getDate();
    const ItemHours: number = new Date(item.Date ?? "").getHours();
    let ItemMinutes: string | number = new Date(item.Date ?? "").getMinutes();
    if (ItemMinutes < 10) {
      ItemMinutes = `0${ItemMinutes}`;
    }
    const ItemTime: string = `${ItemMonth}/${ItemDate} ${ItemHours}:${ItemMinutes}`;
    return ItemTime;
  }

  function returnitemuser(item: Acounting): string {
    if (props.selectuser != "All") {
      return item.whichuser;
    } else {
      return "All";
    }
  }

  const expenses = props.acountingdata.filter(
    (item: Acounting) =>
      item.name != undefined &&
      returnitemmonth(item) == props.selectmonth &&
      returnitemyear(item) == props.selectyear &&
      props.selectuser == returnitemuser(item)
  );

  const incomes = props.acountingdata.filter(
    (item: Acounting) =>
      item.income != undefined &&
      returnitemmonth(item) == props.selectmonth &&
      returnitemyear(item) == props.selectyear &&
      props.selectuser == returnitemuser(item)
  );

  const expensesrows = expenses.map((item: Acounting) =>
    expenseData(
      item.name,
      item.cost,
      item.food,
      item.whichuser,
      item.Date,
      item._id
    )
  );

  const incomesrows = incomes.map((item: Acounting) =>
    incomeData(
      item.incomename,
      item.income,
      item.whichuser,
      item.Date,
      item._id
    )
  );

  function displayselectmonthexpense(): number {
    let money = 0;
    props.acountingdata.map((item: Acounting) => {
      const ItemMonth: number = new Date(item.Date ?? "").getMonth() + 1;
      const ItemYear: number = new Date(item.Date ?? "").getFullYear();
      if (
        ItemYear == props.selectyear &&
        ItemMonth == props.selectmonth &&
        props.selectuser == returnitemuser(item)
      ) {
        if (item.cost != undefined) {
          money += item.cost;
        }
      }
    });
    return money;
  }

  function displayselectmonthincome(): number {
    let money = 0;
    props.acountingdata.map((item: Acounting) => {
      const ItemMonth: number = new Date(item.Date ?? "").getMonth() + 1;
      const ItemYear: number = new Date(item.Date ?? "").getFullYear();
      if (
        ItemYear == props.selectyear &&
        ItemMonth == props.selectmonth &&
        props.selectuser == returnitemuser(item)
      ) {
        if (item.income != undefined) {
          money += item.income;
        }
      }
    });
    return money;
  }

  function Displayexpense() {
    return (
      <TableContainer component={Paper}>
        <h2>￥支出 合計{displayselectmonthexpense().toLocaleString()}円</h2>
        <InputExpense
          name={props.name}
          cost={props.cost}
          isfood={props.isfood}
          setName={props.setName}
          setCost={props.setCost}
          setisFood={props.setisFood}
          whichuser={props.whichuser}
          setwhichuser={props.setwhichuser}
          userdata={props.userdata}
          addAcounting={props.addAcounting}
          isAuthenticated={props.isAuthenticated}
        />
        <Table sx={{ minWidth: 600}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">名前</TableCell>
              <TableCell align="justify">値段</TableCell>
              <TableCell align="right">種類</TableCell>
              <TableCell align="right">時間</TableCell>
              <TableCell align="right">消去</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expensesrows
              .map((row: any, index: number) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child td": { border: 0 } }}
                  style={row.food ? { color: "green" } : { color: "black" }}
                >
                  <TableCell align="left">
                    {row.user}: {row.name}
                  </TableCell>
                  <TableCell align="justify">
                    {row.cost.toLocaleString()}円
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={row.food ? { color: "green" } : { color: "black" }}
                  >
                    {row.food ? "食費" : "生活費"}
                  </TableCell>
                  <TableCell align="right">{returnitemTime(row)}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        props.deleteAcounting(row._id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
              .reverse()}
          </TableBody>
        </Table>
        <AddExpense
          name={props.name}
          cost={props.cost}
          isfood={props.isfood}
          setName={props.setName}
          setCost={props.setCost}
          setisFood={props.setisFood}
          whichuser={props.whichuser}
          userdata={props.userdata}
          setwhichuser={props.setwhichuser}
          addAcounting={props.addAcounting}
          isAuthenticated={props.isAuthenticated}
        />
      </TableContainer>
    );
  }

  function Displayincome() {
    return (
      <TableContainer component={Paper}>
        <h2>￥収入 合計{displayselectmonthincome().toLocaleString()}</h2>
        <InputIncome
          incomename={props.incomename}
          income={props.income}
          setincomname={props.setincomname}
          setipncom={props.setincom}
          whichuser={props.whichuser}
          setwhichuser={props.setwhichuser}
          userdata={props.userdata}
          addIncome={props.addIncome}
          isAuthenticated={props.isAuthenticated}
        />
        <Table sx={{ minWidth: 600}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">名前</TableCell>
              <TableCell align="justify">値段</TableCell>
              <TableCell align="right">時間</TableCell>
              <TableCell align="right">消去</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incomesrows
              .map((row: any, index: number) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child td": { border: 0 } }}
                >
                  <TableCell align="left">
                    {row.user}: {row.incomename}
                  </TableCell>
                  <TableCell align="justify">
                    {row.income.toLocaleString()}円
                  </TableCell>
                  <TableCell align="right">{returnitemTime(row)}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        props.deleteAcounting(row._id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
              .reverse()}
          </TableBody>
        </Table>
        <AddIncome
          incomename={props.incomename}
          income={props.income}
          whichuser={props.whichuser}
          setwhichuser={props.setwhichuser}
          userdata={props.userdata}
          setincomname={props.setincomname}
          setincom={props.setincom}
          addIncome={props.addIncome}
          isAuthenticated={props.isAuthenticated}
        />
      </TableContainer>
    );
  }

  return (
    <div>
      {props.isLoading ? (
        <CircularProgress color="success" />
      ) : (
        <Grid
          container
          spacing={3}
          sx={{ marginTop: "5px" }}
        >
          <Grid item>{Displayexpense()}</Grid>
          <Grid item>{Displayincome()}</Grid>
        </Grid>
      )}
    </div>
  );
}

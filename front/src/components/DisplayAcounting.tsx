import { useEffect } from "react";
import { Types } from "mongoose";
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";

interface AcountingData {
  name: string;
  cost: number;
  food: boolean;
  currentmoney: number;
  incomename: string;
  income: number;
  foodlimit: number;
  _id: string;
  user?: Types.ObjectId;
  Date?: Date;
}

interface Props {
  acountingdata: AcountingData[],
  selectmonth: number,
  onClick: any
}

function expenseData(
  name: string,
  cost: number,
  food: boolean,
  _id: string,
) {
  return { name, cost, food, _id };
}

function incomeData(
  incomename: string,
  income: number,
  _id: string,
) {
  return { incomename, income, _id };
}

export default function DisplayAcounting(props: Props) {

  useEffect(() => {
    props
  }, [props]);

  function returnitemmonth(item: AcountingData): number {
    const ItemMonth: number = new Date(item.Date).getMonth() + 1;
    return ItemMonth;
  }
  
  const expenses = props.acountingdata.filter((item: AcountingData) =>
    item.name != undefined && returnitemmonth(item) == props.selectmonth);
  
  const incomes = props.acountingdata.filter((item: AcountingData) =>
    item.income != undefined && returnitemmonth(item) == props.selectmonth);
  
  const expensesrows = expenses.map((item: AcountingData) =>
    expenseData(item.name,item.cost,item.food, item._id));

  const incomesrows = incomes.map((item: AcountingData) =>
    incomeData(item.incomename, item.income, item._id));

  function Displayexpense() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">名前</TableCell>
              <TableCell align="justify">値段</TableCell>
              <TableCell align="right">食費?</TableCell>
              <TableCell align="right">消去</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expensesrows.map((row: AcountingData,index: number) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child td': { border: 0 } }}
                style={row.food ? { color: "green" } : { color: "black" }}
              >
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="justify">{row.cost}円</TableCell>
                <TableCell align="right" style={row.food ? { color: "green" } : { color: "black" }}>
                  {row.food ? "食費" : "生活費"}
                </TableCell>
                <TableCell align="right"> <Button variant="outlined" onClick={() => {
                  props.onClick(row._id);
                }}>
                  delete
                </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  function Displayincome() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">名前</TableCell>
              <TableCell align="justify">値段</TableCell>
              <TableCell align="right">消去</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incomesrows.map((row: AcountingData,index: number) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child td': { border: 0 } }}
              >
                <TableCell align="left">{row.incomename}</TableCell>
                <TableCell align="justify">{row.income}円</TableCell>
                <TableCell align="right"> <Button variant="outlined" onClick={() => {
                  props.onClick(row._id);
                }}>
                  delete
                </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
  
  return (
    <Grid container spacing={10}>
      <Grid item>
        <h2>収出</h2>
        {Displayexpense()}
      </Grid>
      <Grid item>
        <h2>収入</h2>
        {Displayincome()}
      </Grid>
    </Grid>
  )
}

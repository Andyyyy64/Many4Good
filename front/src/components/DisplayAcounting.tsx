import { useEffect } from "react";
import { Types } from "mongoose";
import Button from "@mui/material/Button";

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

export default function DisplayAcounting(props: Props) {
  
  useEffect(() => {
    props
  }, [props]);


 const displayacountingdata = () => props.acountingdata.map((item: AcountingData, index: number) => {
    const ItemMonth: number = new Date(item.Date).getMonth() + 1;
    if (ItemMonth == props.selectmonth) {
      if (item.name != undefined && item.cost != undefined) {
        return (
          <div className="itemwrapper" key={index}>
            <i style={item.food ? { color: "green" } : { color: "black" }}>
              {item.name}: {item.cost}円
              <Button
                variant="outlined"
                onClick={() => {
                  props.onClick(item._id);
                } }
              >
                delete
              </Button>
            </i>
          </div>
        )
      } else if (item.income != undefined) {
        return (
          <div className="itemwrapper" key={index}>
            <i>
              収入- {item.incomename}: {item.income}円
              <Button
                variant="outlined"
                onClick={props.onClick}
              >
                delete
              </Button>
            </i>
          </div>
        )
      }
    }
  })
  return (
    displayacountingdata().reverse()
  ) 
}

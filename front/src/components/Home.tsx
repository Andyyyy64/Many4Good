import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Types } from "mongoose";
import axios from "axios";
import { redirect } from "react-router-dom";
import { Router } from "express";

interface AcountingData {
    name: string
    cost: number
    food: boolean | undefined
    user: Types.ObjectId
    Date: Date
}

export default function Home() {
    const { logout } = useAuth0()
    const [name, setName] = useState<string>()
    const [cost, setCost] = useState<number | string>()
    const [isfood, setisFood] = useState<boolean | string>()

    useEffect(() => {
        fetchAcountingData()
    }, [])

    const [acountingdata, Setacountingdata] = useState<any>([])

    const fetchAcountingData = async (): Promise<void> => {
        const data = await fetch('http://localhost:4000/acounting')
        const acountingdata: AcountingData = await data.json()
        Setacountingdata(acountingdata)
        console.log(acountingdata)
    }

    const addAcounting = (): void => {
        axios.post('http://localhost:4000/addacounting', {
            name: name,
            cost: cost,
            food: isfood,
        }).then((res) => {
            Setacountingdata([
                ...acountingdata, {
                    name: name,
                    cost: cost,
                    food: isfood
                }
            ])
        })
    }

    const deleteAcounting = (id: string): void => {
        axios.delete(`http://localhost:4000/deleteacounting/${id}`)
    }

    function TotalCost(): number {
        let totalcost = 0;
        acountingdata.map((items: any) => {
            totalcost += items.cost
        })
        return totalcost
    }

    return (
        <div>
            <input type="text" placeholder="name" onChange={(e) => {
                setName(e.target.value)
            }} />
            <input type="text" placeholder="cost" onChange={(e) => {
                setCost(e.target.value)
            }} />
            <input type="text" placeholder="isfood?" onChange={(e) => {
                setisFood(e.target.value)
            }} />
            <button onClick={addAcounting} type="reset">add</button>

            {
                acountingdata.map((item: any) => (
                    <div>
                        <i key={item.cost}>{item.name}:{item.cost}円<button onClick={() => deleteAcounting(item._id)}>delete</button></i>
                    </div>
                ))
            }
            <i>合計{TotalCost()}円</i>
            <button onClick={() => logout({ returnTo: "http://localhost:5173/login" })}>logout</button>
        </div>
    )
}
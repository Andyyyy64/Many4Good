import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Types } from "mongoose";
import axios from "axios";

interface AcountingData {
    name: string
    cost: number
    food: boolean | undefined
    user: Types.ObjectId
    Date: Date
}

export default function Home() {
    const [name, setName] = useState<string>()
    const [cost, setCost] = useState<number | string>()
    const [isfood, setisFood] = useState<boolean | string>()

    useEffect(() => {
        fetchAcountingData()
    }, [])

    const [acountingdata, Setacountingdata] = useState<any>([])

    const fetchAcountingData = async () => {
        const data = await fetch('http://localhost:4000/acounting')
        const acountingdata: AcountingData = await data.json()
        Setacountingdata(acountingdata)
        console.log(acountingdata)
    }

    const addAcounting = () => {
        axios.post('http://localhost:4000/addacounting', {
            name: name,
            cost: cost,
            food: isfood,
        }).then(() => {
            Setacountingdata([
                ...acountingdata, {
                    name: name,
                    cost: cost,
                    food: isfood
                }
            ])
        })
    }

    const deleteAcounting = (id:any) => {
        axios.delete(`http://localhost:4000/deleteacounting/${id}`)
    }


    const { logout } = useAuth0()

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
            <button onClick={addAcounting} type="submit">add</button>

            {
                acountingdata.map((item: any) => (
                    <div>
                        <i key={item.cost}>{item.name}:{item.cost}<button onClick={() => deleteAcounting(item._id)}>delete</button></i>
                    </div>
                ))
            }

            <button onClick={() => logout({ returnTo: "http://localhost:5173/login" })}>logout</button>
        </div>
    )
}
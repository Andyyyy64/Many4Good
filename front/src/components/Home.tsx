import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Types } from "mongoose";

interface AcountingData {
    name: string
    cost: number
    food: boolean | undefined
    user: Types.ObjectId
    Date: Date
}

export default function Home() {
    useEffect(() => {
        fetchAcountingData()
    }, [])

    const [acountingdata, Setacountingdata] = useState<any>([])

    const fetchAcountingData = async () => {
        const data = await fetch('/acounting')
        const acountingdata: AcountingData = await data.json()
        Setacountingdata(acountingdata)
        console.log(acountingdata)
    }

    const { logout } = useAuth0()

    return (
        <div>
            <form method="POST" action="/addacounting">
                <input type="text" placeholder="name" name="acountingnameinput" />
                <input type="text" placeholder="cost" name="acountingcostinput" />
                <input type='checkbox' placeholder="isfood" name="isfoodinput" />
                <input type="submit" value="send" />
            </form>
            {
                acountingdata.map((item: any) => (
                    <div>
                        <i key={item.cost}>{item.name}:{item.cost}
                            <form method="POST" action="/deleteacounting">
                                <input type="hidden" name="_method" value="delete" />
                                <input type="submit" value="消去" />
                            </form>
                        </i>
                    </div>
                ))
            }

            <button onClick={() => logout({ returnTo: "http://localhost:5173/login" })}>logout</button>
        </div>
    )
}
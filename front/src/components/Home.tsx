import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
    useEffect(() => {
        fetchAcountingData()
    }, [])

    const [acountingdata, Setacountingdata] = useState<any>([])

    const fetchAcountingData = async () => {
        const data = await fetch('/acounting')
        const acountingdata = await data.json()
        Setacountingdata(acountingdata)
        console.log(acountingdata)
    }

    const { logout } = useAuth0()

    return (
        <div>
            <form method="POST" action="/addacounting">
                <input type="text" name="acountingInput" />
                <input type="submit" value="send" />
            </form>
            {
                acountingdata.map((item:any) => (
                    <div>
                    <i key={item.acounting?.cost}>{item.acounting}</i>
                    </div>
                ))
            }

            <button onClick={() => logout({ returnTo: "http://localhost:5173/login" })}>logout</button>
        </div>
    )
}
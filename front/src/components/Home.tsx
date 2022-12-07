import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
    useEffect(() => {
        fetchAcountingData()
    }, [])

    const [acountingdata, setacountingdata] = useState<any>([])

    const fetchAcountingData = async () => {
        const data = await fetch('http://localhost:3000/acounting')
        const acountingdata = await data.json()
        setacountingdata(acountingdata)
    }

    const { logout } = useAuth0()

    return (
        <div>
            {
                acountingdata.map((item:any) => (
                    <div>
                        <p>{item.name}</p>
                        <p>{item.msg}</p>
                    </div>
                ))
            }
            <button onClick={() => logout({ returnTo: "http://localhost:5173/login" })}>logout</button>
        </div>
    )
}
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {

    const { logout } = useAuth0()

    return (
        <button onClick={() => logout({ returnTo: "http://localhost:5173/login" })}>logout</button>
    )
}
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {

    const { loginWithRedirect } = useAuth0()
    
    return (
        <button onClick={() => {
            loginWithRedirect()
        }}>login</button>
    )
}
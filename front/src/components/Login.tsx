import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button"

export default function Login() {
    const { isAuthenticated } = useAuth0();

  return (
    <div>
        {
         isAuthenticated ? (
              <Button
                className = "loginout"
                variant = "outlined"
                onClick = {() => logout({ returnTo: "http://localhost:5173/" })}
              >
                logout
              </Button >
        ) : (
          <Button
            className="loginout"
            variant="outlined"
            onClick={() => {
              loginWithRedirect()
            }}
          >
            Login
          </Button>
        )
        }
    </div>
  )
}

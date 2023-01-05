import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";

export default function Login() {
  const { logout, loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div style={{ marginTop: "100px" }}>
      {isAuthenticated ? (
        <Button
          className="loginout"
          variant="outlined"
          onClick={() => logout({ returnTo: "http://localhost:5173" })}
        >
          logout
        </Button>
      ) : (
        <Button
          className="loginout"
          variant="outlined"
          onClick={() => {
            loginWithRedirect();
          }}
        >
          Login
        </Button>
      )}
    </div>
  );
}

import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function Login() {
  const { logout, loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <Box sx={{ marginTop: "50px" }}>
      {isAuthenticated ? (
        <Button
          variant="outlined"
          onClick={() => logout({ returnTo: "http://localhost:5173" })}
        >
          logout
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            loginWithRedirect();
          }}
        >
          Login
        </Button>
      )}
    </Box>
  );
}

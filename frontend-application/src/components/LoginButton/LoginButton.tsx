import { Button } from "../";
import { useUser } from "../../context/UserContext";

export const LoginButton = () => {
  const { userId, setUserId } = useUser();
  const handleLogin = () => {
    const id = userId ? "" : prompt("Enter User ID");
    setUserId(id ?? "");
  };
  return (
    <Button onClick={handleLogin}>
      {userId ? `Logout ${userId}` : "Login"}
    </Button>
  );
};

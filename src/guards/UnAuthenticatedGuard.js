import { useAuth } from "../contexts/AuthContext";

export const UnAuthenticatedGuard = () => {
    const {currentUser} = useAuth();

  return (
    <div>UnAuthenticatedGuard</div>
  )
}

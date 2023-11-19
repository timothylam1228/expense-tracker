import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

const SignOut = (props: { setOpen?: (arg:boolean) => void }) => {
  const { setOpen } = props;
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    setOpen && setOpen(false);
    navigate("/");
  };
  return (
    <div className="w-fit cursor-pointer">
      <div onClick={handleSignOut}>Sign Out</div>
    </div>
  );
};
export default SignOut;

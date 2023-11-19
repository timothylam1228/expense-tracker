import { useAuth } from "../../providers/AuthProvider";

const SignOut = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    signOut();
  };
  return (
    <div className="w-fit cursor-pointer">
      <div onClick={handleSignOut}>Sign Out</div>
    </div>
  );
};
export default SignOut;

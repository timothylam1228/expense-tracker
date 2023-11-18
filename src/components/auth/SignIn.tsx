import { useAuth } from "../../providers/AuthProvider"

const Signin = () => {
  const { signIn } = useAuth()
  const handleSignIn = async () => {
    await signIn()
  }
  return (
    <div className="w-fit px-2 cursor-pointer">
      <div onClick={handleSignIn}>Sign In</div>
    </div>
  )
}
export default Signin

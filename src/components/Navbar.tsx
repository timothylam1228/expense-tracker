import { useState } from "react"
import { auth } from "../firebase/firebase.config"
import { useAuth } from "../providers/AuthProvider"
import SignOut from "./auth/SignOut"
import { useNavigate } from "react-router-dom"
import SignIn from "./auth/SignIn"

const Navbar = () => {
  const { loading } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  if (loading) {
    return <div>Loading...</div>
  }

  const handleSidebar = () => {
    setOpen(!open)
  }
  const navitems = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Profile",
      path: "/profile",
    },
  ]
  const SideBar = () => {
    return (
      <div className="flex relative flex-col items-center w-full py-12 ">
        <div className="absolute top-4 right-4" onClick={() => handleSidebar()}>
          X
        </div>

        {auth && auth.currentUser && (
          <div className="flex flex-col gap-4 items-center">
            {navitems.map((item) => (
              <div
                key={item.title}
                className="w-fit"
                onClick={() => {
                  setOpen(false)
                  navigate(item.path)
                }}
              >
                {item.title}
              </div>
            ))}
            <SignOut />
          </div>
        )}
      </div>
    )
  }
  return (
    <div className="flex justify-between  py-3 px-6 h-[50px]">
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute h-screen z-10 bg-white w-1/2 top-0 left-0 border-r-2`}
      >
        <SideBar />
      </div>
      <div className=" cursor-pointer" onClick={() => handleSidebar()}>
        三
      </div>
      <div>
        {auth && auth.currentUser ? (
          <>{auth.currentUser.displayName}</>
        ) : (
          <>
            <SignIn />
          </>
        )}
      </div>
    </div>
  )
}
export default Navbar
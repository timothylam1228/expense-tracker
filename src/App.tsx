import "./App.css";
import Navbar from "./components/Navbar";
import Message from "./components/Message";
import { Outlet } from "react-router-dom";

function App() {
  // fetchToken(setTokenFound);

  // onMessageListener()
  //   .then((payload) => {
  //     console.log('payload', payload)
  //     setNotification({
  //       title: payload.notification.title,
  //       body: payload.notification.body,
  //     });
  //     setShow(true);
  //     console.log(payload);
  //   })
  //   .catch((err) => console.log("failed: ", err));

  // const onShowNotificationClicked = () => {
  //   console.log("clicked");
  //   setNotification({
  //     title: "Notification",
  //     body: "This is a test notification",
  //   });
  //   setShow(true);
  // };
  return (
    <div className="px-2 flex flex-col">
      <Navbar />
      <Message />

      <Outlet />
    </div>
  );
}

export default App;

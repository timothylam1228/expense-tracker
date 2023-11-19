import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { Input, Button, Typography } from "@material-tailwind/react";

const Profile = () => {
  const { user, loading, updateUserProfile } = useAuth();
  const [displayName, setDisplayName] = useState<string | null>(
    user ? user.displayName : ""
  );
  const [email, setEmail] = useState<string | null>(user ? user.email : "");

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = () => {
    updateUserProfile({ displayName: displayName!, email: email! });
    // refresh the page
  };

  if (loading) {
    return <div>loading...</div>;
  }
  if (!user) {
    return <div>no user</div>;
  }
  return (
    <div className="items-center flex justify-center">
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Name
          </Typography>
          <Input
            size="lg"
            placeholder="Name"
            value={displayName!}
            autoComplete="false"
            onChange={(e) => setDisplayName(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={undefined}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            value={email!}
            placeholder="name@mail.com"
            autoComplete="false"
            disabled={true}
            onChange={(e) => setEmail(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={undefined}
          />
        </div>
        <Button className="mt-6" fullWidth onClick={() => handleSubmit()}>
          Save
        </Button>
      </form>
    </div>
  );
};

export default Profile;

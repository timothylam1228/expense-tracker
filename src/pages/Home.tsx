import { useState } from "react";
import CreateGroup from "../components/CreateGroup";
import CreateGroupButton from "../components/button/CreateGroupButton";
import { GroupType, useGroup } from "../providers/GroupProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { groups } = useGroup();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleGroupClick = (id: string) => {
    navigate(`/group/${id}`, { relative: "path", state: { id } });
  };



  return (
    <div className="mx-2 h-[calc(100vh-50px)] relative flex py-6">
      <CreateGroup isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="grid grid-cols-2 gap-4 w-full h-40">
        {groups.map((group: GroupType) => {
          return (
            <div
              className="border-2 py-12 text-center rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-all"
              onClick={() => handleGroupClick(group.id)}
              key={group.id}
            >
              <div className="font-extrabold text-2xl">{group.title}</div>
              <div>{group.creator}</div>
            </div>
          );
        })}
      </div>
      <div className=" absolute bottom-10 right-10">
        <CreateGroupButton setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};
export default Home;

import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
} from "@material-tailwind/react";
import {
  PlusIcon,
} from "@heroicons/react/24/outline";

type CreateGroupButtonProps = {
  setIsOpen: (callback: (pre: boolean) => boolean) => void;
};
const CreateGroupButton = (props: CreateGroupButtonProps) => {
  const { setIsOpen } = props;
  return (
    <div
      onClick={() => setIsOpen((pre: unknown) => !pre)}
      className="relative h-80 w-full"
    >
      <div className="absolute bottom-0 right-0">
        <SpeedDial>
          <SpeedDialHandler>
            <IconButton size="lg" className="rounded-full">
              <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
        </SpeedDial>
      </div>
    </div>
  );
};
export default CreateGroupButton;

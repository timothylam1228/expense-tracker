import { Input, Button } from "@material-tailwind/react";
import { useState } from "react";

const TagList = () => {
  const [tag, setTag] = useState("");
  const onChange = ({ target }) => setTag(target.value);
  return (
    <div>
      <div className="flex flex-col">
        <div className="relative flex w-full max-w-[24rem]">
          <Input
            type="tag"
            label="Tag"
            value={tag}
            onChange={onChange}
            className="pr-20"
            containerProps={{
              className: "min-w-0",
            }}
            crossOrigin={undefined}
          />
          <Button
            size="sm"
            color={tag ? "gray" : "blue-gray"}
            disabled={!tag}
            className="!absolute right-1 top-1 rounded"
          >
            Invite
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TagList;

import { Input, Button } from "@material-tailwind/react";
import { useState } from "react";
import { useGroup } from "../../providers/GroupProvider";
import { Chip } from "@material-tailwind/react";
import { ExpenseType } from "../../providers/ExpenseProvider";

type TagListType = {
  onChangeGroupTag: (e: string) => void;
  expenseData: ExpenseType;
};
const TagList = (props: TagListType) => {
  const { expenseData, onChangeGroupTag } = props;
  const { group, addTag } = useGroup();
  const [tag, setTag] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTag(e.target.value);

  const handleAddTag = async () => {
    await addTag(tag);
    setTag("");
  };

  return (
    // <div>
    <div className="flex flex-col w-full mt-4">
      <div className="relative flex w-full">
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
          onClick={handleAddTag}
        >
          Add
        </Button>
      </div>
      <div className="flex gap-2 mt-2">
        {group &&
          group.tags &&
          group.tags.length > 0 &&
          group.tags.map((tag: string) => {
            return (
              <div
                className="cursor-pointer"
                onClick={() => onChangeGroupTag(tag)}
                key={tag}
                id="tag"
              >
                <Chip
                  variant={`${
                    expenseData.tags.includes(tag) ? "gradient" : "ghost"
                  }`}
                  color={`${expenseData.tags.includes(tag) ? "blue" : "gray"}`}
                  value={tag}
                />
              </div>
            );
          })}
      </div>
    </div>
    // </div>
  );
};

export default TagList;

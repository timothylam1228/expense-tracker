import { Checkbox } from "@material-tailwind/react"
import { useGroup } from "../../providers/GroupProvider"
type WhoPaidProps = {
  whoPaid: string
  setWhoPaid: (whoPaid: string) => void
}
const WhoPaid = (props: WhoPaidProps) => {
  const { whoPaid, setWhoPaid } = props
  const { group, userMap} = useGroup()

  const handleWhoPaid = (member: string) => {
    setWhoPaid(member)
  }
  return (
    <div className="flex flex-col">
      <div className="flex w-max flex-col">
        {group &&
          group.members.map((member: string) => {
            return (
              <Checkbox
                key={member}
                color="blue"
                label={userMap.get(member)}
                ripple={true}
                crossOrigin={undefined}
                checked={whoPaid === member}
                onChange={() => handleWhoPaid(member)}
              />
            )
          })}
      </div>
    </div>
  )
}
export default WhoPaid

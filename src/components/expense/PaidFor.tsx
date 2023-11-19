import { Checkbox } from "@material-tailwind/react"
import { useGroup } from "../../providers/GroupProvider"

type PaidForProps = {
  paidFor: Array<string>
  setPaidFor: (whoPaid: Array<string>) => void
}

const PaidFor = (props: PaidForProps) => {
  const { paidFor, setPaidFor } = props
  const { group, userMap } = useGroup()

  const handlePaidFor = (member: string) => {
    if (paidFor.includes(member)) {
      const index = paidFor.indexOf(member)
      const newPaidFor = [...paidFor]
      newPaidFor.splice(index, 1)
      setPaidFor(newPaidFor)
    } else {
      setPaidFor([...paidFor, member])
    }
  }
  return (
    <div className="flex w-max flex-col">
      {group &&
        group.members.map((member: string) => {
          return (
            <Checkbox
              key={member}
              color="green"
              label={userMap.get(member)}
              ripple={true}
              crossOrigin={undefined}
              checked={paidFor.includes(member)}
              onChange={() => handlePaidFor(member)}
            />
          )
        })}
    </div>
  )
}
export default PaidFor

import type { User } from "../../types"
import SectionHeading from "../heading-section/heading-section"

export type UserCardProps = {
  user: User
  distance: number
}

export const UserCard = ({ user, distance }: UserCardProps) => {
  return (
    <div>
      <SectionHeading color="blue">{user.email}</SectionHeading>
      <h1>User</h1>
      <h3>distance {distance}</h3>
    </div>
  )
}

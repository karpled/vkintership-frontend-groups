import React from "react";

import type { User } from "../types/index.js";
import { SimpleCell } from "@vkontakte/vkui";

interface UserListProps extends React.ComponentPropsWithRef<"div"> {
  users: User[];
}

const UserList = ({ users, ...props }: UserListProps): React.ReactElement => {
  return (
    <div {...props}>
      {users.map((user) => (
        <SimpleCell key={user.first_name}>
          {user.first_name} {user.last_name}
        </SimpleCell>
      ))}
    </div>
  );
};

export default UserList;

import React from "react";
import { Cell, Group, Header, List } from "@vkontakte/vkui";

import type { User } from "../types/index.js";

interface UserListProps extends React.ComponentPropsWithRef<typeof Group> {
  users: User[];
}

const UserList = ({ users, ...props }: UserListProps): React.ReactElement => {
  return (
    <Group {...props}>
      <Header mode="secondary">Общие друзья</Header>
      <List>
        {users.map((user) => (
          <Cell key={user.first_name}>
            {user.first_name} {user.last_name}
          </Cell>
        ))}
      </List>
    </Group>
  );
};

export default UserList;

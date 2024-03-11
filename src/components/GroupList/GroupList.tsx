import { Group, Header } from "@vkontakte/vkui";

import type { GetGroupsResponse } from "../../types/index.js";
import { EmptyGroupsPlaceholder } from "../placeholders/index.js";
import { GroupItem } from "./GroupItem/index.js";

interface GroupListProps extends React.ComponentProps<typeof Group> {
  groups: GetGroupsResponse["data"];
}

const GroupList = ({
  groups,
  ...props
}: GroupListProps): React.ReactElement => {
  if (!groups || groups.length === 0) return <EmptyGroupsPlaceholder />;

  return (
    <Group
      header={<Header mode="secondary">Ваш список групп</Header>}
      {...props}
    >
      {groups.map((group) => (
        <GroupItem key={group.id} group={group} />
      ))}
    </Group>
  );
};

export default GroupList;

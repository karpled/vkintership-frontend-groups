import React, { useCallback, useMemo } from "react";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Avatar, IconButton, SimpleCell } from "@vkontakte/vkui";
import {
  Icon16Lock,
  Icon16LockOpen,
  Icon28Dismiss,
  Icon28Users,
} from "@vkontakte/icons";
import plural from "plural-ru";

import { Group } from "../../../types/index.js";

interface GroupItemProps extends React.ComponentProps<typeof SimpleCell> {
  group: Group;
}

const GroupItem = ({ group, ...props }: GroupItemProps): React.ReactElement => {
  const navigator = useRouteNavigator();

  const subtitle = useMemo(() => {
    const membersPlural = plural(
      group.members_count,
      "%d участник",
      "%d участника",
      "%d участников"
    );

    const friendsPlural = plural(
      group.friends?.length || 0,
      "%d общий друг",
      "%d общих друга",
      "%d общих друзей"
    );

    return membersPlural + ", " + friendsPlural;
  }, [group.members_count, group.friends]);

  const handleOpenFriendsList = useCallback(() => {
    navigator.push("/group-friends?groupId=" + group.id);
  }, [group.id, navigator]);

  const Icon = group.closed ? Icon16Lock : Icon16LockOpen;
  const friendsCount = group.friends?.length || 0;

  return (
    <SimpleCell
      subtitle={subtitle}
      badgeAfterTitle={<Icon width={12} />}
      after={
        friendsCount > 0 && (
          <IconButton
            aria-label="Список друзей"
            onClick={handleOpenFriendsList}
          >
            <Icon28Users />
          </IconButton>
        )
      }
      before={
        <Avatar
          gradientColor="custom"
          style={{ background: group.avatar_color }}
        >
          {!group.avatar_color && <Icon28Dismiss />}
        </Avatar>
      }
      {...props}
    >
      {group.name}
    </SimpleCell>
  );
};

export default GroupItem;

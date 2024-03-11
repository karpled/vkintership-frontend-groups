import { ModalPage, PanelSpinner } from "@vkontakte/vkui";
import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "@vkontakte/vk-mini-apps-router";

import { getGroups } from "../../api/services/Groups";
import { ErrorFetchGroupsPlaceholder } from "../placeholders";
import { UserList } from "..";

interface GroupFriendsProps
  extends Omit<React.ComponentProps<typeof ModalPage>, "children"> {}

const GroupFriends = ({ ...props }: GroupFriendsProps): React.ReactElement => {
  const [params] = useSearchParams();

  const {
    data: groups,
    isPending,
    isFetched,
    isError,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const { data } = await getGroups();
      return data;
    },
  });

  const currentGroup = useMemo(() => {
    const groupId = parseInt(params.get("groupId") ?? "");
    return groups?.data?.find((group) => group.id === groupId);
  }, [params, groups?.data]);

  const isSuccess = !isError && groups && groups.result !== 0 && currentGroup;

  return (
    <ModalPage {...props}>
      {isPending && <PanelSpinner size="large" />}
      {isFetched && !isSuccess && <ErrorFetchGroupsPlaceholder />}
      {isFetched && isSuccess && (
        <UserList users={currentGroup.friends || []} />
      )}
    </ModalPage>
  );
};

export default GroupFriends;

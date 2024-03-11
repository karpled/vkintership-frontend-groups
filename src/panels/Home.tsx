import React from "react";
import { Panel, PanelHeader, NavIdProps, PanelSpinner } from "@vkontakte/vkui";
import { useQuery } from "@tanstack/react-query";

import { ErrorFetchGroupsPlaceholder, GroupList } from "../components";
import { getGroups } from "../api/services/Groups";

export const Home = (props: NavIdProps): React.ReactElement => {
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

  const isSuccess = !isError && groups && groups.result !== 0;

  return (
    <Panel {...props}>
      <PanelHeader>Главная</PanelHeader>
      {isPending && <PanelSpinner size="large" />}
      {isFetched && isSuccess && <GroupList groups={groups.data} />}
      {isFetched && !isSuccess && <ErrorFetchGroupsPlaceholder />}
    </Panel>
  );
};

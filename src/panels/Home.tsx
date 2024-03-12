import React, { useState } from "react";
import { Panel, PanelHeader, NavIdProps, PanelSpinner } from "@vkontakte/vkui";
import { useQuery } from "@tanstack/react-query";

import { ErrorFetchGroupsPlaceholder, GroupList } from "../components";
import { getGroups } from "../api/services/Groups";
import { GroupsFilter } from "../types";
import Filters from "../components/Filters";
import { useFilteredGroups } from "../hooks";

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

  const [filter, setFilter] = useState<GroupsFilter>({});
  const filteredGroups = useFilteredGroups(groups?.data, filter);

  const isSuccess = !isError && groups && groups.result !== 0;

  return (
    <Panel {...props}>
      <PanelHeader>Главная</PanelHeader>
      {isPending && <PanelSpinner size="large" />}
      {isFetched && !isSuccess && <ErrorFetchGroupsPlaceholder />}
      {isFetched && isSuccess && (
        <>
          <Filters groups={groups.data} filter={filter} setFilter={setFilter} />
          <GroupList groups={filteredGroups} />
        </>
      )}
    </Panel>
  );
};

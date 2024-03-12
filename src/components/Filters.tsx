import {
  Button,
  Select,
  SubnavigationBar,
  SubnavigationButton,
} from "@vkontakte/vkui";
import React, { useCallback, useMemo } from "react";

import type { Group as GroupType, GroupsFilter } from "../types/index.js";

export interface FiltersProps
  extends React.ComponentPropsWithRef<typeof SubnavigationBar> {
  groups: GroupType[] | undefined;
  filter: GroupsFilter;
  setFilter: React.Dispatch<React.SetStateAction<GroupsFilter>>;
}

const Filters = ({
  groups,
  filter,
  setFilter,
  ...props
}: FiltersProps): React.ReactElement => {
  const handlePrivacyFilter = useCallback(
    (filterValue: GroupsFilter["privacy"]) => () => {
      setFilter((lastFilter) => ({
        ...lastFilter,
        privacy: filter.privacy === filterValue ? undefined : filterValue,
      }));
    },
    [filter.privacy, setFilter]
  );

  const handleFriendsFilter = useCallback(
    (filterValue: GroupsFilter["has_friends"]) => () => {
      setFilter((lastFilter) => ({
        ...lastFilter,
        has_friends:
          filter.has_friends === filterValue ? undefined : filterValue,
      }));
    },
    [filter.has_friends, setFilter]
  );

  const handleAvatarColorFilter = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.currentTarget.value;

      setFilter((lastFilter) => ({
        ...lastFilter,
        avatar_color: filter.avatar_color === value ? undefined : value,
      }));
    },
    [filter.avatar_color, setFilter]
  );

  const uniqueAvatarColors = useMemo(() => {
    if (!groups) {
      return [];
    }

    const colors = new Set<string>();

    for (const group of groups) {
      if (!group.avatar_color) {
        continue;
      }

      colors.add(group.avatar_color);
    }

    return Array.from(colors).map((color) => ({
      label: color,
      value: color,
    }));
  }, [groups]);

  return (
    <SubnavigationBar {...props}>
      <Select options={uniqueAvatarColors} onChange={handleAvatarColorFilter} />

      <SubnavigationButton
        selected={filter.privacy === true}
        onClick={handlePrivacyFilter(true)}
      >
        Закрытая
      </SubnavigationButton>
      <SubnavigationButton
        selected={filter.privacy === false}
        onClick={handlePrivacyFilter(false)}
      >
        Открытая
      </SubnavigationButton>
      <SubnavigationButton
        selected={filter.has_friends === true}
        onClick={handleFriendsFilter(true)}
      >
        С друзьями
      </SubnavigationButton>
      <SubnavigationButton
        selected={filter.has_friends === false}
        onClick={handleFriendsFilter(false)}
      >
        Без друзей
      </SubnavigationButton>
      <Button mode="outline" onClick={() => setFilter({})}>
        Сбросить фильтры
      </Button>
    </SubnavigationBar>
  );
};

export default Filters;

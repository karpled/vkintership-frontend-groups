import { useMemo } from "react";
import { Group, GroupsFilter } from "../types";

const useFilteredGroups = (
  groups: Group[] | undefined,
  filters: GroupsFilter
) => {
  return useMemo(() => {
    if (!groups) {
      return [];
    }

    return groups.filter((group) => {
      if (filters.privacy !== undefined) {
        if (group.closed !== filters.privacy) {
          return false;
        }
      }

      if (filters.has_friends !== undefined) {
        const friendsCount = group?.friends?.length || 0;

        if (filters.has_friends && friendsCount === 0) {
          return false;
        }

        if (!filters.has_friends && friendsCount !== 0) {
          return false;
        }
      }

      if (filters.avatar_color) {
        if (group.avatar_color !== filters.avatar_color) {
          return false;
        }
      }

      return true;
    });
  }, [filters, groups]);
};

export default useFilteredGroups;

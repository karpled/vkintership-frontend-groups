import { Group } from "./groups.js";

export default interface GroupsFilter {
  privacy?: Group["closed"];
  avatar_color?: Group["avatar_color"];
  has_friends?: boolean;
}

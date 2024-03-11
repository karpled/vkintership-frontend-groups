import MockAdapter from "axios-mock-adapter";

import type { GetGroupsResponse } from "../../types";
import axiosInstance from "../axiosInstance";

import groups from "../../mock/groups.json";

/**
 * @todo Remove this mock data and use the real API.
 */
const mock = new MockAdapter(axiosInstance, { delayResponse: 2000 });
mock.onGet("/groups").reply(200, {
  result: 1,
  data: groups,
} satisfies GetGroupsResponse);

/**
 * Retrieves the list of groups.
 * @param [controller] - An optional AbortController instance to cancel the request.
 * @returns A promise that resolves to the response data.
 */
export const getGroups = async (controller?: AbortController) => {
  return await axiosInstance.get<GetGroupsResponse>("/groups", {
    signal: controller?.signal,
  });
};

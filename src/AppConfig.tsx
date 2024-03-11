import vkBridge, {
  parseURLSearchParamsForGetLaunchParams,
} from "@vkontakte/vk-bridge";
import {
  useAdaptivity,
  useAppearance,
  useInsets,
} from "@vkontakte/vk-bridge-react";
import { AdaptivityProvider, ConfigProvider, AppRoot } from "@vkontakte/vkui";
import { RouterProvider } from "@vkontakte/vk-mini-apps-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { transformVKBridgeAdaptivity } from "./utils";
import { router } from "./routes";
import { App } from "./App";

import "@vkontakte/vkui/dist/vkui.css";

const queryClient = new QueryClient();

export const AppConfig = () => {
  const vkBridgeAppearance = useAppearance() || undefined;
  const vkBridgeInsets = useInsets() || undefined;
  const adaptivity = transformVKBridgeAdaptivity(useAdaptivity());
  const { vk_platform } = parseURLSearchParamsForGetLaunchParams(
    window.location.search
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        appearance={vkBridgeAppearance}
        platform={vk_platform === "desktop_web" ? "vkcom" : undefined}
        isWebView={vkBridge.isWebView()}
        hasCustomPanelHeaderAfter={true}
      >
        <AdaptivityProvider {...adaptivity}>
          <AppRoot mode="full" safeAreaInsets={vkBridgeInsets}>
            <RouterProvider router={router}>
              <App />
            </RouterProvider>
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

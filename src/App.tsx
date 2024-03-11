import { View, SplitLayout, SplitCol } from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";

import { Home } from "./panels";
import { DEFAULT_VIEW, DEFAULT_VIEW_PANELS } from "./routes";
import { Modals } from "./components/modals";

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME, modal: activeModal } =
    useActiveVkuiLocation();

  return (
    <SplitLayout modal={<Modals activeModal={activeModal} />}>
      <SplitCol>
        <View nav={DEFAULT_VIEW} activePanel={activePanel}>
          <Home nav={DEFAULT_VIEW_PANELS.HOME} />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};

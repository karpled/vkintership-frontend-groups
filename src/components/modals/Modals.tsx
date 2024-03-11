import { ModalRoot } from "@vkontakte/vkui";
import React from "react";
import GroupFriends from "./GroupFriends";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { HOME_PANEL_MODALS } from "../../routes";

interface ModalsProps
  extends Omit<React.ComponentProps<typeof ModalRoot>, "children"> {
  activeModal: string | undefined;
}

const Modals = ({ activeModal, ...props }: ModalsProps): React.ReactElement => {
  const navigator = useRouteNavigator();

  return (
    <ModalRoot
      activeModal={activeModal}
      onClose={() => navigator.hideModal()}
      {...props}
    >
      <GroupFriends nav={HOME_PANEL_MODALS.GROUP_FRIENDS} />
    </ModalRoot>
  );
};

export default Modals;

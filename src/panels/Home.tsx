import { FC } from "react";
import { Panel, PanelHeader, NavIdProps } from "@vkontakte/vkui";

export const Home: FC<NavIdProps> = (props) => {
  return (
    <Panel {...props}>
      <PanelHeader>Главная</PanelHeader>
    </Panel>
  );
};

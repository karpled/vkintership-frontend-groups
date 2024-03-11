import { Icon56CakeOutline } from "@vkontakte/icons";
import { Placeholder } from "@vkontakte/vkui";

const EmptyGroupsPlaceholder = (): React.ReactElement => {
  return (
    <Placeholder header="Торт — это ложь" icon={<Icon56CakeOutline />}>
      А Ваш список групп пуст
    </Placeholder>
  );
};

export default EmptyGroupsPlaceholder;

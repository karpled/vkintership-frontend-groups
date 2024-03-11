import { Icon56ErrorOutline } from "@vkontakte/icons";
import { Placeholder } from "@vkontakte/vkui";

const ErrorFetchGroupsPlaceholder = (): React.ReactElement => {
  return (
    <Placeholder icon={<Icon56ErrorOutline />}>Произошла ошибка</Placeholder>
  );
};

export default ErrorFetchGroupsPlaceholder;

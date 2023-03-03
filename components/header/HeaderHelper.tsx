import Alert from "./alert/Alert.tsx";
import { EditableAlert } from "./alert/interfaces.ts";
import NavbarCollapsed from "./navbar/NavbarCollapsed.tsx";
type Props = { alerts: EditableAlert[] };

export default function HeaderHelper(props: Props) {
  const { alerts } = props;

  return (
    <div class="bg-default fixed w-full z-50 top-0">
      <Alert alerts={alerts} />

      <div class="hidden">
        <NavbarCollapsed />
      </div>
    </div>
  );
}

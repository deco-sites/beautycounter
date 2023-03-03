import { tw } from "twind";
import Alert from "./alert/Alert.tsx";
import { lazy, Suspense } from "preact/compat";
import { animation, css, keyframes } from "twind/css";
import { EditableAlert } from "./alert/interfaces.ts";
import { useEffect, useMemo, useState } from "preact/hooks";

const NavbarCollapsed = lazy(() => import("./navbar/NavbarCollapsed.tsx"));
type Props = { alerts: EditableAlert[] };

export default function HeaderHelper(props: Props) {
  const { alerts } = props;
  const [navbarVisibility, setNavbarVisibility] = useState<boolean>(false);

  function handleScroll() {
    const position = window.pageYOffset;
    const navVisibility = position > 200;
    setNavbarVisibility(navVisibility);
  }

  const containerAnimationName = useMemo(() => {
    const fadeIn = tw(keyframes`
      0% { 
        height: 53px;
        transform: translateY(-53px);
      }

      100% {
        height: 53px;
        transform: translateY(0);
      }
    `);

    const fadeOut = tw(keyframes`
      0% { 
        height: 53px;
        transform: translateY(0);
      }

      100% {
        height: 53px;
        transform: translateY(-53px);
      }
    `);

    return navbarVisibility ? fadeIn : fadeOut;
  }, [navbarVisibility]);

  const fadeAnimation = tw(css(animation({
    animationDuration: `0.3s`,
    animationFillMode: "forwards",
    animationTimingFunction: "ease",
  }, {})));

  useEffect(() => {
    addEventListener("scroll", handleScroll, { passive: true });
    return () => removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div class="fixed w-full z-50 top-0">
      <Alert alerts={alerts} />

      <div
        class={`h-0 overflow-hidden ${fadeAnimation} relative z-10`}
        style={`animation-name: ${containerAnimationName};`}
      >
        <Suspense fallback={null}>
          <NavbarCollapsed />
        </Suspense>
      </div>
    </div>
  );
}

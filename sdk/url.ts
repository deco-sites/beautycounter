import { useEffect, useState } from "preact/hooks";

export const useUrlHash = () => {
  const [hash, setHash] = useState<string>();

  useEffect(() => {
    addEventListener("hashchange", onChangeUrl);
    return () => removeEventListener("hashchange", onChangeUrl);
  }, []);

  function onChangeUrl() {
    setHash(location.hash);
  }

  return hash;
};

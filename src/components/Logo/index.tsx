import { useEffect, useState } from "react";
import { useLogoVersion } from "../../hooks/use-logoVersion";
import { useSettings } from "../../hooks/use-settings";
import getLogoPath from "../../services/system/getLogoPath";
import { Img } from "./styles";

export const Logo = () => {
  const [logoProdPath, setLogoProdPath] = useState('');
  const { logoVersion } = useLogoVersion()
  const { settings } = useSettings()

  const load = async () => {
    setLogoProdPath(await getLogoPath())
  }

  useEffect(() => {
    load()
  }, []);

  return <Img
    src={
      import.meta.env.PROD
        ? `${logoProdPath}?v=${logoVersion}`
        : `./logo.svg?v=${logoVersion}`
    }
    alt={`${settings?.company.name} Logo`}
  />
}
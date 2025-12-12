import { useEffect, useState } from "react";
import bar_loading from '../../assets/bar-loading.svg';
import { useUpdating } from "../../hooks/use-updating";
import { getApiVersion, getAppVersion } from "../../services/system-status";
import { ErrorWrapper, Fields, Wrapper } from "./styles";

export const Statusbar = () => {
  const [error, setError] = useState('');
  const [apiVersion, setApiVersion] = useState<string>();
  const [appVersion, setAppVersion] = useState<string>();

  const { updating } = useUpdating()

  async function getVersion() {
    const { body, error } = await getApiVersion()
    const appVersion = await getAppVersion()
    setAppVersion(appVersion);
    if (error) {
      setError(error);
      return
    }
    setApiVersion(body?.version);
  }

  useEffect(() => {
    getVersion();
  }, []);

  return (
    <Wrapper>
      {!!error.length &&
        <ErrorWrapper>
          <span>{error}</span>
        </ErrorWrapper>
      }
      <Fields $first>
        <span>Versão da api:</span>
        <span>{apiVersion}</span>
      </Fields>
      <Fields>
        <span>Versão do software:</span>
        <span>
          {updating
            ? <img src={bar_loading} />
            : appVersion
          }
        </span>
      </Fields>
    </Wrapper>
  )
}

import { onlyDecimals } from "@mckatoo/utils";
import { useEffect, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { CloseCircle } from "styled-icons/ionicons-solid";
import { BackupList } from "../../components/BackupList";
import { Button } from "../../components/Button";
import { CheckboxInput } from "../../components/CheckboxInput";
import { CompanyPhones } from "../../components/CompanyPhones";
import { Container } from "../../components/Container";
import { SelectInput } from "../../components/SelectInput";
import { TextInput } from "../../components/TextInput";
import { useLogoVersion } from "../../hooks/use-logoVersion";
import { useSettings } from "../../hooks/use-settings";
import { useUpdating } from "../../hooks/use-updating";
import { getAddressByCEP } from "../../services/address/getAddressByCEP";
import { AutoBackupWrapper, AutoUpdateInputs, AutoUpdateWrapper, BackupContainer, BackupListWrapper, BackupsPathAndQtd, CEPWrapper, CityWrapper, ColorButtonWrapper, ColorPicker, ColorPickerWrapper, CompanyWrapper, CompanyWrapperButtons, CompanyWrapperLine, LogoButtonWrapper, Main, PathBackup, PhonesButtonWrapper, QtdMaxStoredBackup, SaveAllSettingsButton, Title, UFWrapper, UpdateInterval, UpdateWrapper, Wrapper, WrapperBackupContainer } from "./styles";

type Backup = {
  date: string
  path: string
}

export const SettingsPage = () => {
  const backupIntervalOptions = [
    { label: '30 minutos', value: "30" },
    { label: '2 horas', value: "120" },
    { label: '6 horas', value: "360" }
  ]
  const updateIntervalOptions = [
    { label: '5 minutos', value: "5" },
    { label: '30 minutos', value: "30" },
    { label: '2 horas', value: "120" },
    { label: '4 horas', value: "240" },
  ]
  const backupQtdOptions = [
    { label: '5 backups', value: "5" },
    { label: '10 backups', value: "10" },
    { label: '20 backups', value: "20" }
  ]
  let backupTimeoutID: NodeJS.Timeout;

  const [autoUpdate, setAutoUpdate] = useState(false);
  const [autoBackup, setAutoBackup] = useState(false);
  const [backupList, setBackupList] = useState<Backup[]>([]);
  const [backupQtdMax, setBackupQtdMax] = useState(backupQtdOptions[0].value);
  const [backupInterval, setBackupInterval] = useState(backupIntervalOptions[0].value);
  const [updateInterval, setUpdateInterval] = useState(updateIntervalOptions[0].value);
  const [backupPath, setBackupPath] = useState("");
  const [logoPath, setLogoPath] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddressStreet, setCompanyAddressStreet] = useState('');
  const [companyAddressPostalCode, setCompanyAddressPostalCode] = useState('');
  const [companyAddressCity, setCompanyAddressCity] = useState('');
  const [companyAddressState, setCompanyAddressState] = useState('');
  const [companyAddressNeighborhood, setCompanyAddressNeighborhood] = useState('');
  const [showPhones, setShowPhones] = useState(false);
  const [companyPhones, setCompanyPhones] = useState<string[]>([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState<string>();

  const { setUpdating } = useUpdating()
  const { setSettings, settings } = useSettings()
  const { refreshLogoVersion } = useLogoVersion()

  async function getConfig() {
    if (!settings) return
    setAutoUpdate(!!settings.update.auto)
    setAutoBackup(!!settings.backup.auto)
    setBackupPath(settings.backup.path || '')
    setBackupInterval(settings.backup.interval?.toString() + backupIntervalOptions[0].value)
    setUpdateInterval(settings.update.interval?.toString() + updateIntervalOptions[0].value)
    setBackupQtdMax(settings.backup.qtdMax?.toString() + backupQtdOptions[0].value)
    setCompanyName(settings.company.name || '')
    setCompanyAddressStreet(settings.company.address.street || '')
    setCompanyAddressNeighborhood(settings.company.address.neighborhood || '')
    setCompanyAddressCity(settings.company.address.city || '')
    setCompanyAddressState(settings.company.address.state || '')
    setCompanyPhones(settings.company.phones)
  }
  async function update() {
    setUpdating(true)
    try {
      await window.electron_ipc.check_install_update()
    } catch (error) {
      setUpdating(false)
    }
    setUpdating(false)
  }
  async function loadBackupList() {
    !!backupTimeoutID && clearTimeout(backupTimeoutID);
    const backups = await window.electron_ipc.get_backup_list()
    !!backups && setBackupList(backups);
    if (!!settings?.backup.interval)
      backupTimeoutID = setTimeout(loadBackupList, +settings.backup.interval * 60 * 1000);
  }
  async function saveBackup() {
    const saved = await window.electron_ipc.save_db()
    if (!saved) return
    loadBackupList()
  }
  async function restoreBackup(path: string) {
    const confirmed = await window.electron_ipc.confirm(`Deseja restaurar este backup?\nSera gerado um novo backup antes de restaurar.`)
    if (!confirmed) return
    await window.electron_ipc.restore_db(path)
    loadBackupList()
  }
  async function deleteBackup(path: string) {
    const confirmed = await window.electron_ipc.confirm(`Deseja apagar este backup?`)
    if (!confirmed) return
    await window.electron_ipc.delete_backup(path)
    loadBackupList()
  }
  async function getBackupDir() {
    const backupDir = await window.electron_ipc.choose_folder()
    setBackupPath(backupDir || '')
  }
  async function getLogoDir() {
    const logoDir = await window.electron_ipc.choose_file(['svg'])
    setLogoPath(logoDir || '')
  }
  function saveAllSettings() {
    window.electron_ipc.settings.set('backup.auto', autoBackup)
    window.electron_ipc.settings.set("backup.path", backupPath)
    window.electron_ipc.settings.set('backup.interval', backupInterval)
    window.electron_ipc.settings.set('backup.qtdMax', backupQtdMax)
    window.electron_ipc.settings.set('update.auto', autoUpdate)
    window.electron_ipc.settings.set('update.interval', updateInterval)
    window.electron_ipc.settings.set('company.name', companyName)
    window.electron_ipc.settings.set('company.address.city', companyAddressCity)
    window.electron_ipc.settings.set('company.address.state', companyAddressState)
    window.electron_ipc.settings.set('company.address.street', companyAddressStreet)
    window.electron_ipc.settings.set('company.address.neighborhood', companyAddressNeighborhood)
    window.electron_ipc.settings.set('company.phones', companyPhones)
    !!color?.length && window.electron_ipc.settings.set('color', color)
    setSettings({
      backup: {
        auto: autoBackup,
        interval: +backupInterval as CustomSettings["backup"]["interval"],
        path: backupPath,
        qtdMax: +backupQtdMax
      },
      color: !!color?.length ? color : (settings?.color ? settings.color : '#000000'),
      company: {
        address: {
          city: companyAddressCity,
          neighborhood: companyAddressNeighborhood,
          state: companyAddressState,
          street: companyAddressStreet
        },
        name: companyName,
        phones: companyPhones,
      },
      update: {
        auto: autoUpdate,
        interval: +updateInterval as CustomSettings["update"]["interval"]
      }
    })
    !!logoPath.length && window.electron_ipc.copy_logo(logoPath)
    window.electron_ipc.update_settings()
    refreshLogoVersion()
  }
  async function getAddress() {
    const { body } = await getAddressByCEP(companyAddressPostalCode)
    if (!body) {
      return
    }
    setCompanyAddressStreet(body.street)
    setCompanyAddressCity(body.city)
    setCompanyAddressNeighborhood(body.district)
    setCompanyAddressState(body.state)
  }
  async function closeColorPicker() {
    const newColor = color || (await window.electron_ipc.settings.get('color')) + ""
    setSettings({
      ...(settings as CustomSettings),
      color: newColor
    })
    setShowColorPicker(false)
  }
  async function addPhone(phone?: { number: string, type: string }) {
    if (!phone) return
    setCompanyPhones([...companyPhones, `${phone.type}: ${phone.number}`])
  }
  async function deletePhone(phone: string) {
    const phones = companyPhones.filter(_phone => _phone !== phone)
    setCompanyPhones(phones)
  }

  useEffect(() => {
    loadBackupList()
    getConfig()
  }, []);
  useEffect(() => {
    const decimals = onlyDecimals(companyAddressPostalCode)
    if (decimals.length > 7) {
      getAddress()
    }
  }, [companyAddressPostalCode])
  useEffect(() => {
    !!settings && !!color?.length && setSettings({
      ...settings,
      color
    })
  }, [color]);

  return (
    <Wrapper>
      <Title>
        Configurações
      </Title>

      <Main>
        <WrapperBackupContainer>
          <Container label="Backup" color="white" borderDashed>
            <BackupContainer>
              <Button label="Backup Manual" onClick={saveBackup} />
              <AutoBackupWrapper>
                <div>
                  <CheckboxInput
                    name="auto-backup"
                    label="Backup Automático"
                    isChecked={autoBackup}
                    onCheck={async value => {
                      !backupPath.length && value && await getBackupDir()
                      setAutoBackup(value)
                    }}
                  />
                </div>
                <div>
                  <SelectInput
                    name="auto-backup-interval"
                    title="Intervalo de tempo para backups automáticos"
                    label="Intervalo de Backup"
                    labelToLeft
                    disabled={!autoBackup}
                    value={backupInterval}
                    options={backupIntervalOptions}
                    onChangeValue={setBackupInterval}
                  />
                </div>
              </AutoBackupWrapper>

              <BackupsPathAndQtd>
                <PathBackup>
                  <button onClick={getBackupDir} />
                  <TextInput
                    disabled
                    label="Caminho do backup"
                    name="backup_path"
                    placeholder="Clique para selecionar a pasta de backup"
                    state={[backupPath, setBackupPath]}
                  />
                </PathBackup>
                <QtdMaxStoredBackup>
                  <SelectInput
                    name="max-stored-backup"
                    title="Quantidade máxima de backups armazenados. Sempre que for salvar um novo backup, será apagado o backup mais antigo caso o limite seja atingido."
                    label="Qtd máx. de Backups"
                    value={backupQtdMax}
                    options={backupQtdOptions}
                    onChangeValue={setBackupQtdMax}
                  />
                </QtdMaxStoredBackup>
              </BackupsPathAndQtd>

              <BackupListWrapper>
                <BackupList
                  backups={backupList}
                  onDeleteClick={deleteBackup}
                  onRestoreClick={restoreBackup}
                />
              </BackupListWrapper>
            </BackupContainer>
          </Container>
        </WrapperBackupContainer>

        <UpdateWrapper>
          <Container label="Atualização" color="white" borderDashed>
            <AutoUpdateWrapper>
              <AutoUpdateInputs>
                <CheckboxInput
                  name="auto-update"
                  label="Atualização Automática"
                  onCheck={setAutoUpdate}
                  isChecked={autoUpdate}
                />
                <UpdateInterval>
                  <SelectInput
                    name="auto-update-interval"
                    labelToLeft
                    title="Intervalo de tempo para atualizações automáticas"
                    label="Intervalo entre Atualizações"
                    disabled={!autoUpdate}
                    value={updateInterval}
                    options={updateIntervalOptions}
                    onChangeValue={setUpdateInterval}
                  />
                </UpdateInterval>
              </AutoUpdateInputs>
              <Button
                disabled={autoUpdate}
                label="Atualizar"
                onClick={update}
              />
            </AutoUpdateWrapper>
          </Container>
          <Container label="Dados da empresa" color="white" borderDashed>
            <CompanyWrapper>
              <CompanyWrapperLine>
                <div>
                  <TextInput
                    label="Nome"
                    name="company_name"
                    placeholder="Insira o nome da empresa"
                    state={[companyName, setCompanyName]}
                  />
                </div>
                <CEPWrapper>
                  <TextInput
                    label="CEP"
                    name="company_postal_code"
                    state={[companyAddressPostalCode, setCompanyAddressPostalCode]}
                  />
                </CEPWrapper>
                <div>
                  <TextInput
                    label="Rua"
                    name="company_street"
                    state={[companyAddressStreet, setCompanyAddressStreet]}
                  />
                </div>
              </CompanyWrapperLine>
              <CompanyWrapperLine>
                <div>
                  <TextInput
                    label="Bairro"
                    name="company_neighborhood"
                    state={[companyAddressNeighborhood, setCompanyAddressNeighborhood]}
                  />
                </div>
                <CityWrapper>
                  <TextInput
                    label="Cidade"
                    name="company_city"
                    state={[companyAddressCity, setCompanyAddressCity]}
                  />
                </CityWrapper>
                <UFWrapper>
                  <TextInput
                    label="UF"
                    name="company_state"
                    state={[companyAddressState, setCompanyAddressState]}
                  />
                </UFWrapper>
              </CompanyWrapperLine>
              <CompanyWrapperButtons>
                <ColorButtonWrapper>
                  <Button
                    label="Cor"
                    onClick={() => setShowColorPicker(true)}
                  />
                </ColorButtonWrapper>
                <PhonesButtonWrapper>
                  <Button
                    label="Telefones"
                    onClick={() => setShowPhones(true)}
                  />
                </PhonesButtonWrapper>
                <LogoButtonWrapper>
                  <img
                    onClick={getLogoDir}
                    src={!!logoPath.length ? `file://${logoPath}` : './logo.svg'}
                    title="Logotipo"
                  />
                </LogoButtonWrapper>
              </CompanyWrapperButtons>
            </CompanyWrapper>
            {showPhones &&
              <CompanyPhones
                phones={companyPhones}
                onDeletePhone={(phoneID) => deletePhone(phoneID)}
                onAddPhone={(phone) => addPhone(phone)}
                onClose={() => { setShowPhones(false) }}
              />
            }
            {showColorPicker &&
              <ColorPickerWrapper>
                <span
                  onClick={closeColorPicker}>
                  <CloseCircle size={24} />
                </span>
                <ColorPicker>
                  <HexColorPicker color={color} onChange={setColor} />
                  <HexColorInput color={color} onChange={setColor} prefixed />
                </ColorPicker>
              </ColorPickerWrapper>
            }
          </Container>
        </UpdateWrapper>
      </Main>

      <SaveAllSettingsButton>
        <Button
          onClick={saveAllSettings}
          label="Salvar configurações"
        />
      </SaveAllSettingsButton>
    </Wrapper >
  )
}

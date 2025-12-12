import { useEffect, useRef, useState } from "react";
import { CloseCircle } from "styled-icons/ionicons-solid";
import { useClient } from "../../hooks/use-client";
import { useVehicle } from "../../hooks/use-vehicle";
import { createVehicleService } from "../../services/vehicles/createVehicle";
import { updateVehicleService } from "../../services/vehicles/updateVehicle";
import { Button } from "../Button";
import { Loading } from "../Loading";
import { NumberInput } from "../NumberInput";
import { TextInput } from "../TextInput";
import { CloseButton, ErrorMessage, Fields, RowFields, Wrapper, WrapperForm } from "./styles";

type VehicleFormProps = {
  isModal?: boolean
  onSaveVehicle?: () => void
  onClose?: () => void
}

export const VehicleForm = ({
  isModal = false,
  onSaveVehicle,
  onClose,
}: VehicleFormProps) => {
  const brandInputRef = useRef<HTMLInputElement>(null)
  const { setVehicle, vehicle } = useVehicle()
  const { client } = useClient()

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [labelButton, setLabelButton] = useState<'Salvar' | 'Atualizar'>('Salvar');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');
  const [year, setYear] = useState('');

  function close() {
    !!onClose && onClose()
  }

  function clear() {
    setBrand('')
    setModel('')
    setPlate('')
    setYear('')
    brandInputRef.current?.focus()
  }

  async function save() {
    setLoading(true)

    if (!!brand && !!model) {
      if (!client?.id) {
        setError('Selecione um cliente')
        setTimeout(() => {
          setError('')
        }, 3000)
        return
      }
      const { status, body } = (!vehicle?.id)
        ? await createVehicleService({
          brand, model, year: +year, plate, client_id: client.id
        })
        : await updateVehicleService({
          ...vehicle,
          brand, model, year: +year,
        })
      brandInputRef?.current?.focus()
      if (status !== 201) {
        setError(JSON.stringify(body))
        setTimeout(() => {
          setError('')
        }, 3000)
      }
      !!onSaveVehicle && onSaveVehicle()
      setVehicle({
        id: body?.id ?? '',
        brand,
        model,
        year: +year,
        plate,
        client
      })
    }
    setLoading(false)
    clear()
  }

  useEffect(() => {
    if (!!vehicle?.id?.length)
      setLabelButton('Atualizar')
    else
      setLabelButton('Salvar')
  }, [vehicle]);

  return (
    <>
      <CloseButton onClick={close}>
        <CloseCircle size={24} />
      </CloseButton>
      <Wrapper>
        <ErrorMessage $hidden={!error?.length} $isModal={isModal}>
          <span>{error}</span>
        </ErrorMessage>
        <Loading loading={loading} isModal={isModal} />
        <WrapperForm>
          {!!isModal && <h1>Cadastro de Veículos</h1>}
          <form
            onSubmit={element => {
              element.preventDefault()
              save()
            }}
          >
            <Fields>
              <RowFields>
                <TextInput
                  autoFocus
                  required
                  name="brand"
                  label="Marca"
                  inputRef={brandInputRef}
                  state={[brand, setBrand]}
                />
                <TextInput
                  name="model"
                  required
                  label="Modelo"
                  state={[model, setModel]}
                />
              </RowFields>

              <RowFields>
                <NumberInput
                  name="year"
                  label="Ano"
                  state={[year, setYear]}
                />
                <TextInput
                  name="plate"
                  label="Placa"
                  state={[plate, setPlate]}
                />
              </RowFields>

            </Fields>
            <Button
              type='submit'
              disabled={!brand || !model}
              label={labelButton}
            />
          </form >
        </WrapperForm >
      </Wrapper>
    </>
  )
}

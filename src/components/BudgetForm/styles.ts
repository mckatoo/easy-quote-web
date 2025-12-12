import styled from "styled-components";

export const ErrorWrapper = styled.div`
  background-color: #fb2c36;
  position: absolute;
  top: 0;
  width: 100%;
  height: fit-content;
`

export const FormMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
`

export const FormLine = styled.div`
  display: flex;
  gap: 12px;
`

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`

export const FieldWrapper = styled(FlexCol)`
  gap: 12px;
`

export const FieldFullWrapper = styled(FieldWrapper)`
  width: 100%;
`

export const VehicleWrapper = styled.div`
  padding: 8px;
`

export const ServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px;
`

export const ValueWrapper = styled(FlexCol)`
  width: 100%;
`

export const ValueRow = styled.div`
  display: flex;
  gap: 4px;
`

export const AddServiceWrapper = styled(FlexCol)`
  justify-content: flex-end;
`

export const DateInput = styled.div`
  border-style: solid;
  border-width: 1px;
  font-size: 14px;
  border-radius: 8px;
  width: fit-content;
  padding: 10px;
  background-color: #364153;
  border-color: #4a5565;
  color: #fff;
  display: flex;
  gap: 4px;
  cursor: pointer;

  span{
    color: #fff;
  }

  &::placeholder {
    color: #99a1af;
  }
  &:focus {
    border-color: #0000ff;
  }
`

export const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const DateLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
`

export const AddClient = styled.span`
  cursor: pointer;
  padding: 8px;
  background-color: #364153;
  color: #fff;
  border-radius: 8px;
`

export const AddService = styled(AddClient)<{$disabled?: boolean}>`
  padding: 8px;
  border-radius: 8px;
  color: ${props => props.$disabled ? "#99a1af" : "#fff"};
  background-color: #364153;
  cursor: pointer;
  opacity: ${props => props.$disabled ? "70%" : "initial"};
`

export const AuxFormWrapper = styled.div`
  position: absolute;
  display: flex;
  inset: 8px;
  background-color: #101828;
  border-radius: 8px;
  padding: 12px;
`
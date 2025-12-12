import styled from "styled-components";
import { Input, Label as InputLabel } from "../InputStyles";

export const Wrapper = styled.div<{ $labelToLeft: boolean }>`
  ${({ $labelToLeft }) => $labelToLeft && `
    display: flex;
    align-items: center;
    gap: 4px;
  `}
`

export const Label = InputLabel

export const WrapperSelect = styled.div`
  display: flex;
  gap: 4px;
`

export const Select = styled(Input).attrs({ as: 'select' })``

import styled from "styled-components";
import colors from "../../colors";
import * as InputStyles from "../InputStyles";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  position: relative;

  & > svg {
    position: absolute;
    cursor: pointer;
    right: 0;
    color: ${colors.gray700};
  }
`

export const Label = styled.label<{ $disabled?: boolean }>`
  display: block;
  font-size: 14px;
  line-height: 1.428571;
  font-weight: 500;
  white-space: nowrap;
  color: ${props => props.$disabled ? colors.gray400 : "#fff"};
`

export const Input = styled(InputStyles.Input)`
  background-color: ${colors.gray400};
  color: ${colors.gray700};
  border-radius: 4px;
  height: 32px;
  padding-inline: 4px;
  width: 100%;
`
import styled from "styled-components"
import colors from "../colors"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`

export const WrapperInput = styled.div<{ $reverse?: boolean, $horizontal?: boolean }>`
    display: flex;
    flex-direction: ${({ $horizontal }) => $horizontal ? "row" : "column"};
    flex-wrap: wrap;
    gap: 2px;
    ${({ $reverse }) => $reverse && "flex-direction: row-reverse;"}
`

export const Label = styled.label<{ $isDisabled?: boolean }>`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.$isDisabled ? colors.gray400 : colors.white};
`

export const Input = styled.input`
  border-style: solid;
  border-width: 1px;
  font-size: 14px;
  border-radius: 8px;
  display: block;
  width: 100%;
  padding: 10px;
  border-color: ${colors.gray600};
  color: ${colors.white};
  background-color: ${colors.gray700};

  &:disabled {
    opacity: 75%;
  }

  &:focus {
    border-color: ${colors.blue500};
  }
  
  ::placeholder {
    color: ${colors.gray400};
  }
`
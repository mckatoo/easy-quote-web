import styled from "styled-components";
import colors from "../../colors";

export const StyledButton = styled.button`
  &:disabled {
    background-color: ${colors.gray500};
    color: ${colors.gray600};
  }
  &:focus {
    box-shadow: 0 0 #0000;
    background-color: ${props => props.color || colors.blue600};
    outline-style: none;
    @media (forced-colors: active) {
      outline: 2px solid transparent;
      outline-offset: 2px;
    }
  }
  &:hover{
    background-color: ${props => props.color || colors.blue700};
  }
  &:enabled {
    cursor: pointer;
  }
  
  background-color: ${props => props.color || colors.blue600};
  color: ${colors.white};
  text-align: center;
  font-weight: 500;
  border-radius: 8px;
  font-size: 14px;
  width: 100%;
  padding: 10px 20px;
`
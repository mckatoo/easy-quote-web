import styled from "styled-components";

export const Wrapper = styled.div<{$isModal: boolean}>`
  position: absolute;
  top: ${props => props.$isModal ? "16px" : "64px"};
  left: ${props => props.$isModal ? "16px" : "0"};
  width: 40px;
  color: ${props => props.$isModal ? "white" : props.theme.customColor};
`
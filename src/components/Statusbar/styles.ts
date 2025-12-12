import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: ${props => props.theme.customColor};
  display: flex;
  justify-content: end;
  width: 100%;
  height: 32px;
  font-size: 14px;
  color: #fff;
  border: solid;
  border-width: 2px 0;
`

export const ErrorWrapper = styled.div`
  background-color: #a02f34;
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  border-radius: 2px;
  padding: 0 12px;
  height: fit-content;
`

export const Fields = styled.div<{$first?: boolean}>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border-right: solid;
  border-right-width: 2px;
  text-align: right;
  border-left: ${props => props.$first ? "solid" : ""};
  border-left-width: ${props => props.$first ? "2px" : "0"};
  color: #fff;
`

export const FieldData = styled.span`

`
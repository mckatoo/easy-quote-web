import styled from "styled-components";
import colors from "../../colors";

export const Wrapper = styled.div`
  position: absolute;
  inset: 8px;
  background-color: ${colors.gray950};
  border-radius: 8px;
  padding: 12px;
  min-height: 384px;
  border-style: solid;
  border-width: 2px;
  border-color: ${colors.white};
  gap: 8px;
  display: flex;
  flex-direction: column;

  form {
    display: flex;
    gap: 12px;
  }
`

export const Title = styled.h1`
  color: ${colors.white};
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`

export const AddPhoneButton = styled.span`
  cursor: pointer;
  padding: 8px;
  background-color: ${colors.gray700};
  color: ${colors.white};
  border-radius: 8px;
`

export const ListWrapper = styled.div`
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${colors.gray800};
  border-color: ${colors.gray700};
  height: 100%;
`

export const CloseButton = styled.span`
  right: 8px;
  top: 8px;
  z-index: 20;
  color: ${colors.white};
  border-style: solid;
  border-color: ${colors.white};
  cursor: pointer;
  position: absolute;
`
import styled, { css } from "styled-components";
import colors from "../../colors";

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

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: ${colors.gray950};
  border-radius: 6px;
  align-items: center;
`

export const ErrorMessage = styled.div<{ $hidden: boolean, $isModal?: boolean }>`
  ${props => props.$hidden ? "display: none;" : css`
    background-color: ${colors.red500};
    position: absolute;
    top: ${props.$isModal ? "16px" : "4.5rem"};
    border-radius: 2px;
    left: ${props.$isModal ? "16px" : "42px"};
    right: ${props.$isModal ? "16px" : "42px"};
    padding-inline: 12px;
    height: fit-content;
  `}
`

export const WrapperForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 24px;

  & > h1 {
    color: ${colors.white};
    font-size: 30px;
    line-height: 1.2;
  }

  & > form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;

    @media (width >= 640px) {
      width: 60%;
    }
  }
`

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const RowFields = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`
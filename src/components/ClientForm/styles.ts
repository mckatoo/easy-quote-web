import styled from "styled-components";
import colors from "../../colors";
import * as BaseStyles from "../BaseStyles";

export const CloseButton = styled.span`
  right: 16px;
  z-index: 20;
  color: ${colors.white};
  border-style: solid;
  border-color: ${colors.white};
  cursor: pointer;
  position: absolute;
`

export const Wrapper = styled.div<{ $isModal?: boolean }>`
  display: flex;
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: ${props => props.$isModal ? colors.gray950 : "initial"};
  border: ${props => props.$isModal ? `solid 2px ${colors.white}` : "initial"};
  border-radius: ${props => props.$isModal ? "6px" : "initial"};
  align-items: ${props => props.$isModal ? "center" : "initial"};
`

export const ErrorWrapper = styled.div<{ $isModal?: boolean }>`
  background-color: ${colors.red500};
  position: absolute;
  border-radius: 2px;
  padding: 0 12px;
  height: fit-content;
  top: ${props => props.$isModal ? "16px" : "72px"};
  left: ${props => props.$isModal ? "16px" : "48px"};
  right: ${props => props.$isModal ? "16px" : "48px"};
`

export const FormWrapper = styled.div<{ $isModal?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${props => props.$isModal ? "auto" : "100%"};
  ${props => props.$isModal && "margin: auto;"}
`

export const FormTitle = styled.h1`
  color: ${colors.white};
  font-size: 30px;
`

export const Form = styled.form<{ $isModal?: boolean }>`
  width: 100%;
  padding: ${props => props.$isModal ? "12px" : "initial"};
`

export const CNPJWrapper = styled.div`
  width: 160px;
`

export const PersonalIdentity = styled.div<{ $loadingCNPJ?: boolean }>`
  display: flex;
  gap: 12px;
  animation: ${props => props.$loadingCNPJ ? "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" : "initial"};
`

export const AddressWrapper = styled.div`
  padding: 8px;
`

export const AddressLine = styled.div`
  display: flex;
  gap: 12px;
`

export const CEPWrapper = styled.div`
  width: 100px;
`

export const NumberAddressWrapper = styled.div`
  width: 120px;
`

export const StateWrapper = styled.div`
  width: 40px;
`

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`

export const Animate = styled.div<{$isAnimated?: boolean}>`
  animation: ${props => props.$isAnimated
    ? "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
    : "initial"
  };
`

export const FullWidth = BaseStyles.FullWidth;
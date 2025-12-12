import styled from "styled-components";
import colors from "../../colors";

export const Title = styled.h1`
  width: 100%;
  text-align: center;
  color: ${props => props.theme.customColor};
  border-style: solid;
  border-width: 4px;
  border-color: ${props => props.theme.customColor};
  font-size: 24px;
  padding: 12px;

  @media (width >= 640px) {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: ${props => props.theme.customColor};
  padding: 12px;
  width: 100%;
  height: calc(100% - 64px); /* 100% - Title */

  @media (width >= 640px) {
    flex-direction: row;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`

export const SearchWrapper = styled.div`
  position: absolute;
  height: 16px;
  width: 40%;
  top: 4px;
  right: 16px;
  z-index: 10;
  color: ${colors.gray400};
`

export const ListWrapper = styled.div`
  position: relative;
  border-radius: 8px;
  background-color: ${colors.gray700};
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`

export const WrapperListWithSearch = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
`
import styled from "styled-components";
import colors from "../../colors";

export const Nav = styled.nav`
  padding: 8px;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: ${props => props.theme.customColor};
`

export const Title = styled.h1`
  position: absolute;
  left: 50%;
  translate: -50% 0;
  font-size: 20px;
  font-weight: 700;

  @media (width >= 80rem /* 1280px */) {
    font-size: 24px;
  }
`

export const UserInfo = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 4px;
  justify-content: flex-end;
`

export const SignInButton = styled.button`
  background-color: ${colors.blue500};
  border-radius: 4px;
  padding: 8px;
`
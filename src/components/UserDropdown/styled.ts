import styled from "styled-components";

export const WrapperList = styled.div`
  position: absolute;
  right: 0;
  margin-top: 8px;
  background-color: ${props => props.theme.customColor};
  border-style: solid;
  border-width: 1px;
  border-radius: 6px;
`

export const Item = styled.li`
  padding: 8px 24px;

  &:hover {
    @media (hover: hover) {
      background-color: ${props => props.theme.customColor};
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      cursor: pointer;
    }
  }
`

export const Wrapper = styled.div`
  position: relative;
`

export const Button = styled.button<{ $isOpen?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 6px;

  svg {
    width: 16px;
    height: 16px;
    ${props => props.$isOpen && "transform: rotate(180deg);"}
  }
`
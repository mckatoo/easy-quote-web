import styled from "styled-components";

export const Aside = styled.aside`
  background-color: ${props => props.theme.customColor};
  z-index: 40;
  min-width: 256px;
`

export const Item = styled.li<{ $active: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  background-color: ${props => props.$active ? "#364153" : props.theme.customColor};

  &:hover {
    @media (hover: hover) {
      background-color: #364153;
    }
  }

  div {
    width: 20px;
    display: flex;

  }

  span {
    margin-inline-start: 12px;
  }
`

export const Wrapper = styled.div`
  height: 100%;
  padding-inline: 12px;
  padding-block: 16px;
`

export const LogoWrapper = styled.div`
  margin-bottom: 24px;
  height: 112px;
`

export const Ul = styled.ul`
  :where(& > :not(:last-child)) {
    margin-block-start: 0;
    margin-block-end: 8px;
  }
`

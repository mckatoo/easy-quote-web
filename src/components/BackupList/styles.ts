import styled from "styled-components";

export const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  height: 100%;
  font-size: 14px;
  text-align: left;
  color: #99a1af;

  &:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *) {
    text-align: right;
  }

  thead {
    position: sticky;
    top: 0;
    font-size: 12px;
    text-transform: uppercase;
    background-color: #364153;
    color: #99a1af;
  }
`

export const Th = styled.th<{ $width?: string, $center?: boolean }>`
  padding: 4px 8px;
  text-align: ${props => props.$center ? "center" : "initial"};
  width: ${props => props.$width || "initial"};

  span {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`

export const Tr = styled.tr`
  border: solid 1px;
  background-color: #1e2939;
  border-color: #364153;
`

export const Td = styled.td<{ $withEllipsis?: boolean }>`
  padding: 4px 8px;
  white-space: nowrap;
  overflow: ${props => props.$withEllipsis ? "hidden" : "initial"};
  text-overflow: ${props => props.$withEllipsis ? "ellipsis" : "initial"};

  span {
    cursor: pointer;
    font-weight: 500;
    color: #307cd3;
    padding: 8px;
  }
`
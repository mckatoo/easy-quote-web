import styled from "styled-components"
import colors from "../colors"

export const TableWrapper = styled.div`
  position: relative;
  border-width: 1px;
  border-radius: 2px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${colors.gray800};
  border-color: ${colors.gray700};
  height: 100%;
  width: 100%;
`

export const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  color: ${colors.gray400};
  background-color: ${colors.gray800};
  border-color: ${colors.gray700};

  .rtl:text-right:where([dir="rtl"], [dir="rtl"] *) {
    text-align: right;
  }

  thead{
    position: sticky;
    top: 0;
    font-size: 12px;
    line-height: 16px;
    text-transform: uppercase;
    background-color: ${colors.gray700};
    color: ${colors.gray400};
  }

  tbody>tr{
    border-bottom-width: 1px;
    background-color: ${colors.gray800};
    border-color: ${colors.gray700};
    
    &>th {
      cursor: pointer;
      width: 100%;
      padding: 12px 4px;
      font-weight: 500;
      white-space: nowrap;
      color: ${colors.gray400};

      &:hover {
        @media (hover: hover) {
          color: ${colors.gray100};
        }
      }
    }
  }
  
  tfoot {
    position: sticky;
    bottom: 0;
    background-color: ${colors.gray700};
    color: ${colors.gray400};

    div {
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
  }
`

export const Th = styled.th<{
  $size?: string,
  $center?: boolean
}>`
  padding: 4px 8px;
  width: ${props => props.$size || "auto"};
  ${props => props.$center && "text-align: center;"}

  .sr-only {
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

export const Td = styled.td<{ $withEllipsis?: boolean, $isLast?: boolean }>`
  padding: ${props => props.$isLast ? "0 4px" : "12px 4px"};
  white-space: nowrap;
  overflow: ${props => props.$withEllipsis ? "hidden" : "initial"};
  text-overflow: ${props => props.$withEllipsis ? "ellipsis" : "initial"};

  &>span{
    cursor: pointer;
    font-weight: 500;
    color: ${colors.gray400};
    padding: 8px;
    
    &:hover {
      @media (hover: hover) {
        color: ${colors.gray100};
      }
    }
  }
`

export const ButtonScrollTo = styled.button`
  width: 48px;
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 4px;
  
  &:hover {
    @media (hover: hover) {
      background-color: ${colors.gray600};
    }
  }
`

export const ButtonLoadMore = styled.button`
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 4px;

  &:hover {
    @media (hover: hover) {
      background-color: ${colors.gray600};
    }
  }
`
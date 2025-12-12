import styled from "styled-components";
import colors from "../../colors";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px;
  height: 100%;
`

export const Filters = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 8px;
  gap: 40px;
`

export const OnlyToReceive = styled.div`
  width: fit-content;
`

export const PerCustomer = styled.div`
  width: 100%;
`

export const TableWrapper = styled.div`
  position: relative;
  border-radius: 8px;
  background-color: ${colors.gray700};
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  font-size: 14px;
  text-align: left;
  color: ${colors.gray400};

  &:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *) {
    text-align: right;
  }

  thead {
    position: sticky;
    top: 0;
    font-size: 12px;
    text-transform: uppercase;
    background-color: ${colors.gray700};
    color: ${colors.gray400}
  }

  tbody>tr {
    border-bottom-width: 1px;
    border-bottom-style: solid;
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

export const Th = styled.th<{ $isLast?: boolean }>`
  padding: ${props => props.$isLast ? "12px 0" : "12px 4px"};
  width: ${props => props.$isLast ? "fit-content" : "initial"};

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

export const Td = styled.td<{ $isLast?: boolean }>`
  white-space: nowrap;
  padding: ${props => props.$isLast ? "0 4px" : "12px 4px"};

  &>div{
    display: flex;
    white-space: nowrap;
    justify-content: center;
    gap: 8px;

    &>span{
      cursor: pointer;
      font-weight: 500;
      color: ${colors.gray400};

      &:hover {
        @media (hover: hover) {
          color: ${colors.gray100};
        }
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
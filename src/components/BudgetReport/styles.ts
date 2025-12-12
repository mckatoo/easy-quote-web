import styled from "styled-components";

export const Wrapper = styled.div`
  width: 70mm;
  background-color: #fff;

  @media print {
    visibility: visible;
    position: fixed;
    left: 0;
    top: 0;
    display: block;
  }
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  h1 {
    font-style: italic;
  }

  img {
    width: 80px;
    padding-bottom: 4px;
  }
`

export const BudgetBody = styled.div`
  padding: 0 8px;

  @media print {
    padding-inline: 0px;
  }
`

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const Budget = styled.div`
  text-align: left;
  width: 100%;

  table {
    width: 100%;
    border-collapse: collapse;
  }
`

export const Th1 = styled.th`
  padding-right: 8px;
  white-space: nowrap;
`

export const Th2 = styled.th`
  width: 100%;
`

export const Th3 = styled.th`
  padding-left: 8px;
  white-space: nowrap;
  text-align: right;
`

export const Td1 = styled(Th1).attrs({ as: 'td' })``

export const Td2 = styled(Th2).attrs({ as: 'td' })`
  div{
    display: flex;
    align-items: baseline;

    span {
      white-space: nowrap;
      padding-right: 8px;
      max-width: 112px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`

export const Td3 = styled(Th3).attrs({ as: 'td' })``

export const Separator = styled.div`
  flex: 1;
  border-bottom-width: 1px;
  border-style: dashed;
  border-color: #99a1af;
`

export const TdRemove = styled.td`
  padding-left: 16px;
  color: #fb2c36;
  cursor: pointer;

  @media print {
    display: none;
  }
`

export const TotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const FooterWrapper = styled.div`
  text-align: center;
  padding-top: 40px;
`

export const TextStyle = styled.p`
  font-size: 2.5mm;
  font-weight: 700;
`

export const TextXLStyle = styled.p`
  font-size: 3mm;
`

export const Line = styled.hr`
  border-width: 1px;
  border-style: dashed;
  margin: 4px 0;
`
import styled from "styled-components";

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

export const Content = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  height: 100%;
`

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`

export const TableContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

export const ReportWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`

export const BudgetReportWrapper = styled.div`
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  background-color: #fff;
`

export const CloseWrapper = styled.div`
  cursor: pointer;
  position: sticky;
  top: 0;
  float: inline-end;

  @media print {
    display: none;
    visibility: hidden;
  }
`

export const BudgetListWrapper = styled.div`
  width: 100%;
  height: 100%;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: ${props => props.theme.customColor};
  color: #000;
  
  @media (width >= 640px) {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    width: 100%;
    padding: 24px;
    height: calc(100% - 64px); /* 100%-h1 */
  }
`

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
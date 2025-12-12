import styled from "styled-components";
import * as BaseStyles from "../BaseStyles";

export const Wrapper = styled.div`
  position: absolute;
  inset: 8px;
  background-color: #111827;
  border-radius: 8px;
  padding: 12px;
  min-height: 384px;
`

export const CloseWrapper = styled.span`
  right: 14px;
  color: #fff;
  border-style: solid;
  border-color: #fff;
  cursor: pointer;
  position: absolute;
`

export const Main = styled.div`
  background-color: #030712;
  border-width: 2px;
  border-color: #fff;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export const ErrorWrapper = styled.div`
  background-color: #ef4444;
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  border-radius: 2px;
  padding: 0 12px;
  height: fit-content;
`

export const LoadingWrapper = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 40px;
  color: #fff;
`

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: 24px;
  padding: 8px;
`

export const Form = styled.form`
  width: 100%;
`

export const Title = styled.h1`
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 18px;
  line-height: 28px;
  font-weight: 700;
  margin-bottom: 16px;
`

export const FormMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`

export const FormLine = styled.div`
  display: flex;
  gap: 4px;
`

export const TableWrapper = styled.div`
  border-width: 1px;
  border-radius: 2px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #1f2937;
  border-color: #374151;
  height: 100%;
`

export const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  color: #9ca3af;
  background-color: #1f2937;
  border-color: #374151;

  .rtl:text-right:where([dir="rtl"], [dir="rtl"] *) {
    text-align: right;
  }

  thead{
    position: sticky;
    top: 0;
    font-size: 12px;
    line-height: 16px;
    text-transform: uppercase;
    background-color: #374151;
    color: #9ca3af;
  }

  tbody>tr{
    border-bottom-width: 1px;
    background-color: #1f2937;
    border-color: #374151;
  }
`

export const Th = styled.th<{ $size?: string }>`
  padding: 4px 8px;
  width: ${props => props.$size || "auto"};

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

export const Td = styled.td<{$withEllipsis?: boolean}>`
  padding: 4px 8px;
  white-space: nowrap;
  overflow: ${props => props.$withEllipsis ? "hidden" : "initial"};
  text-overflow: ${props => props.$withEllipsis ? "ellipsis" : "initial"};

  span{
    cursor: pointer;
    font-weight: 500;
    color: #3b82f6;
    padding: 8px;
    .hover:underline:hover {
      text-decoration-line: underline;
    }
  }
`

export const CepInputWrapper = styled.div`
  width: 100px;
`

export const FullWidth = BaseStyles.FullWidth;
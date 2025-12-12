import styled from "styled-components";

export const Label = styled.span<{$color: string}>`
  position: relative;
  color: ${props => props.$color};
  background-color: ${props => props.theme.customColor};
  top: -16px;
  left: 8px;
  padding: 0 4px;
`

export const Wrapper = styled.div<{$color: string, $dashed?: boolean}>`
  position: sticky;
  width: 100%;
  height: 100%;
  max-height: 100%;
  border: solid 1px;
  border-radius: 6px;
  border-color: ${props => props.$color};
  border-style: ${props => props.$dashed ? "dashed" : "initial"};
`

export const ChildrenWrapper = styled.div<{$withLabel: boolean}>`
  position: relative;
  top: ${props => props.$withLabel ? "-12px" : "initial"};
`
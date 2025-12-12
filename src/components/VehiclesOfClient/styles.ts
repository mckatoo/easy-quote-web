import styled from "styled-components";
import colors from "../../colors";

export const Wrapper = styled.div`
  position: absolute;
  inset: 8px;
  background-color: ${colors.gray950};
  border-radius: 8px;
  padding: 12px;
  min-height: 384px;
  border-width: 2px;
  border-color: ${colors.white};
  gap: 8px;
  display: flex;
  flex-direction: column;
`

export const Title = styled.h1`
  color: ${colors.white};
  font-size: 18px;
  font-weight: 700;
  line-height: 1.555556;
  text-align: center;
`

export const FormWrapper = styled.div`
  & > div {
    border-width: 0;
  }
  & > span {
    right: 8px;
    top: 8px;
  }
`
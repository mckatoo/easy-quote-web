import styled from "styled-components";
import colors from "../../colors";

export const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.customColor};
  border-color: ${props => props.theme.customColor};
  border-style: solid;
  border-width: 4px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  font-size: 24px;
  height: 64px;
`

export const Main = styled.div`
  display: flex;
  gap: 24px;
  background-color: ${props => props.theme.customColor};
  padding: 16px;
  width: 100%;
  height: 435px;

  @media (width >= 640px) {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
`

export const ColorPicker = styled.div`
  position: relative;

  width: 170px;

  .react-colorful {
    height: 150px;
    width: 170px;
    margin-bottom: 4px;
  }
  input {
    background-color: #fff;
    color: #000;
    width: 170px;
    border-radius: 2px;
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const WrapperBackupContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

export const BackupContainer = styled.div`
  position: relative;
  height: calc(100% - 24px);
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-inline: 12px;
  padding-bottom: 12px;
`

export const AutoBackupWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;
  justify-content: space-between;
  align-items: center;

  & > div:first-child {
    width: 100%;
  }

  & > div:last-child {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`

export const BackupsPathAndQtd = styled.div`
  display: flex;
  gap: 8px;
`

export const PathBackup = styled.div`
  position: relative;
  width: 100%;

  button {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    cursor: pointer;
  }
`

export const QtdMaxStoredBackup = styled.div`
  min-width: 160px;
`

export const BackupListWrapper = styled.div`
  position: relative;
  border-radius: 8px;
  background-color: ${colors.gray700};
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`

export const UpdateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`

export const AutoUpdateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-inline: 12px;
  padding-bottom: 12px;
`

export const AutoUpdateInputs = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

export const UpdateInterval = styled.div`
  display: flex;

  & > div {
    width: 100%;
    justify-content: space-between;

    & > div {
      width: 167px;
    }

    & > label {
      text-align: right;
    }
  }
`

export const CompanyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-inline: 12px;
`

export const CompanyWrapperLine = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (width >= 48rem /* 768px */) {
    flex-direction: row;
  }
`

export const CEPWrapper = styled.div`
  width: 112px;
`

export const CityWrapper = styled.div`
  flex: 1;
`

export const UFWrapper = styled.div`
  width: 40px;
`

export const CompanyWrapperButtons = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  gap: 12px;
  height: 80px;

  @media (width >= 48rem /* 768px */) {
    flex-direction: row;
  }
`

export const ColorButtonWrapper = styled.div`
  display: flex;
  width: 64px;
  padding-top: 4px;
`

export const PhonesButtonWrapper = styled(ColorButtonWrapper)`
  width: 112px;
`

export const LogoButtonWrapper = styled(ColorButtonWrapper)`
  width: 80px;

  img {
    background-color: ${colors.blue600};
    border-radius: 8px;
    padding: 4px;
    cursor: pointer;

    &:hover {
      background-color: ${colors.blue700};
    }
  }
`

export const ColorPickerWrapper = styled.div`
  position: absolute;
  inset: 0;
  background-color: ${colors.gray950};
  border-radius: 8px;
  padding: 12px;
  margin-inline: 12px;
  border: 2px solid ${colors.white};
  gap: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    position: absolute;
    right: 8px;
    top: 4px;
    z-index: 20;
    color: ${colors.white};
    cursor: pointer;
  }
`

export const SaveAllSettingsButton = styled.div`
  margin-top: 12px;
`
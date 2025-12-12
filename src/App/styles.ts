import styled from "styled-components";

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  color: #FFF;
`

export const SidebarWrapper = styled.div`
  color: "#fff";
  display: flex;
  overflow: hidden;
  height: calc(100vh - 32px); // 32px is the height of the statusbar
`

export const MainWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const Main = styled.main`
  color: "#0f172b";
  margin-inline: auto;
  height: calc(100% - 64px);
  width: 100%;
  padding: 16px;
  overflow: auto;

  @media (width >= 48rem /* 768px */) {
    padding: 24px;
  }

  @media (width >= 96rem /* 1536px */) {
    padding: 40px;
  }
`

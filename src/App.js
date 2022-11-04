import React from "react";
import Routes from "./Routes";
import "antd/dist/antd.css";
import "./App.css";
import { theme } from "common/theme";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div
        id="myapp"
        style={{ height: "100%", overflow: "auto", background: "#eff3f6" }}
      >
        <Wrapper>
          <Routes />
        </Wrapper>
      </div>
    </ThemeProvider>
  );
}

export default App;

const Wrapper = styled.div`
  background: #f8f8f8;
  height: 100%;
`;
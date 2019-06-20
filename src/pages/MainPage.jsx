import React from "react";
import styled from "styled-components";

const MainPage = props => {
  return (
    <MainPageWrapper>
      <div>MainPage Component</div>
    </MainPageWrapper>
  );
};

const MainPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid green;
`;

export default MainPage;

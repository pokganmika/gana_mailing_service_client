import React, { useState } from "react";
import styled from "styled-components";

const TempUserSetting = props => {
  const [state, setState] = useState({
    email: "",
  });
  return (
    <SettingWrapper>
      <div>TempUserSetting Component</div>
    </SettingWrapper>
  );
};

const SettingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`;

export default TempUserSetting;

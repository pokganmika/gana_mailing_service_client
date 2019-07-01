import styled from "styled-components";
import { PageWrapper } from "./PageWrapper";

export const MailWrapper = styled(PageWrapper)`
  .email-input {
    margin-top: 0.7em;
    margin-bottom: 0.7em;
  }
  .mail-buttons {
    width: 100%;
    margin: 1em;
    display: flex;
    justify-content: flex-end;
  }

  .email-top {
    width: 100%;
    display: flex;
  }
  .email-top-inner {
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  .email-mid {
    width: 100%;
    display: flex;
  }
  .email-mid-inner {
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  .email-bottom {
    width: 100%;
    display: flex;
  }
  .email-bottom-inner {
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  .link-list {
    border-radius: 10px;
    margin: 0.5em;
    background-color: #f1f2f6;
    box-shadow: 0 0 20px -3px rgba(0, 0, 0, 0.2);
    width: 100%;
    display: flex;
    justify-content: space-between;
    div {
      width: 100%;
      font-weight: bold;
    }
  }
  .link-list-element {
    margin: 1em;
  }
  .list-card {
    font-weight: bold;
    border-radius: 10px;
    background-color: #dfe4ea;
    max-width: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1em;
  }
`;

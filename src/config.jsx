export default function() {
  switch (process.env.REACT_APP_NODE_ENV) {
    case "development":
      return { SERVER_URL: `http://localhost:8080` };
    case "production":
      return { SERVER_URL: `http://13.209.75.114` };
    default:
      return { SERVER_URL: `http://13.209.75.114` };
  }
}

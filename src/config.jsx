export default function() {
  switch (process.env.REACT_APP_NODE_ENV) {
    case "dev":
      return { SERVER_URL: `http://localhost` };
    case "prod":
      return { SERVER_URL: `` };
    default:
      return { SERVER_URL: `` };
  }
}

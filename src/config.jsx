export default function() {
  switch (process.env.NODE_ENV) {
    case "development":
      return { SERVER_URL: `http://localhost` };
    case "production":
      return { SERVER_URL: `http://13.209.75.114` };
    default:
      return { SERVER_URL: `http://13.209.75.114` };
  }
}

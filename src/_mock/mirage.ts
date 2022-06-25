import { createServer } from 'miragejs';
export function makeServer() {
  return createServer({
    routes() {
      this.urlPrefix = process.env.REACT_APP_API_URL_BACKEND || "https://test-react-mock.com";
      this.passthrough();
      this.timing = 1000
      this.get(
        '/user/:id',
        () => {
          return {
            id:1,
            name: "boss"
          }
        }
      );
    },
  });
}

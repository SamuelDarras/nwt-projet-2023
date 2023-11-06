export default {
  backend: {
    protocol: "http",
    url: "localhost",
    port: "3000",
    endpoints: {
      allSeries: "series",
      oneSerie: "series/:id",
    }
  }
}

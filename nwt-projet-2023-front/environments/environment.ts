export default {
  backend: {
    protocol: "http",
    url: "localhost",
    port: "3000",
    endpoints: {
      allSeries: "series",
      oneSerie: "series/:id",
      create: "series",
      update: "series/:id",
      delete: "series/:id",
      cover: "series/:id/cover",
      seen: "series/:id/seen",
    }
  }
}

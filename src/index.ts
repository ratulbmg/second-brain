import app from "./app";

const PORT = process.env.BACKEND_PORT || 3000;

app.listen(PORT, () => {
  console.log(`this app is lisining in http://localhost:${PORT}/`);
});

import { useState } from "react";
import "./App.css";
import ImageCarousel from "./components/ImageCarousel";
import Upload from "./components/Upload";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [flag, setFlag] = useState(false);

  return (
    <>
      <h1>React + Cloudinary</h1>
      <ImageCarousel flag={flag} />
      <Upload flag={flag} setFlag={setFlag} />
    </>
  );
}

export default App;

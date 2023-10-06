import { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";

export default function ImageCarousel({ flag }) {
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);

  const getImages = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/images");
      console.log(data);

      if (Array.isArray(data)) {
        setImages(data);
      } else {
        setError(data.msg);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching the images! :(");
    }
  };

  useEffect(() => {
    getImages();
  }, [flag]);

  console.log("STATE", images);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Carousel>
      {images
        ? images.map((image) => (
            <Carousel.Item key={image._id}>
              <img src={image.url} alt="image" className="w-100 img-fluid" />
              <Carousel.Caption>
                <h3>
                  {image.description ? image.description : "No description"}
                </h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))
        : null}
    </Carousel>
  );
}

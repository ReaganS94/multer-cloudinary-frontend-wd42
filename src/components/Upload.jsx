import { useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

export default function Upload({ flag, setFlag }) {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("picture", image, image.name);
      formData.append("desc", description);
      await axios.post("http://localhost:8080/api/upload", formData);
      setError(false);
      handleClose();
      setFlag(!flag);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  const fileData = () => {
    if (image) return <h5>{image.name}</h5>;
    return null;
  };

  return (
    <>
      <button className="btn btn-primary m-2" onClick={handleShow}>
        Upload
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="desc">description</label>

              <input
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                value={description}
                required
                id="desc"
              />
            </div>

            <div className="form-group">
              <div className="custom-file">
                <input
                  type="file"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="custom-file-input"
                />
                <label className="custom-file-label" htmlFor="image">
                  {image ? fileData() : "Choose file"}
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>

            {error ? (
              <div className="text-danger">
                An error occurred uploading the file
              </div>
            ) : null}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

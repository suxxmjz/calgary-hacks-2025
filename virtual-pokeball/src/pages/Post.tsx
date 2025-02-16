import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Card, InputGroup, FormControl, Image } from 'react-bootstrap';
import '../styles/post.css';
import { useUser } from "@clerk/clerk-react";

const PostPage: React.FC = () => {
  const { user } = useUser();
  const [encodedImage, setEncodedImage] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  });
  const [timestamp, setTimestamp] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }

    const formattedTimestamp = new Date().toISOString();
    setTimestamp(formattedTimestamp);

    if (videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error('Error accessing camera: ', err);
        });
    }
  }, []);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.target.value);
  };

  const handleCapture = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const photoUrl = canvasRef.current.toDataURL('image/png');
        setEncodedImage(photoUrl);
      }
    }
  };

  const handleSubmit = () => {
    const postData = {
      userId: user?.id,
      notes,
      encodedImage,
      timestamp,
      latitude: location.latitude,
      longitude: location.longitude,
    };
    console.log(postData);

    // Fetch API code would go here
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 px-3" style={{ paddingBottom: "80px",backgroundColor: "#b0d4b2" }}>
      <Card style={{ width: '100%', maxWidth: '500px', backgroundColor: "#2e7d32", color: "white" }} className="d-flex flex-column">
        <Card.Body className="flex-grow-1" style={{ overflowY: 'auto' }}>
          <h3 className="text-center mb-4">Create Post</h3>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Take Photo</Form.Label>
              <div className="d-flex justify-content-center mb-3">
                <video
                  ref={videoRef}
                  autoPlay
                  width="100%"
                  height="auto"
                  style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' , backgroundColor:'#E5E4E2'}}
                ></video>
              </div>
              <Button
                variant="secondary"
                className="w-100"
                onClick={handleCapture}
                style={{
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  padding: '12px',
                  backgroundColor: '#53b559',
                  borderColor: '2px solid #53b559',
                  color: 'white',
                }}
              >
                Capture Photo
              </Button>
              {encodedImage && (
                <div className="mt-3 d-flex justify-content-center">
                  <Image
                    src={encodedImage}
                    alt="Preview"
                    fluid
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: '10px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                </div>
              )}
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={notes}
                onChange={handleDescriptionChange}
                placeholder="Add a note..."
                style={{
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  
                }}
              />
            </Form.Group>

            <Form.Label className="field-label" style={{ color: "white" }}>Latitude & Longitude :</Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Latitude"
                value={location.latitude || ''}
                readOnly
                style={{
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#c5c6c7', 
                  cursor: 'not-allowed',
                  paddingRight:'-0px',
                }}
              />
              <FormControl
                placeholder="Longitude"
                value={location.longitude || ''}
                readOnly
                style={{
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#c5c6c7',
                  cursor: 'not-allowed'
                }}
              />
            </InputGroup>

            <Form.Label   className="field-label" style={{ fontFamily: 'sans-serif', color: 'white' }}>Timestamp :</Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Time Taken"
                value={timestamp}
                readOnly
                style={{
                  width: 'auto',
                  height: '30px',
                  borderRadius: '10px',
                
                  backgroundColor:'#c5c6c7',
                  cursor: 'not-allowed',
                  padding: '5px',
                  paddingLeft: '0px',
                  paddingRight:'0px',
                  
                 
                }}
              />
            </InputGroup>
          </Form>
          <Button
            variant="primary"
            className="w-100 btn-sm fw-bold mt-3"
            onClick={handleSubmit}
            style={{
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              padding: '10px 15px' ,
              backgroundColor: '#53b559', 
              borderColor: '#53b559', 
              marginTop: '20px',
              width: 'auto',
            }}
          >
            Submit Post
          </Button>
        </Card.Body>
      </Card>
      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
    </div>
  );
};

export default PostPage;
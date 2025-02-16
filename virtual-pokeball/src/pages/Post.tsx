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
  const [isFrontCamera, setIsFrontCamera] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const initCamera = async (facingMode: 'user' | 'environment') => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
        }
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera: ', err);
    }
  };

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

    initCamera('user');

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.target.value);
  };

  const toggleCamera = () => {
    setIsFrontCamera(!isFrontCamera);
    initCamera(isFrontCamera ? 'environment' : 'user');
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
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 px-3" style={{ paddingBottom: "80px", border: "none" }}>
      <Card style={{ width: '100%', maxWidth: '500px', color: "white", border: "none" }} className="d-flex flex-column">
        <Card.Body className="flex-grow-1" style={{ overflowY: 'auto' }}>
          <h3 className="text-center mb-4" style={{ color: 'black' }}>Create Post</h3>
          <Form>
            <Form.Group controlId="formFile" className="mb-2">
              <div className="position-relative">
                <div className="d-flex justify-content-center mb-2">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    width="100%"
                    height="auto"
                    style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                  ></video>
                  <Button
                    variant="light"
                    onClick={toggleCamera}
                    className="position-absolute"
                    style={{
                      top: '10px',
                      right: '10px',
                      borderRadius: '50%',
                      padding: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    ↺
                  </Button>
                </div>
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
                  borderColor: '2px',
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
                      height: '100%',
                      borderRadius: '10px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                </div>
              )}
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label style={{ color: '#555', fontWeight: '500', fontFamily: 'Poppins, sans-serif' }}>Description</Form.Label>
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

            <Form.Label className="field-label">Latitude & Longitude:</Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Latitude"
                value={location.latitude || ''}
                readOnly
                style={{
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#f0f0f0',
                  cursor: 'not-allowed',
                }}
              />
              <FormControl
                placeholder="Longitude"
                value={location.longitude || ''}
                readOnly
                style={{
                  marginLeft: '20px',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#f0f0f0',
                  cursor: 'not-allowed'
                }}
              />
            </InputGroup>

            <Form.Label className="field-label">Timestamp:</Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Time Taken"
                value={timestamp}
                readOnly
                style={{
                  width: 'auto',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: '#f0f0f0',
                  cursor: 'not-allowed',
                  padding: '5px',
                }}
              />
            </InputGroup>
          </Form>
          <Button
            variant="primary"
            className="w-100 btn-sm fw-bold mt-3"
            onClick={handleSubmit}
            disabled={!encodedImage}
            style={{
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              padding: '10px 15px',
              backgroundColor: '#53b559',
              borderColor: '#53b559',
              marginTop: '20px',
              width: 'auto',
              opacity: encodedImage ? 1 : 0.6,
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

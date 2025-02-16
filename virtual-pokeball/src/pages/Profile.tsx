import React from "react";
import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { Card, Button, Container, Row, Col, Image } from "react-bootstrap";

interface Post {
  id: number;
  userId: number;
  animal: string;
  notes: string;
  conservationNotes: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  upvotes: number;
}

const Profile: React.FC = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [posts, setPosts] = useState<Post[] | null>(null); // State can be an array or null initially
  const userGetPostURL = "http://localhost:4000/api/posts/" + user?.id;

  const getPosts = () => {
    fetch(userGetPostURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // parse JSON if the response is successful
      })
      .then((data) => {
        if (data.code === 200) {
          setPosts(data.data); // Only set posts if the response code is 200
        } else {
          console.error("Error: ", data.message); // Handle error if code is not 200
        }
      })
      .catch((error) => {
        console.error("Fetch error: ", error); // Handle any fetch errors (network issues, etc.)
      });
  };

  useEffect(() => {
    getPosts();

    // Fetch posts when component mounts
  }, [user]);

  const handleLogout = () => {
    signOut();
  };
  return (
    <div style={{ paddingBottom: "80px", backgroundColor: "#b0d4b2" }}>
      <Container className="py-4">
        <Card className="text-center p-3 mb-4 shadow-sm">
          <Image
            src={user?.imageUrl || "😊"}
            roundedCircle
            className="mx-auto mb-2"
            width={100}
            height={100}
          />
          <h4>{user?.fullName || "Username"}</h4>
          <p className="text-muted">
            {user?.primaryEmailAddress?.emailAddress || "Email"}
          </p>
        </Card>
        <Button variant="danger" onClick={handleLogout} className="mb-4">
          Log Out
        </Button>

        <h5 className="mb-3">Recent Posts</h5>
        <Row>
          {posts ? (
            posts.map((post, index) => (
              <Col md={6} key={index} className="mb-3">
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title>{post.animal}</Card.Title>
                    <Card.Text>{post.conservationNotes}</Card.Text>
                    <Card.Img variant="top" src={post.imageUrl} />
                    <Card.Footer className="text-muted">
                      {post.createdAt}
                    </Card.Footer>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>Loading posts...</p> // Show loading message when posts is null
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Profile;

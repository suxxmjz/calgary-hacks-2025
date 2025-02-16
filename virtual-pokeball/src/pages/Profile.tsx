import React from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { Card, Button, Container, Row, Col, Image } from "react-bootstrap";

interface Post {
  title: string;
  description: string;
  time: string;
}

const dummyPosts: Post[] = Array.from({ length: 5 }, (_, index) => ({
  title: `Post ${index + 1}`,
  description: `This is a dynamically generated post ${index + 1}.`,
  time: `${index * 10 + 5}m ago`,
}));

const Profile: React.FC = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

const handleLogout = () => {
    signOut();
  };
  return (
    <Container className="py-4" style={{ backgroundColor:"#9fc99f",padding:'20px', borderRadius:'10px' }} >
      <Card className="text-center p-3 mb-4 shadow-sm "  >
        <Image
          src={user?.imageUrl || "😊"}
          roundedCircle
          className="mx-auto mb-2"
          width={100}
          height={100}
        />
        <h4>{user?.fullName || user?.username || "Username"}</h4>
        <p className="text-muted">{user?.primaryEmailAddress?.emailAddress || "Email"}</p>
      </Card>
      <Button variant="danger" onClick={handleLogout} className="mb-4">
        Log Out
      </Button>

      <h5 className="mb-3">Recent Posts</h5>
      <Row>
        {dummyPosts.map((post, index) => (
          <Col md={6} key={index} className="mb-3">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.description}</Card.Text>
                <Card.Footer className="text-muted">{post.time}</Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Profile;

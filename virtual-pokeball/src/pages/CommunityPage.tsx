import React, { useEffect } from "react";
import '../styles/community-page.css';
import { useState } from "react";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import { ImageListItem } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import IconButton from '@mui/material/IconButton';
import ReactPullToRefresh from "react-pull-to-refresh";

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

  
const CommunityPage: React.FC = () => {
  const [posts, setPosts] = useState<Post [] | null>(null);  // State can be an array or null initially
  const [upvoted, setUpvoted] = useState(false); // State to trigger re-fetch after upvote

  const getPostURL = 'http://localhost:4000/api/posts/';
  const upvotesURL = 'http://localhost:4000/api/posts/vote';
  
  useEffect(() => {
    console.log('Upvote');
    fetch(getPostURL,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // parse JSON if the response is successful
      })
      .then((data) => {
        if (data.code === 200) {
          setPosts(data.data); // Only set posts if the response code is 200
        } else {
          console.error('Error: ', data.message); // Handle error if code is not 200
        }
      })
      
      .catch((error) => {
        console.error('Fetch error: ', error); // Handle any fetch errors (network issues, etc.)
      });
  }, [upvoted]);


  const doUpvote = (id:number, userID: number) => {
    fetch(upvotesURL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id : id , userId: userID }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response)
        return response.json(); // parse JSON if the response is successful
      })
      .then(() => {
        setUpvoted(!upvoted); // Toggle the upvoted state to trigger the useEffect
      })
      .catch((error) => {
        console.error('Upvote error: ', error); // Handle any upvote errors
      });
  }
  // Simulate a 1-second delay
  const doNothing = (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();  // resolves to void
      }, 1000);
    });
  };

  // Ensure posts is not null before mapping
  return (
    <ReactPullToRefresh onRefresh={doNothing} className="community-page">
      {posts ? (
        posts.map((post) => (
          <Card key={post.id} className="post-card">
            <div className="post-header">
              <div className="post-username">
                <Typography variant="h6">{post.userId}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {new Date(post.createdAt).toLocaleString()}
                </Typography>
              </div>
            </div>
            <CardContent className="post-content">
              <ImageListItem>
                <img src={post.imageUrl} alt="Post image" className="post-image" />
              </ImageListItem>
              <Typography variant="body1" color="textPrimary" className="post-description">
                {post.notes}
              </Typography>
            </CardContent>
            <IconButton className="upvote-button" onClick={() => doUpvote(post.id, post.userId)}>
              <div className="upvote-count">
                {post.upvotes} <ArrowUpwardIcon />
              </div>
            </IconButton>
          </Card>
        ))
      ) : (
        <p>Loading posts...</p>  // Show loading message when posts is null
      )}
    </ReactPullToRefresh>
  );
};


export default CommunityPage;
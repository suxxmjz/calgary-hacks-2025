import React from "react";
import '../styles/community-page.css';
import { useState } from "react";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import { ImageListItem } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import IconButton from '@mui/material/IconButton';
import ReactPullToRefresh from "react-pull-to-refresh";

const dummyPosts = [
    {
      id: 1,
      username: "Bear McGraw",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      image: "https://via.placeholder.com/400/000000/FFFFFF?text=Bear", 
      description: "Just had a big fish for dinner! 🐟🐻",
      count: 5,
    },
    {
      id: 2,
      username: "Eagle Eye",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      image: "https://via.placeholder.com/400/4CAF50/FFFFFF?text=Eagle", 
      description: "Soaring high above the mountains! 🦅⛰️",
      count: 12,
    },
    {
      id: 3,
      username: "Lion King",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      image: "https://via.placeholder.com/400/FF5733/FFFFFF?text=Lion",
      description: "The savannah is my kingdom! 🦁👑",
      count: 8,
    },
    {
      id: 4,
      username: "Penguin Pete",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
      image: "https://via.placeholder.com/400/2980B9/FFFFFF?text=Penguin",
      description: "Just slid down the ice hill! ❄️🐧",
      count: 3,
    },
    {
      id: 5,
      username: "Elephant Ellie",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      image: "https://via.placeholder.com/400/9B59B6/FFFFFF?text=Elephant",
      description: "Taking a relaxing bath in the river. 🐘💦",
      count: 15,
    },
    {
      id: 6,
      username: "Giraffe Gerald",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 15), // 15 hours ago
      image: "https://via.placeholder.com/400/F39C12/FFFFFF?text=Giraffe",
      description: "Reached the top of the tallest tree! 🌳🦒",
      count: 7,
    },
    {
      id: 7,
      username: "Cheetah Chase",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18), // 18 hours ago
      image: "https://via.placeholder.com/400/E74C3C/FFFFFF?text=Cheetah",
      description: "Raced across the plains at full speed! 🏃‍♂️💨",
      count: 20,
    },
    {
      id: 8,
      username: "Kangaroo Kourtney",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      image: "https://via.placeholder.com/400/1ABC9C/FFFFFF?text=Kangaroo",
      description: "Bounced through the outback all day! 🦘🌾",
      count: 10,
    },
    {
      id: 9,
      username: "Panda Poppy",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30), // 30 hours ago
      image: "https://via.placeholder.com/400/2C3E50/FFFFFF?text=Panda",
      description: "Enjoying some bamboo in peace. 🎋🐼",
      count: 6,
    },
    {
      id: 10,
      username: "Zebra Zane",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      image: "https://via.placeholder.com/400/BDC3C7/FFFFFF?text=Zebra",
      description: "Blending in with the herd. 🦓🌿",
      count: 14,
    },
  ];
  

  
const CommunityPage:React.FC = () => {
    const [posts, setPosts] = useState(dummyPosts);  // Store posts with count in state

    const increaseCount = (id:number): void => {
        setPosts(prevPosts => 
        prevPosts.map(post => 
            post.id === id ? { ...post, count: post.count + 1 } : post
        )
        );
    };

    const doNothing = (): Promise<void> => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();  // resolves to void
          }, 1000); // Simulate a 1-second delay
        });
      };

    return (
        <ReactPullToRefresh onRefresh={doNothing} className="community-page">
        {posts.map((post) => (
            <Card key={post.id} className="post-card">
            <div className="post-header">
                <div className="post-username">
                <Typography variant="h6">{post.username}</Typography>
                <Typography variant="body2" color="textSecondary">{post.timestamp.toLocaleString()}</Typography>
                </div>
            </div>
            <CardContent className="post-content">
                <ImageListItem>
                <img src={post.image} alt="Post image" className="post-image" />
                </ImageListItem>
                <Typography variant="body1" color="textPrimary" className="post-description">
                {post.description}
                </Typography>
            </CardContent>
            <IconButton className="upvote-button" onClick={() => increaseCount(post.id)}>
                <div className="upvote-count">
                {post.count} <ArrowUpwardIcon />
                </div>
            </IconButton>
            </Card>
        ))}
        </ReactPullToRefresh>
    );
};

export default CommunityPage;
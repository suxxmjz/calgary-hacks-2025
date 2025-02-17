import React, { useEffect , useState} from "react";
import "../styles/community-page.css";
import { Card, CardContent, Typography } from "@mui/material";
import { ImageListItem } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import IconButton from "@mui/material/IconButton";
import ReactPullToRefresh from "react-pull-to-refresh";


import { BASE_API_URL } from "../App"; 
import {Post} from "../types/postTypes";
import { useGetFetch } from "../hooks/useFetch";




const CommunityPage: React.FC = () => {
  // const [posts, setPosts] = useState<Post[] | null>(null); // State can be an array or null initially
  const [upvoted, setUpvoted] = useState(false); // State to trigger re-fetch after upvote

  const getPostURL = `${BASE_API_URL}/posts/`;
  const upvotesURL = `${BASE_API_URL}/posts/vote`;

  const {data, error} = useGetFetch<Post[] >(getPostURL);


  useEffect(() => {
    console.log("Upvote");
    fetch(getPostURL, {
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
  }, [upvoted]);

  const doUpvote = (id: number, userID: number) => {
    fetch(upvotesURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, userId: userID, operation: "increment" }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log(response);
        return response.json(); // parse JSON if the response is successful
      })
      .then(() => {
        setUpvoted(!upvoted); // Toggle the upvoted state to trigger the useEffect
      })
      .catch((error) => {
        console.error("Upvote error: ", error); // Handle any upvote errors
      });
  };
  // Simulate a 1-second delay
  const doNothing = (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(); // resolves to void
      }, 1000);
    });
  };

  // Ensure posts is not null before mapping
  return (
    <ReactPullToRefresh onRefresh={doNothing} className="community-page">
      {data ? (
        data.map((data) => (
          <Card key={data.id} className="post-card">
            <div className="post-header">
              <div className="post-username">
                <Typography variant="h6">{data.userId}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {new Date(data.createdAt).toLocaleString()}
                </Typography>
              </div>
            </div>
            <CardContent className="post-content">
              <ImageListItem>
                <img
                  src={data.imageUrl}
                  alt="Post image"
                  className="post-image"
                />
              </ImageListItem>
              <Typography
                variant="body1"
                color="textPrimary"
                className="post-description"
              >
                {data.notes}
              </Typography>
            </CardContent>
            <IconButton
              className="upvote-button"
              onClick={() => doUpvote(data.id, data.userId)}
            >
              <div className="upvote-count">
                {data.upvotes} <ArrowUpwardIcon />
              </div>
            </IconButton>
          </Card>
        ))
      ) : (
        <p>Loading posts...</p> // Show loading message when posts is null
      )}
    </ReactPullToRefresh>
  );
};

export default CommunityPage;

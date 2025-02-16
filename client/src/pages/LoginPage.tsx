import React from "react";
import { Button } from "react-bootstrap";
import { SignIn } from "@clerk/clerk-react";
import logo from "../assets/logo.png";

const LoginPage: React.FC = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "100px",
      }}
    >
      <div
        className="text-center"
        style={{
          width: "100%",
          maxWidth: "320px",
          padding: "20px",
        }}
      >
        <img
          src={logo}
          alt="App Logo"
          className="mb-4"
          style={{
            maxWidth: "150px",
            width: "100%",
            objectFit: "contain",
          }}
        />
        <h1 className="mb-3" style={{ fontSize: "24px" }}>
          Welcome to WildDex
        </h1>
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        <Button
          variant="success"
          size="lg"
          onClick={() => (window.location.href = "/sign-in")}
          style={{
            width: "100%",
            maxWidth: "300px",
            borderRadius: "8px",
          }}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;

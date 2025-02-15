import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env.local file');
}
// const clerkFrontendApi = 'YOUR_FRONTEND_API';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY} frontendApi={clerkFrontendApi}> */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </BrowserRouter>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";
import { StyleSheetManager } from "styled-components";

ReactDOM.createRoot(document.getElementById("root")).render(
  // ADDED BECAUSE OF VARIATION WARNING FROM BUTTON COMPONENT
  //  <StyleSheetManager shouldForwardProp={(prop) => prop !== 'variation'}> {/* Your application components */} </StyleSheetManager>

  <React.StrictMode>
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "variation"}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.replace("/")}
      >
        <App />
      </ErrorBoundary>
    </StyleSheetManager>
  </React.StrictMode>
);

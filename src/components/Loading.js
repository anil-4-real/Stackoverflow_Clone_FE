import React from "react";
import CircularProgress from "react-cssfx-loading/lib/CircularProgress";

function Loading() {
  return (
    <div className="loading-container">
      <CircularProgress height="100px" width="100px" color="orange" />
    </div>
  );
}

export default Loading;

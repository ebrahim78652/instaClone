import React, { useEffect } from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      //add some image here later
      return (
        <>
          <div className="error">
            <div>
              <h1>Something went wrong.</h1>;
              <img
                src="https://image.shutterstock.com/image-vector/vector-attention-sign-exclamation-mark-260nw-1716143401.jpg"
                alt=""
              />
            </div>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}

import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

const LoadingOverlay = function ({ isLoading }) {
  return (
    <Container
      fluid
      className={
        isLoading
          ? "h-100 position-fixed z-3 bg-dark d-flex align-items-center justify-content-center"
          : "h-100 position-fixed z-3 bg-dark d-flex align-items-center justify-content-center spinner-fade-out"
      }
    >
      {" "}
      <Spinner
        animation="border"
        role="status"
        style={{ color: "rgba(149, 63, 168, 1)" }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
};

export default LoadingOverlay;

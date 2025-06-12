import { Link } from "react-router-dom";

function RouteNotFound({ type = "route" }) {
  let message;
  if (type === "article") {
    message = (
      <>
        <h1 className="text-3xl font-bold mb-4">Article not found</h1>
        <p>
          The article you are looking for doesn't exist. Navigate back to
          <Link to="/" className="text-blue-500">
            {" "}
            home page
          </Link>
          .
        </p>
      </>
    );
  } else if (type === "topic") {
    message = (
      <>
        <h1 className="text-3xl font-bold mb-4">Topic not found</h1>
        <p>
          The topic you are looking for doesn't exist. Navigate back to
          <Link to="/" className="text-blue-500">
            {" "}
            home page
          </Link>
          .
        </p>
      </>
    );
  } else {
    message = (
      <>
        <h1 className="text-3xl font-bold mb-4">Page not found</h1>
        <p>
          The page you are looking for doesn't exist. Navigate back to
          <Link to="/" className="text-blue-500">
            {" "}
            home page
          </Link>
          .
        </p>
      </>
    );
  }

  return <div className="text-center mt-10">{message}</div>;
}

export default RouteNotFound;

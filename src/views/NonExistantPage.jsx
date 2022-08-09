import { Link } from "react-router-dom";

const NonExistantPage = () => {
  return (
    <article style={{ padding: "100px" }}>
      <h1>Oops!</h1>
      <p>Page Not Found</p>
      <div className="flexGrow">
        <Link to="/">Visit Our Login Page</Link>
      </div>
    </article>
  );
};

export default NonExistantPage;

import React from "react";
import { Link } from "react-router-dom";

function ListLink() {
  const UlContainer = ({ children }) => (
    <ul className="pl-4 text-blue-200 underline">{children}</ul>
  );

  const LiLink = ({ text, link }) => (
    <li className="mb-2">
      <Link to={link} target="_blank">
        {text}
      </Link>
    </li>
  );
  return { UlContainer, LiLink };
}
export default ListLink;

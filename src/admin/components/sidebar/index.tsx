import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

export default function Sidebar() {
  let { path, url } = useRouteMatch();
  return (
    <div className="w-64 bg-gray-400 h-full">
      <Link to={url}>
        <div className="p-4 hover:bg-gray-200">
          <span>Home</span>
        </div>
      </Link>
      <Link to={`${url}/posts`}>
        <div className="p-4 hover:bg-gray-200">
          <span>Posts</span>
        </div>
      </Link>
    </div>
  );
}

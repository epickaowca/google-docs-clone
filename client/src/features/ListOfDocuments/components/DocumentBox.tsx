import { FC } from "react";
import { Link } from "react-router-dom";

type DocumentBoxProps = {
  content: string;
  activeUsers: number;
  link: string;
};

export const DocumentBox: FC<DocumentBoxProps> = ({
  activeUsers,
  content,
  link,
}) => {
  return (
    <Link to={link}>
      <div className="list-doc">
        <h1>{content}</h1>
        <span>{activeUsers}</span>
      </div>
    </Link>
  );
};

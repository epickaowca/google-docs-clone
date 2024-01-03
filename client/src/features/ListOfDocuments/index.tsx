import { FC, useEffect } from "react";
import { socket } from "../../socket";
import "./assets/styles.css";
import { DocumentBox } from "./components/DocumentBox";

export const ListOfDocuments: FC = () => {
  useEffect(function onUserCountChange() {
    const handler = (props: any) => {
      console.log(props);
    };

    socket.on("user-count", handler);

    return () => {
      socket.off("user-count", handler);
    };
  }, []);
  return (
    <div className="list-container">
      <h1>List of documents</h1>
      <p>
        You can click on document to join conversation with others, number in
        right bottom corner indicates amount of active users
      </p>
      <hr></hr>
      <div className="list-doc-container">
        <DocumentBox activeUsers={14} content="Document 1" />
        <DocumentBox activeUsers={0} content="Document 2" />
        <DocumentBox activeUsers={4} content="Document 3" />
      </div>
    </div>
  );
};

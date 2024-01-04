import { FC, useEffect, useState } from "react";
import { socket } from "../../socket";
import "./assets/styles.css";
import { DocumentBox } from "./components/DocumentBox";

export const ListOfDocuments: FC = () => {
  const [userCount, setUserCount] = useState({
    doc1: 0,
    doc2: 0,
    doc3: 0,
  });

  useEffect(function onUserCountChange() {
    const handler = (props: any) => {
      setUserCount(props);
    };

    socket.on("user-count", handler);
    socket.emit("back-to-docs-list");
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
      <main className="list-doc-container">
        <DocumentBox
          activeUsers={userCount.doc1}
          content="Document 1"
          link={"/document/doc1"}
        />
        <DocumentBox
          activeUsers={userCount.doc2}
          content="Document 2"
          link={"/document/doc2"}
        />
        <DocumentBox
          activeUsers={userCount.doc3}
          content="Document 3"
          link={"/document/doc3"}
        />
      </main>
    </div>
  );
};

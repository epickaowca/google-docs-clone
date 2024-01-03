import { FC, useCallback, useEffect, useState } from "react";
import Quill from "quill";
import { Sources } from "quill";
import "quill/dist/quill.snow.css";
import { Socket } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { socket as s } from "../../socket";
import "./assets/styles.css";

const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

export const TextEditor: FC = () => {
  const { pathname } = useLocation();
  const [socket, setSocket] = useState<Socket>();
  const [quill, setQuill] = useState<Quill>();
  const documentId = pathname.split("/").slice(-1)[0];

  useEffect(function initializeSocketIo() {
    setSocket(s);

    return () => {
      s?.emit("unsubscribe", documentId);
    };
  }, []);

  const wrapperRef = useCallback(function initializeQuill(
    wrapper: HTMLDivElement
  ) {
    if (wrapper == null) return;
    wrapper.innerHTML = "";

    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  },
  []);

  useEffect(
    function onQuillReceived() {
      if (socket == null || quill == null) return;
      const handler = (delta: any) => {
        quill?.updateContents(delta);
      };

      socket?.on("receive-changes", handler);
      return () => {
        socket?.off("receive-changes", handler);
      };
    },
    [socket, quill]
  );

  useEffect(
    function onQuillSend() {
      if (socket == null || quill == null) return;
      const handler = (delta: any, oldDelta: any, source: Sources) => {
        if (source !== "user") return;
        socket?.emit("send-changes", delta);
      };

      quill?.on("text-change", handler);
      return () => {
        quill?.off("text-change", handler);
      };
    },
    [socket, quill]
  );

  useEffect(
    function onDocumentLoad() {
      if (socket == null || quill == null) return;

      socket.once("load-document", (document) => {
        quill.setContents(document);
        quill.enable();
      });

      socket.emit("get-document", documentId);
    },
    [socket, quill, pathname]
  );

  useEffect(
    function onDocumentSave() {
      if (socket == null || quill == null) return;

      const interval = setInterval(() => {
        socket.emit("save-document", quill.getContents());
      }, SAVE_INTERVAL_MS);

      return () => {
        clearInterval(interval);
      };
    },
    [socket, quill]
  );

  return <div className="container" ref={wrapperRef}></div>;
};

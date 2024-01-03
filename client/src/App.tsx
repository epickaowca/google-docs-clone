import { FC } from "react";
import { TextEditor } from "./features/TextEditor";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage";
import { ListOfDocuments } from "./features/ListOfDocuments";
import "./assets/styles.css";

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListOfDocuments />}></Route>
        <Route path="/document/:id" element={<TextEditor />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </Router>
  );
};

export default App;

import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DocsLayout from "./components/DocsLayout";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import NotePage from "./pages/NotePage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/course/*"
          element={
            <DocsLayout>
              <CoursePage />
            </DocsLayout>
          }
        />
        <Route
          path="/note/*"
          element={
            <DocsLayout>
              <NotePage />
            </DocsLayout>
          }
        />
      </Routes>
    </Layout>
  );
}

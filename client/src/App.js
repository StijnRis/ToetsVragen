import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/Search";
import HomePage from "./pages/Home";
import QuestionPage from "./pages/question/Question";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/questions/:id" element={<QuestionPage />} />
                <Route path="/search" element={<SearchPage />} />
            </Routes>
        </BrowserRouter>
    );
}

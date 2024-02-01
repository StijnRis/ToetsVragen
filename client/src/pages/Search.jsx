import React, { useState } from "react";
import Navbar from "../components/NavBar/NavBar";
import QuestionGrid from "../components/QuestionGrid/QuestionGrid";
import Search from "../components/Search/Search";

export default function SearchPage() {
    const [questions, setQuestions] = useState([]);

    return (
        <>
            <Navbar></Navbar>
            <main>
                <h1 id="title">Search</h1>
                <div className="layout">
                    <Search onSearch={setQuestions} />
                </div>

                <div className="layout" id="results-container">
                    <QuestionGrid questions={questions}></QuestionGrid>
                </div>
            </main>
        </>
    );
}

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/NavBar/NavBar";
import QuestionGrid from "../../components/QuestionGrid/QuestionGrid";
import Search from "../../components/Search/Search";
import { api } from "../../utils/useApi";
import styles from "./styles.module.css";

export default function SearchPage(props) {
    const { text } = useParams();
    const [questions, setQuestions] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        api.get("/api/questions/", { text: text }).then((data) => {
            setQuestions(data);
        });
    }, [text]);

    function search(text) {
        navigate("" + text);
    }

    return (
        <>
            <Navbar></Navbar>
            <main>
                <h1 id={styles.title}>Search</h1>
                <div className="layout">
                    <Search onSearch={search} />
                </div>

                <div className="layout" id="results-container">
                    <QuestionGrid questions={questions}></QuestionGrid>
                </div>
            </main>
        </>
    );
}

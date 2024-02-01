import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../utils/useApi";
import Navbar from "../components/NavBar/NavBar";

export default function QuestionPage() {
    const { id } = useParams();
    const [question, setQuestion] = useState({
        id: -1,
        exam_id: -1,
        exam_page_numer: -1,
        question_number: -1,
        question: "",
        context: "",
    });

    useEffect(() => {
        api.get("/api/questions/" + id).then((data) => {
            setQuestion(data);
        });
    }, []);

    return (
        <>
            <Navbar></Navbar>
            <main>
                <h1>Question</h1>
                <p>{question.question}</p>
            </main>
        </>
    );
}

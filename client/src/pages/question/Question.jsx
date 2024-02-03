import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/NavBar/NavBar";
import { api } from "../../utils/useApi";
import styles from "./styles.module.css";

export default function QuestionPage() {
    const { id } = useParams();
    const [question, setQuestion] = useState({
        id: -1,
        exam_id: -1,
        exam_page_number: -1,
        question_number: -1,
        question: "",
        context: "",
    });
    const [exam, setExam] = useState({
        id: -1,
        url: -1,
        level: -1,
        year: -1,
        version: "",
        file_path: "",
    });

    useEffect(() => {
        api.get("/api/questions/" + id).then((data) => {
            setQuestion(data);
        });
    }, []);

    useEffect(() => {
        if (question.exam_id != -1) {
            api.get("/api/exams/" + question.exam_id).then((data) => {
                setExam(data);
            });
        }
    }, [question.exam_id]);

    return (
        <>
            <Navbar></Navbar>
            <main>
                <h1>Vraag</h1>
                <p>
                    {exam.level}, {exam.year} versie {exam.version}
                </p>
                <p>
                    Vraag {question.question_number} op pagina{" "}
                    {question.exam_page_number}
                </p>
                <div className={styles.pdfContainer}>
                    <object
                        className={styles.pdf}
                        type="application/pdf"
                        data={
                            new URL(
                                exam.file_path,
                                process.env.REACT_APP_BASE_API_URL
                            ) +
                            "#page=" +
                            question.exam_page_number
                        }
                    ></object>
                </div>
                <p>{question.context}</p>
                <p>{question.question}</p>
            </main>
        </>
    );
}

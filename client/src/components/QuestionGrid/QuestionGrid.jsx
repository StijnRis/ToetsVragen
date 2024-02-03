import React, { useEffect, useState } from "react";
import { api } from "../../utils/useApi";
import styles from "./styles.module.css";

function QuestionGrid(props) {
    return (
        <div className={styles.gridContainer}>
            <div className={styles.grid}>
                {props.questions.map((question) => (
                    <Question
                        question={question.question}
                        id={question.id}
                        exam_id={question.exam_id}
                    />
                ))}
            </div>
        </div>
    );
}

function Question(props) {
    const [ exam, setExam ] = useState({});
    useEffect(() => {
        api.get("/api/exams/" + props.exam_id).then((data) => {
            setExam(data);
        });
    }, [props.exam_id]);
    return (
        <a href={`/questions/${props.id}`} className={styles.link}>
            <div className={styles.box}>
                <h3 className={styles.question}>{props.question}</h3>
                <p className={styles.info}>
                    {exam.level}, {exam.year} {exam.version}e tijdvak
                </p>
            </div>
        </a>
    );
}

export default QuestionGrid;

import React from "react";
import styles from "./styles.module.css";

function QuestionGrid(props) {
    return (
        <div className={styles.gridContainer}>
            <div className={styles.grid}>
                {props.questions.map((question) => (
                    <Question question={question.question} id={question.id} />
                ))}
            </div>
        </div>
    );
}

function Question(props) {
    return (
        <a href={`/questions/${props.id}`} className={styles.link}>
            <div className={styles.box}>
                <h3 className={styles.question}>{props.question}</h3>
                <p className={styles.info}>
                    {props.level}, {props.year} {props.version}e tijdvak
                </p>
            </div>
        </a>
    );
}

export default QuestionGrid;

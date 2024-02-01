import React from "react";
import styles from "./styles.module.css";
import Question from "../Question/Question";

function QuestionGrid(props) {
    return (
        <div className={styles.questionGrid}>
            {props.questions.map((question) => (
                <Question question={question.question} id={question.id} />
            ))}
        </div>
    );
}

export default QuestionGrid;

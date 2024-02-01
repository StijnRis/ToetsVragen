import React from "react";
import styles from "./styles.module.css";

function Question(props) {
    console.log(props)
    return (
        <a href={`questions/${props.id}`} className={styles.link}>
            <div className={styles.box}>
                <h3 className={styles.question}>{props.question}</h3>
                <p className={styles.answer}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sapiente asperiores error beatae totam voluptas ipsam minima
                    molestias officiis, sequi sit.
                </p>
            </div>
        </a>
    );
}

export default Question;

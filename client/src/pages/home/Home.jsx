import React from "react";
import styles from "./styles.module.css";
import Navbar from "../../components/NavBar/NavBar";

export default function HomePage() {
    return (
        <>
            <Navbar></Navbar>
            <main>
                <h1 class={styles.title}>Welcome this website!</h1>
            </main>
        </>
    );
}

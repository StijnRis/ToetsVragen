import React, { useState } from "react";
import { api } from "../../utils/useApi";
import styles from "./styles.module.css";

function Search(props) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        api.get("/questions/", { text: query }).then((data) => {
            props.onSearch(data);
        });
    };

    return (
        <form className={styles.box} onSubmit={handleSubmit}>
            <input
                className={styles.bar}
                type="text"
                placeholder="Search"
                name="search"
                id="search"
                onChange={(e) => setQuery(e.target.value)}
            />
            <input className={styles.submit} type="submit" value="Search" />
        </form>
    );
}

export default Search;

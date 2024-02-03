import React, { useState } from "react";
import styles from "./styles.module.css";

function Search(props) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSearch("/search/"+query);
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

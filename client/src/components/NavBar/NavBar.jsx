import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Navbar = () => {
    const [activeItem, setActiveItem] = useState("home");

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <nav className={styles.nav}>
            <div className={styles.navItem}
                // className={[
                //     styles.navItem,
                //     // activeItem === "home" ? styles.navActive : "",
                // ]}
            >
                <Link to="/" onClick={() => handleItemClick("home")} className={styles.navLink}>
                    Home
                </Link>
            </div>
            <div
                className={[
                    styles.navItem,
                    activeItem === "search" ? styles.navActive : "",
                ]}
            >
                <Link to="/search" onClick={() => handleItemClick("movies")} className={styles.navLink}>
                    Search
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;

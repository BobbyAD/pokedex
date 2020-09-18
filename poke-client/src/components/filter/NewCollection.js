import React, { useState } from "react";
import { createCollection, getCollections } from "../../auth/authorization";

import styles from "../../styles/newCollection.module.scss";

const NewCollection = ({ submitCollection, togglePicking }) => {
    const [collectionValue, setCollectionValue] = useState("");

    const handleCollectionValue = (e) => {
        setCollectionValue(e.target.value);
    };

    const addCollection = (e) => {
        e.preventDefault();
        const name = collectionValue;
        submitCollection(name);
        setCollectionValue("");
    };

    return (
        <div className={styles.container}>
            <h3>Add a Collection!</h3>
            <div className={styles.bottom}>
                <button onClick={togglePicking} className={styles.pickButton}>
                    Pick some Pokemon!
                </button>

                <form onSubmit={addCollection} className={styles.form}>
                    <label className={styles.label}>
                        <h4>Name:</h4>
                    </label>
                    <input
                        type="text"
                        value={collectionValue}
                        onChange={handleCollectionValue}
                        className={styles.field}
                    />
                    <button type="submit" className={styles.addButton}>
                        Add!
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewCollection;

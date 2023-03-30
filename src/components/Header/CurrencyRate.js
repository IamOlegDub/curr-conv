import React from "react";
import styles from "./Header.module.css";

export default function CurrencyRate({ currency, value }) {
    return (
        <div className={styles.currencyItem}>
            <div>1 {currency}</div>
            <div>= {value} UAH</div>
        </div>
    );
}

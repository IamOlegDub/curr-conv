import React from "react";
import cn from "classnames";
import { ReactComponent as CurrencyLogoIcon } from "./currencyLogo.svg";

import styles from "./Header.module.css";
import CurrencyRate from "./CurrencyRate";
import useAxios from "../../hooks/useAxios";

export default function Header() {
    const url = `https://v6.exchangerate-api.com/v6/46a722771773d7e608fdf849/latest/uah`;

    const [data, loaded, error] = useAxios(url);

    if (loaded) {
        return <div className={styles.header}></div>;
    }
    if (error) {
        return "Something went wrong!";
    }
    const currencies = data.conversion_rates && [
        {
            unit: "USD",
            value: (1 / data.conversion_rates.USD).toFixed(2),
        },
        {
            unit: "EUR",
            value: (1 / data.conversion_rates.EUR).toFixed(2),
        },
    ];

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <CurrencyLogoIcon />
            </div>
            <h1 className={styles.title}>Currency converter</h1>
            <div className={styles.currencyData}>
                {currencies &&
                    currencies.map((currency) => (
                        <CurrencyRate
                            key={currency.unit}
                            currency={currency.unit}
                            value={currency.value}
                        />
                    ))}
            </div>
        </div>
    );
}

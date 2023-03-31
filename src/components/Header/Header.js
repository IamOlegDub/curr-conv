import React, { useEffect, useState } from "react";

import CurrencyRate from "./CurrencyRate";
import Skeleton from "./Skeleton";

import { ReactComponent as CurrencyLogoIcon } from "./currencyLogo.svg";

import styles from "./Header.module.css";

export default function Header() {
    const [usdRate, setUsdRate] = useState();
    const [eurRate, setEurRate] = useState();
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
    const usd = "USD",
        eur = "EUR",
        uah = "UAH";
    const url = `https://v6.exchangerate-api.com/v6/46a722771773d7e608fdf849/latest/${uah}`;

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then(
                (responseData) => {
                    setLoaded(true);
                    setUsdRate(
                        (
                            responseData.conversion_rates[uah] /
                            responseData.conversion_rates[usd]
                        ).toFixed(2)
                    );
                    setEurRate(
                        (
                            responseData.conversion_rates[uah] /
                            responseData.conversion_rates[eur]
                        ).toFixed(2)
                    );
                },
                (error) => {
                    setLoaded(true);
                    setError(error);
                }
            );
    }, [url]);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else
        return (
            <div className={styles.header}>
                <div className={styles.logo}>
                    <CurrencyLogoIcon />
                </div>
                <h1 className={styles.title}>Currency converter</h1>
                <div className={styles.currencyData}>
                    {!loaded ? (
                        <Skeleton />
                    ) : (
                        <>
                            <CurrencyRate currency={usd} value={usdRate} />
                            <CurrencyRate currency={eur} value={eurRate} />
                        </>
                    )}
                </div>
            </div>
        );
}

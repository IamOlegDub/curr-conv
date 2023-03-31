import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";

import styles from "./Main.module.css";
import InputData from "./InputData";

export default function Main() {
    const [amount, setAmount] = useState(1);
    const [firstCurrency, setFirstCurrency] = useState("USD");
    const [secondCurrency, setSecondCurrency] = useState("EUR");
    const [exchangeRate, setExchangeRate] = useState();
    const [firstMoney, setFirstMoney] = useState(true);

    const currencyList = ["USD", "EUR", "UAH", "GBP", "PLN"];

    function useFirstCurrency(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    function useSecondCurrency(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const first = useFirstCurrency(firstCurrency);
    const second = useSecondCurrency(secondCurrency);

    useEffect(() => {
        if (firstCurrency === secondCurrency) {
            setFirstCurrency(second);
            setSecondCurrency(first);
        }
        if (firstCurrency != null && secondCurrency != null) {
            fetch(
                `https://v6.exchangerate-api.com/v6/7cc8565835b9b47e14685f57/pair/${firstCurrency}/${secondCurrency}`
            )
                .then((response) => response.json())
                .then((responseData) => {
                    setExchangeRate(responseData.conversion_rate);
                });
        }
    }, [firstCurrency, secondCurrency, first, second]);

    let firstAmount = 1,
        secondAmount = 1;
    if (firstMoney) {
        firstAmount = amount;
        secondAmount = firstAmount * exchangeRate || 0;
        secondAmount = secondAmount.toFixed(2);
    } else {
        secondAmount = amount;
        firstAmount = secondAmount / exchangeRate;
        firstAmount = firstAmount.toFixed(2);
    }

    const onFirstInputChange = (e) => {
        const value = e.target.value;
        setAmount(value);
        setFirstMoney(true);
    };
    const onSecondInputChange = (e) => {
        const value = e.target.value;
        setAmount(value);
        setFirstMoney(false);
    };

    const onSetFirstCurrency = (item) => {
        if (firstCurrency === secondCurrency) {
            setFirstCurrency(second);
        } else {
            setFirstCurrency(item);
        }
    };
    const onSetSecondCurrency = (item) => {
        if (firstCurrency === secondCurrency) {
            setSecondCurrency(first);
        } else {
            setSecondCurrency(item);
        }
    };

    return (
        <div className={cn(styles.main)}>
            <div className={styles.inputDataList}>
                <InputData
                    currencyList={currencyList}
                    currency={firstCurrency}
                    onInputChange={onFirstInputChange}
                    onSetCurrency={onSetFirstCurrency}
                    inputAmount={firstAmount}
                />
                <InputData
                    currencyList={currencyList}
                    currency={secondCurrency}
                    onInputChange={onSecondInputChange}
                    onSetCurrency={onSetSecondCurrency}
                    inputAmount={secondAmount}
                />
            </div>
        </div>
    );
}

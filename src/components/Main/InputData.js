import React, { useRef, useState } from "react";
import cn from "classnames";

import { useOutsideClick } from "../../hooks/useOutsideClick";

import styles from "./Main.module.css";

export default function InputData({
    currencyList,
    currency,
    onInputChange,
    onSetCurrency,
    inputAmount,
    placeholder,
}) {
    const [selectOpen, setSelectOpen] = useState(false);

    const currencyListRef = useRef(null);

    const currencyListClose = () => {
        setSelectOpen(false);
    };

    useOutsideClick(currencyListRef, currencyListClose, selectOpen);

    return (
        <div className={styles.InputDataItem}>
            <input
                className={styles.input}
                value={inputAmount}
                type="number"
                onChange={(e) => onInputChange(e)}
                min="1"
                placeholder={placeholder}
            />
            <div
                className={styles.select}
                onClick={() => setSelectOpen((state) => !state)}
                ref={currencyListRef}
            >
                {currency}
                <div
                    className={cn(styles.arrow, {
                        [styles.arrowActive]: selectOpen,
                    })}
                ></div>
                <div
                    className={cn(styles.optionWrapper, {
                        [styles.optionWrapperActive]: selectOpen,
                    })}
                >
                    {currencyList.map((item) => (
                        <div
                            key={item}
                            className={cn(styles.option)}
                            onClick={() => onSetCurrency(item)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

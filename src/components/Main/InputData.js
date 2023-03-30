import cn from "classnames";
import React, { useState } from "react";
import styles from "./Main.module.css";

export default function InputData({
    currencyList,
    currency,
    onInputChange,
    onSetCurrency,
    inputAmount,
}) {
    const [selectOpen, setSelectOpen] = useState(false);

    return (
        <div className={styles.InputDataItem}>
            <input
                className={styles.input}
                value={inputAmount}
                type="number"
                onChange={(e) => onInputChange(e)}
                min="1"
            />
            <div
                className={styles.select}
                onClick={() => setSelectOpen((state) => !state)}
            >
                {currency}
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

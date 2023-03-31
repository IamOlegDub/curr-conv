import cn from "classnames";

import Bubbles from "./components/Bubbles";
import Header from "./components/Header";
import Main from "./components/Main";

import styles from "./App.module.css";

function App() {
    return (
        <div className={styles.App}>
            <Bubbles />
            <header className={cn(styles.headerContainer)}>
                <Header />
            </header>
            <main className={cn(styles.mainContainer)}>
                <Main />
            </main>
        </div>
    );
}

export default App;

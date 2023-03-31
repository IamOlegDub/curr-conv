import styles from "./Header.module.css";

export default function Skeleton() {
    return (
        <div className={styles.skeleton}>
            <div></div>
            <div></div>
        </div>
    );
}

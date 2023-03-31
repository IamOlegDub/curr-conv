import { useEffect } from "react";

export function useOutsideClick(elementRef, handler, attached = true) {
    useEffect(() => {
        if (!attached) return;
        const handleClickOutside = (event) => {
            if (
                elementRef?.current &&
                !elementRef.current.contains(event.target)
            ) {
                handler();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [attached, elementRef, handler]);
}

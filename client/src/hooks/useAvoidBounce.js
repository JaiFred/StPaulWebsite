import { useEffect } from "react";
import useWindowSize from './useWindowSize';
import './useAvoidBounce.scss'

const className = 'bounce-proof';

const useAvoidBounce = (useOn = 'all') => {
    const windowSize = useWindowSize();

    useEffect(() => {
        return;

        const htmlTag = document.querySelector('html');
        const contains = () => htmlTag.classList.contains(className);
        const addClass = () => {
            !contains() && htmlTag.classList.add(className);
        };
        const removeClass = () => {
            contains() && htmlTag.classList.remove(className);
        };

        if (useOn !== 'all' && (
            useOn === 'mobile' && windowSize.width > 767
        )) {
            removeClass();
        } else {
            addClass();
        }

        return removeClass;
    }, [windowSize]);
};

export default useAvoidBounce;

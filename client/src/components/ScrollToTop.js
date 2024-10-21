import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// When navigated using through links on the footer it moves the page top position
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;

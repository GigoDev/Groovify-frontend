import { useState, useEffect } from 'react';

const breakpoints = {
    mobile: 450,
    xxSmall: 450,
    xSmall: 970,
    small: 1050,
    medium: 1280,
    large: 1500,
    xlarge: 2000,
};

const getBreakpoint = (width) => {
    if (width >= breakpoints.xlarge) return 'xlarge'; //9 items
    if (width >= breakpoints.large) return 'large'; // 7 items
    if (width >= breakpoints.medium) return 'medium'; // 6 items
    if (width >= breakpoints.small) return 'small'; // 5 items
    if (width >= breakpoints.xSmall) return 'xSmall'; // 4 items
    if (width > breakpoints.xxSmall) return 'xxSmall'; //3 items + scroll
    if (width <= breakpoints.mobile) return 'mobile'; //7 items + scroll-x
};

const useBreakpoint = () => {
    const [breakpoint, setBreakpoint] = useState(getBreakpoint(window.innerWidth));

    useEffect(() => {
        const handleResize = () => {
            setBreakpoint(getBreakpoint(window.innerWidth));
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return breakpoint;
};

export default useBreakpoint;

import { useState, useEffect } from 'react';

const breakpoints = {
    xSmall: 830,
    small: 1050,
    medium: 1280,
    large: 1500,
};

const getBreakpoint = (width) => {
    if (width >= breakpoints.large) return 'large';
    if (width >= breakpoints.medium) return 'medium';
    if (width >= breakpoints.small) return 'small';
    if (width >= breakpoints.xSmall) return 'xSmall';
    if (width < breakpoints.xSmall) return 'xxSmall';
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

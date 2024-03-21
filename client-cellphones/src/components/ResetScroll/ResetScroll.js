import { useEffect } from 'react';
import {useLocation} from 'react-router-dom'

function ResetScroll() {
    const { pathname } = useLocation()

    useEffect(() => {
        console.log('url move', pathname);
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return null;
}

export default ResetScroll;
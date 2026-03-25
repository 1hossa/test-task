import { useEffect, useState } from "react"

export const useInfinityScroll = (callback: () => Promise<void>) => {
    const [isFetching, setFetching] = useState(false)

    const handleScroll = () => {
        if ( window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 1) return;
        setFetching(true);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (!isFetching) return;
        callback().finally(() => {
            setFetching(false)
        })
    }, [isFetching, callback]);
}
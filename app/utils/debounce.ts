export const debounce = <T>(cb: (arg: T) => void | Promise<void>, delay: number) => {
    let timer: NodeJS.Timeout

    return function (arg: T) {
        clearTimeout(timer)
        timer = setTimeout(() => cb(arg), delay)
    }
}
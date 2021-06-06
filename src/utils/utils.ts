export function sleep(duration: number): Promise<number> {
    return new Promise((resolve, reject) => {
        if (duration <= 0) {
            reject(`sleep duration less than 0: ${duration}`)
        } else {
            setTimeout(()=>{resolve(duration)}, duration)
        }
    })
}

export function getZipName(): string {
    const date = new Date()
    const info: Array<number|string> = [
        "wallpaper",
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    ]
    return info.join('_') + ".zip"
}

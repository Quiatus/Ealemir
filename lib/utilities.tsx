export function randomResourceRange(res: number, min: number, max: number) {
    return Math.floor(Math.random() * (res * max - res * min) + res * min)
}
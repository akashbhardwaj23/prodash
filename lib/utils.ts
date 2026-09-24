export function parseNumber(
    value : string | null,
    fallback : number
) : number {

    if(!value) return fallback

    const parsed = Number(value)

    if(!Number.isInteger(parsed) || parsed <= 0){
        return fallback
    }

    return parsed
}

export function parsedPage(
    page : string | null,
){
    const allowed = [10, 20, 50];

    const parsed = Number(page)

    return allowed.includes(parsed) ? parsed : 10;
}
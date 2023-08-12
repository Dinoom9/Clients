export function makeId(length = 9) {
    let txt = ''
    let possible = '0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}
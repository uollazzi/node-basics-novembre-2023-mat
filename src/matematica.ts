export let numeroOperazioniEseguite = 0;

export const somma = (a: number, b: number): number => {
    numeroOperazioniEseguite++;
    return a + b;
}

export const sottrazione = (a: number, b: number): number => {
    numeroOperazioniEseguite++;
    return a - b;
}

export default function moltiplicazione(a: number, b: number): number {
    numeroOperazioniEseguite++;
    return a * b;
}

const divisione = (a: number, b: number): number => {
    numeroOperazioniEseguite++;
    return a / b;
}

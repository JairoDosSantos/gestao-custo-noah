export function getStocks() {
    return [
        { id: 'ADANIPORTS', description: 'Adani Ports & Special Economic Zone Ltd.' },
        { id: 'RJ-Repair', description: 'RJ Repair de Jairo dos Santos Ltd.' },
        { id: 'LM-Pass', description: 'Outra empresa Zona rural Ltd.' },

    ]
}
type ObjectStock = {
    name: string,
    abbr: string
}

type MatchType = {
    state: ObjectStock;
    value: String;
}

export function matchStocks({ state, value }: MatchType) {
    return (
        state.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1 || state.abbr.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1
    );

}
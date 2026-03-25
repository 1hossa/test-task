export interface IResponse {
    info: {
        count: number,
    }
    results: ICharacter[]
}

export interface ICharacter {
    id: number,
    name: string,
    status: string,
    image: string
}

export interface IGetCharacter {
    page: number
    query: string
}
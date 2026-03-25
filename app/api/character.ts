'use server'

import { ApiError } from './errors'
import { IGetCharacter, IResponse } from './types'

const BASE_URL = 'https://rickandmortyapi.com/api'

export const getCharacter = async ({ page, query }: IGetCharacter): Promise<IResponse> => {
    const endpoint = `/character/?name=${query}&page=${page}`
    const url = `${BASE_URL}${endpoint}`

    const response = await fetch(url)

    if (!response.ok) {
        throw new ApiError(response.status, endpoint)
    }

    return response.json()
}
import { useState } from 'react'

import { getCharacter } from '@/app/api/character'
import { ApiError } from '@/app/api/errors'
import { ICharacter } from '@/app/api/types'

interface IUseCharacter {
    initialCharacters: ICharacter[]
}

export const useCharacter = ({initialCharacters}: IUseCharacter) => {
    const [characters, setCharacters] = useState(initialCharacters)
    const [paramsRequest, setParamsRequest] = useState({ loading: false, error: ''})
    const [params, setParams] = useState({ query: '', page: 1 })
    const {loading, error} = paramsRequest

    const filterCharacter = async (query = '') => {
        if (loading) return     

        try {
            setParamsRequest({ loading: true, error: '' })
            setParams({ query: query, page: 1 })
            const response = await getCharacter({ query, page: 1 })
            console.log(response.results) 
            setCharacters(response.results)
        } catch (err) {
            const message = err instanceof ApiError
                ? `Filter failed (${err.status}): ${err.endpoint}`
                : 'Unexpected error while filtering'
            setParamsRequest(prev => ({ ...prev, error: message }))
            setCharacters([])
        } finally {
            setParamsRequest(prev => ({ ...prev, loading: false }))
        }
    }

    const getNextPage = async() => {
        if (loading) return     

        try {
            setParamsRequest({ loading: true, error: '' })
            const newParams = { ...params, page: params.page + 1 }
            setParams(newParams)
            const response = await getCharacter(newParams)
            setCharacters((prev) => [...prev, ...response.results])
        } catch (err) {
            const message = err instanceof ApiError
                ? `Failed to load page ${params.page + 1} (${err.status})`
                : 'Unexpected error while loading next page'
            setParamsRequest(prev => ({ ...prev, error: message }))
        } finally {
            setParamsRequest(prev => ({ ...prev, loading: false }))
        }
    }
        
    return { characters, filterCharacter, getNextPage, loading, error }
}
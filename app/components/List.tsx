'use client'
import { ICharacter } from "@/app/api/types"
import { CharacterItem } from "@/app/components/CharacterItem"
import { useInfinityScroll } from "@/app/hooks/useInfinityScroll"

interface IList {
    characters: ICharacter[]
    getNextPage: () => Promise<void>
    loading: boolean
    error: string
}

export const List = ({ characters, getNextPage, loading, error }: IList) => {
    useInfinityScroll(getNextPage)

    return (
        <div>
            <div className="grid grid-cols-4 gap-4">
                {characters.map((character) => (
                    <CharacterItem key={character.id} character={character} />
                ))}
            </div>
            {loading && <p className="text-center mt-4">Loading...</p>}
            {error && <p className="text-center mt-4 text-red-500">{error}</p>}
        </div>
    )
}

'use client'
import { ICharacter } from "@/app/api/types";
import { useCharacter } from "@/app/hooks/useCharacter";

import { Form } from "@/app/components/Form";
import { List } from "@/app/components/List";

interface ICharacterList {
    initialCharacters: ICharacter[]
}

export const CharacterList = ({ initialCharacters }: ICharacterList) => {
    const { characters, filterCharacter, getNextPage, loading, error } = useCharacter({ initialCharacters })

    return (
        <div>
            <Form filterCharacter={filterCharacter} />
            <List characters={characters} getNextPage={getNextPage} loading={loading} error={error}/>
        </div>
    )
}
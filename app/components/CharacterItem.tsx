import { memo } from "react"
import Image from "next/image"

import { ICharacter } from "@/app/api/types"


interface ICharacterItem {
    character: ICharacter
}

export const CharacterItem = memo(({ character }: ICharacterItem) => {
    return (
        <div className="my-2 rounded border border-solid overflow-hidden justify-center">
            <Image src={character.image} alt={character.name} width={200} height={500} />
            <span>{character.name}</span>
        </div>
    )
})

import { getCharacter } from "./api/character";
import { CharacterList } from "./components/CharacterList";

export default async function Home() {
  const characters = await getCharacter({ page: 1, query: '' })

  return <CharacterList initialCharacters={characters?.results ?? []} />
}

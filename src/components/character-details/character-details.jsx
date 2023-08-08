import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacterById } from "../../utils/rick-and-morty-api";
import styles from "./character-details.module.css";

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharter] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getCharacter = async () => {
    setIsLoading(true);
    const result = await getCharacterById(id).then((data) => {
      return data;
    });
    setCharter(result);
    setIsLoading(false);
  };

  useEffect(() => {
    getCharacter();
  }, []);

  return (
    <>
      {isLoading ? (
        <p className={styles.character}>Загрузка...</p>
      ) : (
        <div className={styles.character}>
          <img src={character?.image} alt={character?.name} />
          <div className={styles.description}>
            <h2 className={styles.name}>{character?.name}</h2>
            <ul>
              <li>Status: {character?.status}</li>
              <li>Gender: {character?.gender}</li>
              <li>Type: {character?.type}</li>
              <li>Location: {character?.location.name}</li>
              <li>Species: {character?.species}</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default CharacterDetails;

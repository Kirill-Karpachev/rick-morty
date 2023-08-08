import { useEffect, useState, useRef } from "react";
import styles from "./app.module.css";
import { getCharacters } from "../../utils/rick-and-morty-api";
import Card from "../card/card";
import Modal from "../modal/modal";
import CharacterDetails from "../character-details/character-details";
import { Route, Routes } from "react-router-dom";
import { useForm } from "../../utils/use-form";
import Filter from "../filter/filter";

const App = () => {
  const [characters, setCharters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const { values, handleChange } = useForm({
    name: "",
    species: "",
    type: "",
    status: "",
    gender: "",
  });
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(0);
  const lastElement = useRef();
  const observer = useRef();

  const getItems = async () => {
    setIsLoading(true);
    const result = await getCharacters(page).then((data) => data);
    setMaxPages(result.info.pages);
    setCharters([...characters, ...result.results]);
    setIsLoading(false);
  };

  const filterCharacters = () => {
    return characters
      ?.filter((character) =>
        character.name?.toLowerCase().includes(values.name.toLowerCase())
      )
      .filter((character) =>
        character.type?.toLowerCase().includes(values.type.toLowerCase())
      )
      .filter((character) =>
        character.gender?.toLowerCase().startsWith(values.gender.toLowerCase())
      )
      .filter((character) =>
        character.species?.toLowerCase().includes(values.species.toLowerCase())
      )
      .filter((character) =>
        character.status?.toLowerCase().includes(values.status.toLowerCase())
      );
  };

  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();

    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && page < maxPages) {
        setPage(page + 1);
      }
    };

    observer.current = new IntersectionObserver(callback);
    observer.current.observe(lastElement.current);
  }, [isLoading]);

  useEffect(() => {
    getItems();
  }, [page]);

  return (
    <div className={styles.app}>
      <Filter values={values} handleChange={handleChange} />

      {filterCharacters().length ? (
        <ul className={styles.list}>
          {filterCharacters()?.map((character) => (
            <Card
              key={character.id}
              character={character}
              setModal={setModal}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.incorrect}>Enter correct data</p>
      )}
      <div ref={lastElement} className={styles.observer}></div>

      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 50,
          }}
        >
          Loading...
        </div>
      )}

      {modal && (
        <Routes>
          <Route
            path=":id"
            element={
              <Modal onClose={() => setModal(!modal)}>
                <CharacterDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

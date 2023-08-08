import React from "react";
import styles from "./card.module.css";
import { Link } from "react-router-dom";

const Card = ({ character, setModal }) => {
  const onClick = () => {
    setModal(true);
  };
  return (
    <li className={styles.item} onClick={onClick}>
      <Link
        to={{
          pathname: `/${character.id}`,
        }}
        className={styles.link}
      >
        <img src={character.image} alt={character.name} />
        <div className={styles.description}>
          <h2>{character.name}</h2>
          <p>
            {character.status} - {character.gender}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default Card;

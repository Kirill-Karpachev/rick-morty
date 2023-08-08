import Input from "../ui/input/input";
import styles from "./filter.module.css";

const Filter = ({ values, handleChange }) => {
  return (
    <div className={styles.filter}>
      <Input
        name={"name"}
        value={values.name}
        handleChange={handleChange}
        placeholder={"For Example Rick or Morty"}
      />
      <Input
        name={"status"}
        value={values.status}
        handleChange={handleChange}
        placeholder={"Alive, Dead or Unknown"}
      />
      <Input
        name={"species"}
        value={values.species}
        handleChange={handleChange}
        placeholder={"For Example Human"}
      />
      <Input
        name={"type"}
        value={values.type}
        handleChange={handleChange}
        placeholder={"For Example Human"}
      />

      <Input
        name={"gender"}
        value={values.gender}
        handleChange={handleChange}
        placeholder={"Male, Female, Genderless or Unknown"}
      />
    </div>
  );
};

export default Filter;

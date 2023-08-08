import styles from './input.module.css'

const Input = ({ name, value, handleChange, placeholder }) => {
  return (
    <label className={styles.label}>
      {name[0].toUpperCase() + name.slice(1)}:
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </label>
  );
};

export default Input;

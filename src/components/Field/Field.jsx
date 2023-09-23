import styles from "./Field.module.css";

const Field = ({ label, name, onChange }) => {
  return (
    <div className={styles.input_div}>
      <label className={styles.label_form}>{label}</label>
      <input
        className={`form-control ${styles.input_form}`}
        type="text"
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default Field;

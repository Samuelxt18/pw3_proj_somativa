import styles from './Input.module.css';

function Input({ type, text, placeHolder, name, value, onChange,handlerChangeTarefa }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <input 
                type={type}
                name={name}
                id={name}
                placeholder={placeHolder}
                handlerChangeTarefa={handlerChangeTarefa}
                value={value}  // Controlled value
                onChange={onChange}  // Handle change to update the state
            />
        </div>
    );
}

export default Input;

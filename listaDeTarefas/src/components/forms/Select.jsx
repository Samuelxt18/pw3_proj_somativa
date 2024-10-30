import React from 'react';
import styles from './Select.module.css';

function Select({ name, text, options, onChange, value }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <select name={name} onChange={onChange} value={value}>
                <option value="">Selecione uma categoria</option>
                {options.map((option) => (
                    <option key={option.id} value={option.nome_categoria}>
                        {option.nome_categoria}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;

export const InputField = ({ type, name, value, onChange, placeholder, className , required}) => {
    return (
         <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={className}
            placeholder={placeholder}
            required={required}
        />
    );
}
export const Input = ({ type, name, value, onChange, required }: any) => {
    return (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="border rounded-lg p-2 w-full"
      />
    );
  };
  
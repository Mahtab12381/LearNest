interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  options: Option[];
  value: string;
  defaultValue?: string;
  control: any;
  errors: any;
  rules: any;
  name: string;
  onchange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  watch: any;
}

const Select: React.FC<SelectProps> = ({
  options,
  label,
  errors,
  rules,
  control,
  name,
  defaultValue,
  onchange,
  watch,
}) => {
  const newvalue = watch(name);
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <select
        value={newvalue}
        defaultValue={defaultValue}
        {...control}
        rules={rules}
        name={name}
        className={`appearance-none border border-gray-200 rounded-xl w-full py-2.5 px-3 text-black leading-tight focus:outline-none ${
          errors[name] ? "border-red-500" : "focus:border-primary "
        }`}
        onChange={onchange}
      >
        <option value={""}>
          {`Select your ${label}`}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="text-red-500">*{errors[name]?.message}</span>
    </div>
  );
};

export default Select;

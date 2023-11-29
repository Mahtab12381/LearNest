
type Props = {
    label: string;
    type: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: Props) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={props.label}
        checked={props.value === "true"}
        onChange={props.onChange}
        className="mr-2 w-3.5 h-3.5 text-primary bg-black rounded cursor-pointer"
      />
      <label htmlFor={props.label}>{props.label}</label>
    </div>
  )
}

export default Checkbox
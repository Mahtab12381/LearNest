import {Controller} from 'react-hook-form'
type Props = {
    label: string;
    type: string;
    placeholder: string;
    value?: string;
    name: string;
    control: any;
    errors: any;
    rules: any;
    defaultValue?: string;
}
const Forminput = (props: Props) => {
  return (
<div>
<label htmlFor={props.name} className="block text-gray-700 text-sm font-bold mb-2">{props.label} </label>
<Controller
  name={props.name}
  control={props.control}
  rules={props.rules}
  defaultValue={props.defaultValue}
  render={({ field }) => (
    <>
      <input
      className={`appearance-none border border-gray-200 rounded-xl w-full py-2.5 px-3 text-black leading-tight focus:outline-none ${props.errors[props.name] ? "border-red-500" : "focus:border-primary "}`}
        {...field}
        type={props.type}
        id={props.name}
        placeholder={`Enter your ${props.label}`}
      />
      <span className="text-red-500">*{props.errors[props.name]?.message}</span>
    </>
  )}
/>
</div>
  )
}

export default Forminput
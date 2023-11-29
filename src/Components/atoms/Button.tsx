type Props = {
  text: string;
  outline?: boolean;
  className?: string;
  hover?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = (props: Props) => {
  return props.outline ? (
    <button
      className={`bg-white ${
        props.hover ? "hover:bg-primary hover:text-white" : ""
      }   text-primary border border-primary py-2 px-4 rounded-xl w-full ${
        props.className
      }`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  ) : (
    <button
      className={`bg-primary ${
        props.hover ? "hover:bg-sec_pink" : ""
      } text-white py-2 px-4 rounded-xl w-full ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

export default Button;

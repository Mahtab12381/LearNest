import React, { useState, ReactNode } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

interface AccordionCustomIconProps {
  accordionNumber: number;
  accordionHeader: ReactNode;
  children: ReactNode;
}

interface IconProps {
  id: number;
  open: number;
}

function Icon({ id, open }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

const AccordionCustomIcon: React.FC<AccordionCustomIconProps> = ({accordionHeader, accordionNumber, children }) => {
  const [open, setOpen] = useState<number>(0);

  const handleOpen = (value: number) => setOpen((prevOpen) => (prevOpen === value ? 0 : value));

  return (
    <>
      <Accordion className="border bg-white rounded-xl mb-2 shadow-sm" open={open === accordionNumber} icon={<Icon id={accordionNumber} open={open} />}>
        <AccordionHeader className={` bg-gray-50 text-lg font-normal border-0 px-3 py-2 ${open === accordionNumber?"rounded-tl-xl rounded-tr-xl":"rounded-xl"}`} onClick={() => handleOpen(accordionNumber)}>
          {accordionHeader}
        </AccordionHeader>
        <AccordionBody className="border-t px-2">
          {children}
        </AccordionBody>
      </Accordion>
    </>
  );
};

export default AccordionCustomIcon;

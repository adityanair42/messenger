import type { ReactElement } from "react";

interface InputProps {
  placeholder: string;
  color: string;
  startIcon?: ReactElement;
  reference?: any;
  type?: string;
}

export function Input({ placeholder, color, startIcon, reference, type = "text" }: InputProps) {
  return (
    <div className="relative w-full">
      {startIcon && <div className="absolute left-3 top-1/2 -translate-y-1/2">{startIcon}</div>}
      <input 
        ref={reference}
        type={type}
        placeholder={placeholder}
        className={`${color} w-full px-4 py-2 text-black border-b-2 border-black m-2 focus:outline-none ${startIcon ? 'pl-12' : ''}`}
      />
    </div>
  )
}

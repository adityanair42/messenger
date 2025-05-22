import type { ReactElement } from "react"

interface ButtonProps{
  startIcon?: ReactElement;
  text: String;
  onClick?: () => void;

}

export function Button({text, startIcon, onClick}: ButtonProps){
    return(
      <div className="flex justify-center">
        <button onClick={onClick} className="py-2 my-5 px-20 bg-black text-white">
          <div>
            {startIcon}
          </div>
          <div>
            {text}
          </div>
        </button>
      </div>
    )
}
import { CgSpinner } from "react-icons/cg";

export const Spinner = ({size = "lg"}) => {

    let sizeList = {
        "xs": "text-[20px]",
        "sm": "text-[30px]",
        "md": "text-[50px]",
        "lg": "text-[100px]",
        "xl": "text-[150px]"
    }
    return (
        <div className={`flex w-fit h-fit justify-center items-center relative text-slate-50 text-opacity-50 ${sizeList[size]}`}>
            <CgSpinner className="animate-spin"/>
        </div>
    )
}
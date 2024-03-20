import React from 'react';

interface EachdetailsProps {
    icon : any,
    name: string,
    value: string
}

const Eachdetails: React.FC<EachdetailsProps> = ({icon, name, value}) =>
{
    return (
        <>
            <div className="w-[40%] sm:w-[17%] h-[80%] bg-white text-[gray] flex justify-around items-center">
                {icon}
                <span className="flex flex-col text-[15px] 2xl:text-[17px] text-black">{value} <span>{name}</span></span>
            </div>
        </>
    )
}

export default Eachdetails;
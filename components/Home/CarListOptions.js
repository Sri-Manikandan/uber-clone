import { CarListData } from '@/utils/CarListData'
import React from 'react'
import CarListItem from './CarListItem'
import Link from 'next/link';
import AmountContext from '@/context/AmountContext';

function CarListOptions({distance}) {
    const [activeIndex, setActiveIndex] = React.useState();
    const [selectedCar, setSelectedCar] = React.useState();
    const {amount, setAmount} = React.useContext(AmountContext);

    const handleClick = () =>{
        setAmount((selectedCar.amount*distance).toFixed(2));
    }
  return (
    <div className='mt-5 p-5 overflow-auto h-[250px]'>
        <h2 className='text-[22px] font-bold'>Recommended</h2>
        {CarListData.map((item, index)=>{
            return(
                <div className={`cursor-pointer p-2 rounded-md border-black ${activeIndex==index?'border-[3px]':null}`} onClick={()=>{setActiveIndex(index);setSelectedCar(item);}}>
                    <CarListItem car={item} distance={distance}/>
                </div>
            )
        })}

        {selectedCar?.name?<div className='flex justify-between fixed z-10 bottom-5 bg-white p-3 shadow-xl w-[80%] md:w-[30%] border-[1px] items-center rounded-lg'>
            <h2>Make Payment For</h2>
            <Link
                href={{
                    pathname: '/checkout',
                }}
            >
                <button className='p-3 ml-2 bg-black text-white rounded-lg text-center' onClick={()=>handleClick()}>Request {selectedCar.name}</button>
            </Link>
        </div>:null}
    </div>
  )
}

export default CarListOptions
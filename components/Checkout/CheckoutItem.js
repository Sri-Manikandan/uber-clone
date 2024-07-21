import AmountContext from '@/context/AmountContext';
import Link from 'next/link';
import React from 'react'

function CheckoutItem() {
  const {amount, setAmount} = React.useContext(AmountContext);
  return (
    <div className='flex flex-col items-center justify-center w-[25%]'>
        <h1 className='font-bold text-xl text-center'>Amount to Pay: ${amount}</h1>
        <div className='flex flex-col p-5 rounded-lg border-2 border-black m-5 shadow-lg w-full'>
          <div className='flex flex-col p-2'>
            <label>Card Number</label>
            <input className='p-3 border-2 border-neutral-400 w-full shadow-lg rounded-lg text-black placeholder-black' type='text' placeholder='Enter card number' required/>
          </div>
          <div className='flex flex-col p-2'>
            <label>Expiry Date</label>
            <input className='p-3 border-neutral-400 border-2 w-full shadow-lg rounded-lg text-black placeholder-black' type='date' placeholder='MM / YY' required/>
          </div>
          <div className='flex flex-col p-2'>
            <label>CVV</label>
            <input className='p-3 border-neutral-400 border-2 w-full shadow-lg rounded-lg text-black placeholder-black' type='text' placeholder='Enter CVV' required/>
          </div>
          <div className='flex flex-col p-2'>
            <label>Card Holder Name</label>
            <input className='p-3 border-neutral-400 border-2 w-full shadow-lg rounded-lg text-black placeholder-black' type='text' placeholder='Enter card holder name' required/>
          </div>
          <Link href={{pathname:'/'}}><button className='rounded-xl p-3 bg-black text-white w-full mt-2' onClick={()=> setAmount(0)}>Pay</button></Link>
        </div>
    </div>
  )
}

export default CheckoutItem
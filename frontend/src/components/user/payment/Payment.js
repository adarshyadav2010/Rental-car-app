import React from 'react'
import UserNav from '../../navbar/UserNav'
import PaymentCard from './PaymentCard'


function Payment() {
  return (
    <div className='payment-container'>
      <UserNav />
      <PaymentCard/>
    </div>
  )
}

export default Payment
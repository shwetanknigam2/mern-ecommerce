import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { capturePayment } from '@/store/shopping/order-slice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

function Paypalreturn() {


  const dispatch=useDispatch()
  const location=useLocation()
  const params=new URLSearchParams(location.search)
  const paymentId=params.get('paymentId')
  const payerId=params.get('PayerID')


  useEffect(()=>{
    if(paymentId&&payerId){
      const orderId=JSON.parse(sessionStorage.getItem('currentOrderId'))
      dispatch(capturePayment({payerId,paymentId,orderId})).then(data=>{
        if(data?.payload?.success){
           sessionStorage.removeItem('currentOrderId')
           window.location.href='/shopping/payment-success'
        }
      }
      )
    }

  },[paymentId,payerId,dispatch])

  return <Card style={{ 
    maxWidth: '400px', 
    margin: '2rem auto', 
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    overflow: 'hidden',
    background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%)'
  }}>
    <CardHeader style={{
      padding: '1.5rem',
      background: 'linear-gradient(45deg, #3f51b5, #2196f3)',
      color: 'white',
      textAlign: 'center'
    }}>
      <CardTitle style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        marginBottom: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem'
      }}>
        <div className="spinner" style={{
          width: '24px',
          height: '24px',
          border: '3px solid rgba(255, 255, 255, 0.3)',
          borderTopColor: 'white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        Processing Payment
      </CardTitle>
      <div style={{
        fontSize: '0.9rem',
        opacity: '0.9',
        letterSpacing: '0.5px'
      }}>
        Please wait while we complete your transaction
      </div>
    </CardHeader>
    
    <div style={{ padding: '1.5rem', textAlign: 'center' }}>
      <div style={{
        height: '4px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: '2px',
        overflow: 'hidden',
        margin: '1rem 0'
      }}>
        <div style={{
          width: '45%',
          height: '100%',
          backgroundColor: '#4caf50',
          animation: 'progress 1.5s ease-in-out infinite'
        }} />
      </div>
      <div style={{
        color: '#6c757d',
        fontSize: '0.85rem',
        marginTop: '1rem',
        display: 'flex',
        gap: '0.25rem',
        justifyContent: 'center'
      }}>
        <span>Do not close this window</span>
        <span className="ellipsis" style={{
          display: 'inline-flex',
          width: '1ch',
          animation: 'ellipsis 1.5s infinite'
        }} />
      </div>
    </div>
  
    <style>
      {`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
        @keyframes ellipsis {
          0% { opacity: 0.2; }
          50% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}
    </style>
  </Card>
}

export default Paypalreturn
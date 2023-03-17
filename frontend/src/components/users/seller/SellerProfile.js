import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../hooks/authHooks/useAuthContext'
import { useSellerProfileContext } from '../../../hooks/useSellerProfileContext'
import SellerRegistrationForm from './SellerRegistrationForm'

const SellerProfile = () => {

  const {user} = useAuthContext()
  const {sellerProfiles:profile, dispatch} = useSellerProfileContext()

  // fetch the profile if any
  useEffect(()=>{
    // later we need to fetch the profile according to user email 
    const fetchUserProfile = async() => {
      const response = await fetch("/api/users/seller/getAllRegistrationDetails",{
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })
      const json = await response.json()

      if(response.ok){
        dispatch({type:"GET_SINGLE_PROFILE", payload:json})
      }
    }
  },[])

  const [isEditing, setIsEditing] = useState(false)
  const [showRegistrationForm, setRegistrationForm] = useState(false)


  const handleShowRegister = () => {
    setRegistrationForm(!showRegistrationForm)
  }

  return (
    <div className="sellerProfile">
      {!isEditing && (
        <div className='row'>
            <div className="col-6">
              <p><strong>Business Name: </strong></p>
              <p><strong>Business Owner</strong></p>
              <p><strong>Business Registration Date</strong></p>
              <p><strong>Approval</strong></p>  
              {/* peding registration status  */}
            </div>
            <div className="col-6">
              <div className="row">
              <div className="col-12">
                <button className='btn btn-primary' onClick={handleShowRegister}>REGISTER</button>
              </div>
              <div className="col-12">
                {showRegistrationForm && (
                  <SellerRegistrationForm/>
                )}
              </div>
              </div>
            </div>
        </div>
      )}
    </div>
  )
}

export default SellerProfile
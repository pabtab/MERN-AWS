import React from 'react'
import axios from 'axios'
import Layout from '../../components/Layout'
import { getCookie } from '../../helpers/auth'
import withUser from '../withUser'

const User = ({user}) => {
  return (
    <Layout>
      {JSON.stringify(user)}
    </Layout>
  )
}


export default withUser(User) 

import React from 'react'
import axios from 'axios'
import { getCookie } from '../helpers/auth'

const withUser = (Page) => {
  const WithAuthUser = props => 
  <Page {...props} />
  
  WithAuthUser.getInitialProps = async context => {
    const token = getCookie('token', context.req)
    let user = null

    if (token) {
      try {
        const response = await axios.get(`${process.env.API}/user`, {
          headers: {
            authorization: `Bearer ${token}`,
            contentType: 'application/json' 
          }
        })

        user = response.data
      } catch (error) {
        if (error.response.status === 401) {
          return {
            user: 'no-user'
          }
        }
      }
    }
  }

  return <WithAuthUser />
}

export default withUser

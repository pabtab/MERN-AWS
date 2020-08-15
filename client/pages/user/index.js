import React from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'

const User = ({todos}) => {
  return (
    <Layout>
      {JSON.stringify(todos)}
    </Layout>
  )
}

User.getInitialProps = async (context) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/todos`)

  return {
    todos: response.data
  }
}


export default User

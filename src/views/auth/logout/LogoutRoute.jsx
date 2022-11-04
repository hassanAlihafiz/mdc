import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeStorage } from 'utils/auth'

export default function LogoutRoute() {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    removeStorage()
    dispatch({
      type: 'auth.CLEAR'
    })
    history.push('/login')
  }, [])

  return (
    ''
  )
}

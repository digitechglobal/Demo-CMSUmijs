import React, { useState, useEffect } from 'react'
import {
  Redirect,
  connect,
  ConnectProps,
  useLocation,
  history,
  Dispatch,
} from 'umi'
// import { UserItem } from '@/models/users'
import { UserItem } from '@/models/usersFake' // 
import { stringify } from 'querystring'
import { PageLoading } from '@ant-design/pro-layout'
import { ConnectState } from '@/models/connect'

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean
  currentUser?: UserItem //
  accessToken?: string
  children: any
  dispatch: Dispatch
}

const SecurityLayout: React.FC<SecurityLayoutProps> = props => {
  const { children, currentUser, loading, accessToken, dispatch } = props
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(true)
    if (dispatch) {
      dispatch({ type: 'user/getMe' })
    }
  }, [])
  const location = useLocation()

  const queryString = stringify({
    redirect: window.location.href,
  })

  // const isPermission = currentUser?.role // role

  const isLogin = currentUser && currentUser.id && accessToken
  console.log("SecurityLayout -> accessToken", accessToken)
  console.log("SecurityLayout -> currentUser", currentUser)

  if ((!isLogin && loading) || !isReady) { //
    return <PageLoading />
  }

  if (!isLogin && location.pathname !== '/login') { // kiem tra da login chua,  !isLogin && location.pathname !== '/login'
    return <Redirect to={`/login`} />
  }

  return children
}

export default connect(({ user, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  accessToken: user.accessToken,
  loading: loading.models.user,
}))(SecurityLayout)

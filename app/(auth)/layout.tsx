import  { ReactNode } from 'react'

const AuthLayput = ({children}: {children: ReactNode}) => {
  return (
    <div className="auth-layout">{children}</div>
  )
}

export default AuthLayput
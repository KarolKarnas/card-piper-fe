import { useState } from "react"
import FormLogin from "../../components/form-login/form-login"
import { selectUserInfo } from "../../store/authSlice"
import { useAppSelector } from "../../store/hooks"
import { FormLoginRole } from "../../types/entities"
import { Quotes } from "../../components/quotes/Quotes"
import { Personalities } from "../../components/personalities/personalities"

export const Home = () => {
  const [signIn, setSignIn] = useState(true)
  const user = useAppSelector(selectUserInfo)

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome {user.email}</h1>
          <p>those are your recommended quotes sir</p>
          {/* <Quotes /> */}
          <Personalities />
        </>
      ) : (
        <>
          <h1>You need account sir</h1>
          <FormLogin
            role={signIn ? FormLoginRole.SIGNIN : FormLoginRole.SIGNUP}
          />
          <button onClick={() => setSignIn(!signIn)}>
            {signIn ? "I wanna signup" : "i wanna signin"}
          </button>
        </>
      )}
    </div>
  )
}

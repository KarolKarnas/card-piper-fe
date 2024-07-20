import * as Form from "@radix-ui/react-form"
import styles from "./form-login.module.scss"

import ButtonSubmit from "../button-submit/button-submit"
import type { SyntheticEvent } from "react"
import { useState } from "react"
import { useSignin } from "../../hooks/use-signin"
import { useSignup } from "../../hooks/use-signup"
import { FormLoginRole } from "../../types/entities"

export type FormLoginProps = {
  role: FormLoginRole
}

const FormLogin = ({ role }: FormLoginProps) => {
  // const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { handleSignin } = useSignin()
  const { handleSignup } = useSignup()

  const handleForm = (e: SyntheticEvent) => {
    e.preventDefault()
    if (role === FormLoginRole.SIGNIN) {
      handleSignin({ email, password })
    } else if (role === FormLoginRole.SIGNUP) {
      handleSignup({ email, password })
    }
  }

  return (
    <Form.Root onSubmit={e => handleForm(e)} className={styles.FormRoot}>
      <Form.Field className={styles.FormField} name="email">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={styles.FormLabel}>Email</Form.Label>
          <Form.Message className={styles.FormMessage} match="valueMissing">
            Please enter your Email
          </Form.Message>
          <Form.Message className={styles.FormMessage} match="typeMismatch">
            Please provide a valid Email
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className={styles.Input}
            type="email"
            required
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className={styles.FormField} name="password">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={styles.FormLabel}>Password</Form.Label>
          <Form.Message className={styles.FormMessage} match="valueMissing">
            Please enter your password
          </Form.Message>
          <Form.Message className={styles.FormMessage} match="typeMismatch">
            Please provide a valid password
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className={styles.Input}
            type="password"
            name="password"
            placeholder="Enter password"
            // ref={passwordRef}
            required
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Control>
      </Form.Field>

      <Form.Submit asChild>
        <ButtonSubmit color="orange" text="Submit" type="submit" />
      </Form.Submit>
      {/* <div
				className='flex h-8 items-end space-x-1'
				aria-live='polite'
				aria-atomic='true'
			>
				{errorMessage && (
					<>
						<p className={styles.FormMessage}>{errorMessage}</p>
					</>
				)}
			</div> */}
    </Form.Root>
  )
}

export default FormLogin

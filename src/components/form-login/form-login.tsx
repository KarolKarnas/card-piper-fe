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
    <Form.Root onSubmit={e => handleForm(e)} className={styles["form-root"]}>
      <Form.Field className={styles["form-field"]} name="email">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={styles["form-label"]}>Email</Form.Label>
          <Form.Message className={styles["form-message"]} match="valueMissing">
            Please enter your Email
          </Form.Message>
          <Form.Message className={styles["form-message"]} match="typeMismatch">
            Please provide a valid Email
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className={styles["login-input"]}
            type="email"
            required
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className={styles["form-field"]} name="password">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={styles["form-label"]}>Password</Form.Label>
          <Form.Message className={styles["form-message"]} match="valueMissing">
            Please enter your password
          </Form.Message>
          <Form.Message className={styles["form-message"]} match="typeMismatch">
            Please provide a valid password
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className={styles["login-input"]}
            type="password"
            name="password"
            placeholder="Enter password"
            required
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Control>
      </Form.Field>

      <Form.Submit asChild>
        <ButtonSubmit color="blue" text="Submit" type="submit" />
      </Form.Submit>
    </Form.Root>
  )
}

export default FormLogin

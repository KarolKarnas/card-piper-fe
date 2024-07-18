// import { useGetQuotesQuery } from "../../../lib/api/quotesApi"
import { useState } from "react"
import styles from "./Quotes.module.scss"
import {
  selectAllQuotes,
  selectQuotesRequestState,
} from "../../store/quotesSlice"
import { useAppSelector } from "../../store/hooks"
import { useFetchQuotes } from "../../hooks/fetch/use-fetch-quotes"
import { RequestState } from "../../types/request"

const optionsTake = [5, 10, 20, 30]
const optionsSkip = [1, 2, 3, 4, 5]

export const Quotes = () => {
  const [skip, setSkip] = useState(1)
  const [take, setTake] = useState(10)
  // Using a query hook automatically fetches data and returns query values

  const quotesRequestState = useAppSelector(selectQuotesRequestState)
  const isLoading = quotesRequestState === RequestState.LOADING
  // const { data, isError, isLoading, isSuccess } = useGetQuotesQuery({
  // 	skip: skip * take,
  // 	take,
  // });

  useFetchQuotes(skip * take, take)

  const data = useAppSelector(selectAllQuotes)

  // if (isError) {
  // 	return (
  // 		<div>
  // 			<h1>There was an error!!!</h1>
  // 		</div>
  // 	);
  // }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  // if (data) {
  // 	console.log(data);
  // }

  return (
    <div className={styles.container}>
      <h3>Select the Quantity of Quotes to Fetch:</h3>
      <div>
        <select
          className={styles.select}
          value={take}
          onChange={e => {
            setTake(Number(e.target.value))
          }}
        >
          {optionsTake.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select
          className={styles.select}
          value={skip}
          onChange={e => {
            setSkip(Number(e.target.value))
          }}
        >
          {optionsSkip.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {data.map(({ author, text, id }) => (
        <blockquote key={id}>
          &ldquo;{text}&rdquo;
          <footer>
            <cite>{author}</cite>
          </footer>
        </blockquote>
      ))}
    </div>
  )
}

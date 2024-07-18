// import { useGetQuotesQuery } from "../../../lib/api/quotesApi"
import { useEffect, useRef, useState } from "react"
import styles from "./Quotes.module.scss"
import {
  selectAllQuotes,
  selectQuotesRequestState,
} from "../../store/quotesSlice"
import { useAppSelector } from "../../store/hooks"
import { useFetchQuotes } from "../../hooks/fetch/use-fetch-quotes"
import { RequestState } from "../../types/request"
import {
  selectUserInfo,
  selectUserInfoRequestState,
} from "../../store/authSlice"

const optionsTake = [5, 10, 20, 30]
const optionsSkip = [0, 1, 2, 3, 4, 5]

export const Quotes = () => {
  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(10)
  const containerRef = useRef<HTMLDivElement>(null)
  // Using a query hook automatically fetches data and returns query values

  const user = useAppSelector(selectUserInfo)
  const userRequestState = useAppSelector(selectUserInfoRequestState)
  const quotesRequestState = useAppSelector(selectQuotesRequestState)
  const isLoading =
    quotesRequestState === RequestState.LOADING ||
    userRequestState === RequestState.LOADING
  // const { data, isError, isLoading, isSuccess } = useGetQuotesQuery({
  // 	skip: skip * take,
  // 	take,
  // });

  useFetchQuotes(skip * take, take, user ? user.personality : null)

  const data = useAppSelector(selectAllQuotes)

  const observer = useRef(
    new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoading) {
          setSkip(prevSkip => prevSkip + 1)
        }
      },
      { threshold: 1 },
    ),
  )

  useEffect(() => {
    if (containerRef.current) {
      observer.current.observe(containerRef.current)
    }
    return () => {
      if (containerRef.current) {
        observer.current.unobserve(containerRef.current)
      }
    }
  }, [containerRef.current]) // Ensure to update observer when containerRef changes

  // if (isError) {
  // 	return (
  // 		<div>
  // 			<h1>There was an error!!!</h1>
  // 		</div>
  // 	);
  // }

  // if (isLoading || data.length === 0) {
  //   return <div>Loading...</div>
  // }

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
      {data.map(({ author, text, id, distance }) => (
        <blockquote style={{ marginBottom: "100px" }} key={id}>
          &ldquo;{text}&rdquo;
          <footer>
            <strong>{distance}</strong>
            <br></br>
            <cite>{author.name}</cite>
          </footer>
        </blockquote>
      ))}
      <div ref={containerRef} style={{ height: "10px" }} />
      {isLoading && <div>Loading more...</div>}
    </div>
  )
}

// import { useGetQuotesQuery } from "../../../lib/api/quotesApi"
import { useEffect, useRef, useState } from "react"
import styles from "./personalities.module.scss"
import { useAppSelector } from "../../store/hooks"
import { useFetchQuotes } from "../../hooks/fetch/use-fetch-quotes"
import { RequestState } from "../../types/request"
import {
  selectUserInfo,
  selectUserInfoRequestState,
} from "../../store/authSlice"
import { Entity } from "../../types"
import {
  selectAllPersonalities,
  selectPersonalitiesRequestState,
} from "../../store/personalitiesSlice"
import { useFetchPersonalities } from "../../hooks/fetch/use-fetch-personalities"
import { AuthorCard } from "../entity-card/author-card"
import { BookCard } from "../entity-card/book-card"
import { QuoteCard } from "../entity-card/quote-card"
import { CharacterCard } from "../entity-card/character-card"
import { UserCard } from "../entity-card/user-card"

const optionsTake = [5, 10, 20, 30]
const optionsSkip = [0, 1, 2, 3, 4, 5]

export const Personalities = () => {
  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(10)
  const [entity, setEntity] = useState(Entity.AUTHOR)
  const [entities, setEntities] = useState<Entity[]>(Object.values(Entity))

  // console.log(entities)

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      option => option.value as Entity,
    )
    setEntities(selectedOptions)
  }

  const containerRef = useRef<HTMLDivElement>(null)
  // Using a query hook automatically fetches data and returns query values

  const user = useAppSelector(selectUserInfo)
  const userRequestState = useAppSelector(selectUserInfoRequestState)
  const personalitiesRequestState = useAppSelector(
    selectPersonalitiesRequestState,
  )
  const isLoading =
    personalitiesRequestState === RequestState.LOADING ||
    userRequestState === RequestState.LOADING
  // const { data, isError, isLoading, isSuccess } = useGetQuotesQuery({
  // 	skip: skip * take,
  // 	take,
  // });

  useFetchPersonalities(
    skip * take,
    take,
    user ? user.personality : null,
    entity,
    entities,
  )

  const data = useAppSelector(selectAllPersonalities)

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
      <h3>Select the PERSONALITY of Quotes to Fetch:</h3>
      <div>
        <select
          className={styles.select}
          multiple
          value={entities}
          onChange={handleSelectChange}
        >
          {Object.values(Entity).map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select
          className={styles.select}
          value={entity}
          onChange={e => {
            setEntity(e.target.value as Entity)
          }}
        >
          {Object.values(Entity).map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
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
      <div className={styles.feed}>
        {data.map(personality => (
          <div
            className={styles.card}
            key={`${personality.id}_${personality.distance}`}
          >
            {/* <EntityCard personality={personality} /> */}
            {personality.author && (
              <AuthorCard
                author={personality.author}
                distance={personality.distance}
              />
            )}
            {personality.book && (
              <BookCard
                book={personality.book}
                distance={personality.distance}
              />
            )}
            {personality.quote && (
              <QuoteCard
                quote={personality.quote}
                distance={personality.distance}
              />
            )}
            {personality.character && (
              <CharacterCard
                character={personality.character}
                distance={personality.distance}
              />
            )}
            {personality.user && (
              <UserCard
                user={personality.user}
                distance={personality.distance}
              />
            )}
          </div>
        ))}
      </div>
      <div ref={containerRef} style={{ height: "10px" }} />
      {isLoading && <div>Loading more...</div>}
    </div>
  )
}

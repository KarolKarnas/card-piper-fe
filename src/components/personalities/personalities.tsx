import { useEffect, useRef, useState, useCallback } from "react"
import styles from "./personalities.module.scss"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { RequestState } from "../../types/request"
import {
  clearAllPersonalities,
  selectAllPersonalities,
  selectPersonalitiesRequestState,
} from "../../store/personalitiesSlice"
import { useFetchPersonalities } from "../../hooks/fetch/use-fetch-personalities"
import { Entity } from "../../types"
import { AuthorCard } from "../entity-card/author-card"
import { BookCard } from "../entity-card/book-card"
import { QuoteCard } from "../entity-card/quote-card"
import { CharacterCard } from "../entity-card/character-card"
import { UserCard } from "../entity-card/user-card"
import { selectUserMe, selectUserMeRequestState } from "../../store/usersSlice"
import { useTheme } from "../../hooks/use-theme"
import clsx from "clsx"
import { SwitchFeed } from "../switch-feed/switch-feed"

export const Personalities: React.FC = () => {
  const [skip, setSkip] = useState(0)
  const [take] = useState(10)
  const [entity] = useState(Entity.AUTHOR)
  const [entities, setEntities] = useState<Entity[]>(
    Object.values(Entity).filter(value => value !== Entity.USER),
  )

  const dark = useTheme()
  const dispatch = useAppDispatch()
  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const userMe = useAppSelector(selectUserMe)
  const userMeRequestState = useAppSelector(selectUserMeRequestState)
  const personalitiesRequestState = useAppSelector(
    selectPersonalitiesRequestState,
  )
  const data = useAppSelector(selectAllPersonalities)

  const isLoading =
    personalitiesRequestState === RequestState.LOADING ||
    userMeRequestState === RequestState.LOADING

  const { refetch } = useFetchPersonalities(
    skip * take,
    take,
    userMe ? userMe.personality : null,
    entity,
    entities,
  )

  const handleCheckboxChange = useCallback(
    (entity: Entity, checked: boolean) => {
      dispatch(clearAllPersonalities())
      setEntities(prev =>
        checked ? [...prev, entity] : prev.filter(e => e !== entity),
      )
      setSkip(0)
    },
    [dispatch],
  )

  const initializeObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }
    observerRef.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoading) {
          setSkip(prevSkip => prevSkip + 1)
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    )
    if (containerRef.current) {
      observerRef.current.observe(containerRef.current)
    }
  }, [isLoading])

  useEffect(() => {
    initializeObserver()
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [initializeObserver])

  useEffect(() => {
    refetch()
  }, [entities, skip, userMe, refetch])

  return (
    <div className={styles.container}>
      <div
        className={clsx(styles.select, {
          [styles.dark]: dark,
          [styles.light]: !dark,
        })}
      >
        {Object.values(Entity).map(option => (
          <SwitchFeed
            key={option}
            option={option}
            checked={entities.includes(option)}
            onChange={handleCheckboxChange}
          />
        ))}
      </div>
      <div className={styles.feed}>
        {data.map(personality => (
          <div
            className={styles.card}
            key={`${personality.id}_${personality.distance}`}
          >
            {personality.author && (
              <AuthorCard
                personalityId={personality.id}
                author={personality.author}
                entity={personality.entity}
              />
            )}
            {personality.book && (
              <BookCard
                personalityId={personality.id}
                book={personality.book}
                entity={personality.entity}
              />
            )}
            {personality.quote && (
              <QuoteCard
                personalityId={personality.id}
                quote={personality.quote}
                entity={personality.entity}
              />
            )}
            {personality.character && (
              <CharacterCard
                personalityId={personality.id}
                character={personality.character}
                entity={personality.entity}
              />
            )}
            {personality.user && (
              <UserCard
                personalityId={personality.id}
                user={personality.user}
                entity={personality.entity}
              />
            )}
          </div>
        ))}
      </div>
      <div
        ref={containerRef}
        style={{ height: "20px", backgroundColor: "transparent" }}
      />
      {isLoading && <div>Loading more...</div>}
    </div>
  )
}

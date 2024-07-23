import  { useEffect, useRef, useState } from "react";
import styles from "./personalities.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RequestState } from "../../types/request";
import {
  clearAllPersonalities,
  selectAllPersonalities,
  selectPersonalitiesRequestState,
} from "../../store/personalitiesSlice";
import { useFetchPersonalities } from "../../hooks/fetch/use-fetch-personalities";
import { Entity } from "../../types";
import { AuthorCard } from "../entity-card/author-card";
import { BookCard } from "../entity-card/book-card";
import { QuoteCard } from "../entity-card/quote-card";
import { CharacterCard } from "../entity-card/character-card";
import { UserCard } from "../entity-card/user-card";
import { selectUserMe, selectUserMeRequestState } from "../../store/usersSlice";

export const Personalities = () => {
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);
  const [entity, setEntity] = useState(Entity.AUTHOR);
  const [entities, setEntities] = useState<Entity[]>(Object.values(Entity));
  // const [clear, setClear] = useState(false);

  const dispatch = useAppDispatch();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(clearAllPersonalities());
    const value = e.target.value as Entity;
    setEntities((prev) =>
      e.target.checked
        ? [...prev, value]
        : prev.filter((entity) => entity !== value)
    );
    setSkip(0);
    // setClear(true);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const userMe = useAppSelector(selectUserMe);
  const userMeRequestState = useAppSelector(selectUserMeRequestState);

  const personalitiesRequestState = useAppSelector(selectPersonalitiesRequestState);
  const isLoading =
    personalitiesRequestState === RequestState.LOADING ||
    userMeRequestState === RequestState.LOADING;

  const { refetch } = useFetchPersonalities(
    skip * take,
    take,
    userMe ? userMe.personality : null,
    entity,
    entities,
    // clear
  );

  useEffect(() => {
    refetch();
    // setClear(false);
  }, [entities, skip, take, userMe, refetch]);

  const data = useAppSelector(selectAllPersonalities);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setSkip((prevSkip) => prevSkip + 1);
        }
      },
      { threshold: 1 }
    )
  );

  useEffect(() => {
    if (containerRef.current) {
      observer.current.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        observer.current.unobserve(containerRef.current);
      }
    };
  }, [containerRef.current]);

  return (
    <div className={styles.container}>
      <div className={styles.select}>
        {Object.values(Entity).map((option) => (
          <div key={option}>
            <input
              type="checkbox"
              id={option}
              value={option}
              checked={entities.includes(option)}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
      <div className={styles.feed}>
        {data.map((personality) => (
          <div
            className={styles.card}
            key={`${personality.id}_${personality.distance}`}
          >
            {personality.author && (
              <AuthorCard
                author={personality.author}
                distance={personality.distance}
              />
            )}
            {personality.book && (
              <BookCard book={personality.book} distance={personality.distance} />
            )}
            {personality.quote && (
              <QuoteCard quote={personality.quote} distance={personality.distance} />
            )}
            {personality.character && (
              <CharacterCard character={personality.character} distance={personality.distance} />
            )}
            {personality.user && (
              <UserCard user={personality.user} distance={personality.distance} />
            )}
          </div>
        ))}
      </div>
      <div ref={containerRef} style={{ height: "10px" }} />
      {isLoading && <div>Loading more...</div>}
    </div>
  );
};
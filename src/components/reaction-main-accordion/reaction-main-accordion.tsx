import React from "react"
import * as Accordion from "@radix-ui/react-accordion"
import styles from "./reaction-main-accordion.module.scss"
import { FaChevronDown } from "react-icons/fa"
import { useAppSelector } from "../../store/hooks"
import { selectUserMe } from "../../store/usersSlice"
import type { LatestReaction} from "../../types";
import { ReactionType, type EntityTotal } from "../../types"
import { ReactionButton } from "../reaction-button/reaction-button"

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className={styles.AccordionHeader}>
    <Accordion.Trigger
      className={styles.AccordionTrigger}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <FaChevronDown className={styles.AccordionChevron} aria-hidden />
    </Accordion.Trigger>
  </Accordion.Header>
))

AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Content>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={styles.AccordionContent}
    {...props}
    ref={forwardedRef}
  >
    <div className={styles.AccordionContentText}>{children}</div>
  </Accordion.Content>
))

AccordionContent.displayName = "AccordionContent"

export const ReactionMainAccordion = () => {
  const userMe = useAppSelector(selectUserMe)
  const isLoading = !userMe

  const renderTitle = (name: string, total: EntityTotal) => (
    <span className={styles.title}>
      <span className={styles.name}>{name} </span>
      <span className={styles.icons}>
        Total {total.TOTAL} <ReactionButton reactionType={ReactionType.LOVE} />
        {total.LOVE} <ReactionButton reactionType={ReactionType.LIKE} />{" "}
        {total.LIKE} <ReactionButton reactionType={ReactionType.MEH} />{" "}
        {total.MEH} <ReactionButton reactionType={ReactionType.DISLIKE} />{" "}
        {total.DISLIKE} <ReactionButton reactionType={ReactionType.HATE} />{" "}
        {total.HATE}{" "}
      </span>
    </span>
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const reactionTotals = Object.entries(userMe.total_reaction)
  // const latestReactions = Object.entries(userMe.latest_reaction)
  console.log(userMe.latest_reaction)
  // console.log(latestReactions)

  return (
    <div className={styles.container}>
      <Accordion.Root
        className={styles.AccordionRoot}
        type="multiple"
        defaultValue={["book"]}
      >
        {reactionTotals.map((entity, index) => {
          const name = entity[0] as keyof LatestReaction
          const total = entity[1]

          console.log(name, userMe.latest_reaction[name])

          return (
            <Accordion.Item
              key={`${name}-${index}`}
              className={styles.AccordionItem}
              value={`${name}`}
            >
              <AccordionTrigger>{renderTitle(name, total)}</AccordionTrigger>
              <AccordionContent>
                Yes. It's unstyled by default, giving you freedom over the look
                and feel.
              </AccordionContent>
            </Accordion.Item>
          )
        })}
      </Accordion.Root>
    </div>
  )
}

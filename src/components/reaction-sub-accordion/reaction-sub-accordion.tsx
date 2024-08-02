import React from "react"
import * as Accordion from "@radix-ui/react-accordion"
import styles from "./reaction-sub-accordion.module.scss"
import { FaChevronDown } from "react-icons/fa"
import type { LatestReaction, LatestReactionByReactionType } from "../../types"
import { UserLatestReaction } from "../entity-card/user-latest-reaction/user-card-latest-reaction"

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

export type ReactionSubAccordionProps = {
  entityReactions: LatestReactionByReactionType
}

export const ReactionSubAccordion = ({
  entityReactions,
}: ReactionSubAccordionProps) => {
  const reactionLatest = Object.entries(entityReactions)

  // sort the array
  const desiredOrder = ["LOVE", "LIKE", "MEH", "DISLIKE", "HATE"]
  reactionLatest.sort((a, b) => {
    return desiredOrder.indexOf(a[0]) - desiredOrder.indexOf(b[0])
  })

  return (
    <div className={styles.container}>
      <Accordion.Root
        className={styles.AccordionRoot}
        type="multiple"
        defaultValue={["LOVE", "LIKE", "MEH", "DISLIKE", "HATE"]}
      >
        {reactionLatest.map((entity, index) => {
          const reactionName = entity[0]
          const reactions = entity[1]

          return (
            <Accordion.Item
              key={`${reactionName}-${index}`}
              className={styles.AccordionItem}
              value={`${reactionName}`}
            >
              <AccordionTrigger>{reactionName}</AccordionTrigger>
              <AccordionContent>
                <UserLatestReaction reactions={reactions} />
              </AccordionContent>
            </Accordion.Item>
          )
        })}
      </Accordion.Root>
    </div>
  )
}

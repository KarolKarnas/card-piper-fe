import React from "react"
import * as Accordion from "@radix-ui/react-accordion"
import styles from "./reaction-main-accordion.module.scss"
import { FaChevronDown } from "react-icons/fa"
import { useAppSelector } from "../../store/hooks"
import { selectUserMe } from "../../store/usersSlice"
import type { LatestReaction } from "../../types"
import { Entity, ReactionType, type EntityTotal } from "../../types"
import { ReactionSubAccordion } from "../reaction-sub-accordion/reaction-sub-accordion"
import clsx from "clsx"
import { useTheme } from "../../hooks/use-theme"
import { ReactionIcon } from "../reaction-icon/reaction-icon"

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className={styles.AccordionHeader}>
    <Accordion.Trigger
      className={clsx(styles.AccordionTrigger, className)}
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
    className={clsx(styles.AccordionContent, className)}
    {...props}
    ref={forwardedRef}
  >
    <div className={styles.AccordionContentText}>{children}</div>
  </Accordion.Content>
))

AccordionContent.displayName = "AccordionContent"

export const ReactionMainAccordion = () => {
  const userMe = useAppSelector(selectUserMe)
  const dark = useTheme()

  const isLoading = !userMe

  const renderTitle = (name: string, total: EntityTotal) => (
    <span
      className={clsx(styles.title, {
        [styles.dark]: dark,
        [styles.light]: !dark,
      })}
    >
      <span className={styles.name}>
        {name} <span className={styles.total}>{total.TOTAL}</span>
      </span>
      <span className={styles.icons}>
        <ReactionIcon reactionType={ReactionType.LOVE} />
        {total.LOVE} <ReactionIcon reactionType={ReactionType.LIKE} />{" "}
        {total.LIKE} <ReactionIcon reactionType={ReactionType.MEH} />{" "}
        {total.MEH} <ReactionIcon reactionType={ReactionType.DISLIKE} />{" "}
        {total.DISLIKE} <ReactionIcon reactionType={ReactionType.HATE} />{" "}
        {total.HATE}{" "}
      </span>
    </span>
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const reactionTotals = Object.entries(userMe.total_reaction)

  return (
    <div className={styles.container}>
      <Accordion.Root
        className={clsx(styles.AccordionRoot, {
          [styles.dark]: dark,
          [styles.light]: !dark,
        })}
        type="multiple"
        defaultValue={["book"]}
      >
        {reactionTotals.map((entity, index) => {
          const name = entity[0] as keyof LatestReaction
          const total = entity[1]
          const entityReactions = userMe.latest_reaction[name]

          return (
            <Accordion.Item
              key={`${name}-${index}`}
              className={clsx(styles.AccordionItem, {
                [styles.dark]: dark,
                [styles.light]: !dark,
              })}
              value={`${name}`}
            >
              <AccordionTrigger
                className={clsx({
                  [styles.author]: name === Entity.AUTHOR,
                  [styles.book]: name === Entity.BOOK,
                  [styles.quote]: name === Entity.QUOTE,
                  [styles.character]: name === Entity.CHARACTER,
                  [styles.user]: name === Entity.USER,
                })}
              >
                {renderTitle(name, total)}
              </AccordionTrigger>
              <AccordionContent>
                <ReactionSubAccordion entityReactions={entityReactions} />
              </AccordionContent>
            </Accordion.Item>
          )
        })}
      </Accordion.Root>
    </div>
  )
}

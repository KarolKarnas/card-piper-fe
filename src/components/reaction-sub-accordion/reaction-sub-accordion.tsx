import React from "react"
import * as Accordion from "@radix-ui/react-accordion"
import styles from "./reaction-sub-accordion.module.scss"
import { FaChevronDown } from "react-icons/fa"
import type { LatestReactionByReactionType } from "../../types"
import { Entity, ReactionType } from "../../types"
import clsx from "clsx"
import { useTheme } from "../../hooks/use-theme"
import { ReactionIcon } from "../reaction-icon/reaction-icon"
import { UserLatestReaction } from "../entity-card/user-latest-reaction/user-card-latest-reaction"

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className={styles["accordion-header"]}>
    <Accordion.Trigger
      className={clsx(styles["accordion-trigger"], className)}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <FaChevronDown className={styles["accordion-chevron"]} aria-hidden />
    </Accordion.Trigger>
  </Accordion.Header>
))

AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Content>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={clsx(styles['accordion-content'], className)}
    {...props}
    ref={forwardedRef}
  >
    <div className={styles.AccordionContentText}>{children}</div>
  </Accordion.Content>
))

AccordionContent.displayName = "AccordionContent"

export type ReactionSubAccordionProps = {
  entityReactions: LatestReactionByReactionType
  titleEntity: Entity
}

export const ReactionSubAccordion = ({
  entityReactions,
  titleEntity,
}: ReactionSubAccordionProps) => {
  const dark = useTheme()
  const reactionLatest = Object.entries(entityReactions)

  // sort the array
  const desiredOrder = [
    ReactionType.LOVE,
    ReactionType.LIKE,
    ReactionType.MEH,
    ReactionType.DISLIKE,
    ReactionType.HATE,
  ]
  reactionLatest.sort(
    (a, b) =>
      desiredOrder.indexOf(a[0] as ReactionType) -
      desiredOrder.indexOf(b[0] as ReactionType),
  )

  const renderTitle = (name: ReactionType) => (
    <span
      className={clsx(styles.title, {
        [styles.dark]: dark,
        [styles.light]: !dark,
      })}
    >
      <span className={styles.name}>
        {name}
        {/* <ReactionIcon reactionType={name} /> */}
        <span className={styles.total}>{entityReactions[name].length}</span>
      </span>
      {/* <span className={styles.icons}>
          <ReactionIcon reactionType={name} /> {entityReactions[name].length}
        </span> */}
    </span>
  )

  return (
    <Accordion.Root
      className={clsx(styles["accordion-root"], {
        [styles.dark]: dark,
        [styles.light]: !dark,
      })}
      type="multiple"
      defaultValue={[
        ReactionType.LOVE,
        ReactionType.LIKE,
        ReactionType.MEH,
        ReactionType.DISLIKE,
        ReactionType.HATE,
      ]}
    >
      {reactionLatest.map(([reactionName, reactions], index) => (
        <Accordion.Item
          key={`${reactionName}-${index}`}
          className={clsx(styles["accordion-item"], {
            [styles.dark]: dark,
            [styles.light]: !dark,
          })}
          value={reactionName}
        >
          <AccordionTrigger
            className={clsx({
              [styles.author]: titleEntity === Entity.AUTHOR,
              [styles.book]: titleEntity === Entity.BOOK,
              [styles.quote]: titleEntity === Entity.QUOTE,
              [styles.character]: titleEntity === Entity.CHARACTER,
              [styles.user]: titleEntity === Entity.USER,
            })}
          >
            {renderTitle(reactionName as ReactionType)}
          </AccordionTrigger>
          <AccordionContent
            className={clsx({
              [styles.author]: titleEntity === Entity.AUTHOR,
              [styles.book]: titleEntity === Entity.BOOK,
              [styles.quote]: titleEntity === Entity.QUOTE,
              [styles.character]: titleEntity === Entity.CHARACTER,
              [styles.user]: titleEntity === Entity.USER,
              [styles.dark]: dark,
              [styles.light]: !dark,
            })}
          >
            {reactions.length === 0 ? (
              <span
                className={styles.empty}
              >{`There are no ${reactionName} for ${titleEntity} yet. Start working on this, please!`}</span>
            ) : (
              <UserLatestReaction reactions={reactions} />
            )}
          </AccordionContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

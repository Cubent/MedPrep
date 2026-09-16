# How USMLE Qbank Platforms Work & How We Structure Ours

## How platforms like NARQB / UWorld / AMBOSS actually work

The core insight: it's not a pile of random questions — it's a graph of testable
facts with state per user. Three moving parts:

1. **A content taxonomy, not just "questions."** The atomic unit isn't the
   question — it's the **Learning Objective (LO)**, e.g. "recognize ECG signs
   of right heart strain." NARQB's "6,876 learning objectives · 34,380
   questions" tells you the ratio: ~5 questions per LO. Multiple questions per
   LO exist so the platform can re-test the *same concept* without showing the
   literal same question — that's what "pre-written variations... from a
   different angle" means.

2. **Per-user mastery state**, tracked per LO, not per question: unseen →
   seen-wrong → in-review → mastered, with a "next due" timestamp. This is
   what makes spaced repetition possible — a scheduling layer on top of the
   LO graph.

3. **A selection algorithm that's a priority queue, not randomness.** At any
   moment, "what question next" is decided by weighing: overdue reviews >
   weak-area LOs > next-highest-yield unseen LO in the current system > "seen
   enough here, switch to something maximally different." No ML needed —
   deterministic and tunable.

## Real NBME structure — two tagging axes, not one

The actual USMLE content outline tags every question along **two independent
dimensions**:

- **System**: Cardiovascular, Nervous, Reproductive & Endocrine, GI, Renal,
  etc. Highest-weighted (Step 1): Reproductive/Endocrine (12–16%), Nervous
  (11–15%), Cardiovascular (10–14%).
- **Discipline/process**: Pathology (44–52%), Physiology (25–35%),
  Pharmacology (15–22%), plus "physician task" categories like Applying
  Foundational Science Concepts (55–65% of all questions).

As of 2025–2026, NBME retired the old "General Principles" bucket and
redistributed those topics into the organ systems directly — don't build a
separate general-principles category; tag everything straight to a system.

## Spaced repetition — use SM-2, don't invent one

SM-2 is a 40-year-old, extremely well-tested algorithm (the basis for Anki).
No reason to design a custom scheduler.

- Track `easeFactor` (starts at 2.5) and `interval` per learning objective,
  per user.
- On a correct answer: 1st review → 1 day, 2nd → 6 days, every review after →
  `previousInterval × easeFactor`.
- Each attempt nudges `easeFactor` up or down based on how easily it was
  answered.
- A wrong answer resets the interval back to the start, but `easeFactor`
  stays — so a concept that's been hard stays surfacing more often even after
  eventually getting it right.

This is a couple of numeric fields and one update formula — no ML needed.

## What competitors do that's worth stealing

- **UWorld**: tags *why* a question was missed — concept gap vs. pure recall
  vs. careless error vs. ran out of time. Worth an `errorType` enum
  (`CONCEPT`, `RECALL`, `CARELESS`, `TIME`) on each attempt so accuracy
  dashboards can eventually say *why* someone's weak somewhere, not just that
  they are.
- **AMBOSS**: difficulty rated 1–5 ("hammers"), and question blocks can be
  filtered/customized by topic + difficulty. Matches our `difficulty` field —
  worth exposing as a user-facing filter, not just internal metadata.
- Both lean on integrated explanations/library content tied to each question
  — worth planning for a short embedded explanation or related-reading link
  per LO eventually, not just a raw explanation string.

## Data model

```
System                (id, examType, name, sortOrder)
LearningObjective      (id, systemId, examType, discipline, title, yieldWeight)
Question               (id, learningObjectiveId, variationGroupId, stem, explanation, difficulty)
AnswerChoice           (id, questionId, text, isCorrect)
UserObjectiveProgress  (id, userId, learningObjectiveId, status, easeFactor, interval, nextReviewAt)
UserQuestionAttempt    (id, userId, questionId, chosenAnswerId, isCorrect, errorType, attemptedAt)
StudySession           (id, userId, examType, mode[SEMESTER|DEDICATED|RESERVE], createdAt)
SessionQuestion        (sessionId, questionId, order, answeredAt)
```

`variationGroupId` is the key trick — it lets spaced repetition pull a
*different* question testing the same LO instead of literally repeating one.

## The selection algorithm, in plain terms

```
next_question():
  if overdue_reviews_exist():      return pick_variation(oldest_due_LO)
  if weak_areas_flagged():         return next_unseen_question(weakest_LO)
  if current_system_saturated():   switch_to(most_divergent_unstarted_system)
  else:                            return next_unseen_question(current_system, by yieldWeight desc)
```

"Saturated" is just a counter — e.g. after N questions or M% accuracy in a
system, cut it short and jump elsewhere. This is literally what the homepage
copy promises: "we cut it short and introduce a new topic that is maximally
divergent."

## The part that isn't a coding problem: content

This is the actual bottleneck for every qbank company, not the software. Real
questions + variations + explanations need to be written by people with
medical expertise, tagged to LOs.

**Do not auto-generate clinical question content without physician review** —
wrong answer-key content in a board-exam-prep product is a liability and
trust problem, not just a bug. A content-authoring relationship (e.g. with a
residency program) is the actual unlock here, more than any algorithm.

## Phased build plan

**Phase 0 — done:** auth (Clerk), exam-selection onboarding, marketing site,
dashboard shell with placeholder stats, Prisma/Neon storing the user's chosen
exam.

**Phase 1 — MVP:**
- Seed `System` / `LearningObjective` / `Question` tables with a small real
  set (even 200–500 questions, one exam) — hand-authored or licensed,
  reviewed.
- Build the question-player UI: stem → 5 choices → submit → explanation →
  next.
- Log every `UserQuestionAttempt`.
- Replace the dashboard's placeholder Accuracy/Coverage/Activity cards with
  real numbers computed from attempts.
- Selection logic: simple, non-adaptive — "next unseen LO by yield weight in
  current system." No spaced repetition yet.

**Phase 2:**
- Add SM-2 spaced-repetition scheduling so missed LOs actually resurface.
- Wire up the "Review" and "Topics" dashboard nav pages for real.
- Weak-area detection driving the "Focus topics" link.

**Phase 3:**
- Dedicated-study-period detection (needs an exam date from the user) +
  auto-generated Reserve Set.
- Cross-exam carryover: when the 30-day lock lifts and a user switches exams,
  prioritize whatever they left unfinished/weak.

**Phase 4:**
- Billing (Stripe), richer account management, admin/content-authoring
  tooling.

## Sources

- [Step 1 | USMLE](https://www.usmle.org/step-exams/step-1)
- [USMLE Content Outline: What's Actually Tested — QuantaPrep](https://www.quantaprep.com/blog/usmle-content-outline-guide)
- [USMLE Step 1 Content Outline: 2026 Updates & Study Guide](https://dedicatedprep.com/usmle-step-1-content-outline-explained/)
- [The Anki SM-2 Spaced Repetition Algorithm | RemNote Help Center](https://help.remnote.com/en/articles/6026144-the-anki-sm-2-spaced-repetition-algorithm)
- [SM-2 Algorithm Explained: Spaced Repetition Basics - Flica](https://flica.app/article/sm-2-algorithm-explained)
- [AMBOSS vs UWorld for Step 2 CK (2026)](https://www.iatrox.com/blog/amboss-vs-uworld-for-step-2-ck-who-wins-for-different-learner-types)
- [UWorld vs. AMBOSS vs. Synapse: Which Qbank Is Best — The Match Guy](https://thematchguy.com/uworld-vs-amboss-usmle-step1-step2-step3/)

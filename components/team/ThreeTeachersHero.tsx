"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import {
  threeTeachersHero,
  threeTeachersSeo,
} from "@/content/team/page-copy";

export function ThreeTeachersHero() {
  const { roles, intro, emphasis } = threeTeachersHero;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#e8f5ee] via-white to-[#f7f9f7] py-16 sm:py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="mb-8 text-[1.75rem] font-bold leading-snug tracking-tight text-foreground sm:mb-10 sm:text-4xl sm:leading-tight lg:text-5xl">
            <span className="mb-2 block text-sm font-medium tracking-wide text-primary sm:mb-3 sm:text-base lg:text-lg">
              {threeTeachersSeo.h1Line1}
            </span>
            <span className="block text-balance">
              一個孩子的學習，
              <br className="sm:hidden" />
              不該只交給一位老師
            </span>
          </h1>

          <ul
            aria-label="三師共學角色"
            className="mb-8 flex flex-col items-stretch gap-2.5 sm:mb-10 md:flex-row md:items-center md:justify-center md:gap-0"
          >
            {roles.map((role, index) => (
              <Fragment key={role.id}>
                <li className="min-w-0 flex-1 rounded-2xl border border-primary/15 bg-white/80 px-4 py-4 text-center shadow-sm backdrop-blur-sm sm:py-5 md:max-w-[11.5rem]">
                  <p className="text-sm font-semibold text-foreground sm:text-base">
                    {role.label}
                  </p>
                  <p className="mt-1 text-xs tracking-wide text-primary sm:mt-1.5 sm:text-sm">
                    {role.focus}
                  </p>
                </li>
                {index < roles.length - 1 ? (
                  <li
                    aria-hidden
                    className="flex shrink-0 items-center justify-center py-0.5 text-base font-light text-primary/35 md:w-9 md:text-lg"
                  >
                    ×
                  </li>
                ) : null}
              </Fragment>
            ))}
          </ul>

          <div className="mx-auto max-w-2xl space-y-4 text-center text-base leading-[1.85] text-muted-foreground sm:space-y-5 sm:text-[1.0625rem]">
            {intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="pt-1 text-base font-semibold leading-relaxed text-foreground sm:text-lg lg:text-xl">
              {emphasis}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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
    <section className="relative overflow-hidden bg-gradient-to-br from-[#e8f5ee] via-white to-[#f7f9f7] py-20 lg:py-28">
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
          <h1 className="mb-10 text-4xl font-bold leading-tight tracking-tight text-foreground lg:text-5xl">
            <span className="mb-3 block text-base font-medium tracking-wide text-primary lg:text-lg">
              {threeTeachersSeo.h1Line1}
            </span>
            <span className="block">{threeTeachersSeo.h1Line2}</span>
          </h1>

          <ul
            aria-label="三師共學角色"
            className="mb-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-0"
          >
            {roles.map((role, index) => (
              <Fragment key={role.id}>
                <li className="min-w-0 flex-1 rounded-2xl border border-primary/15 bg-white/80 px-4 py-5 shadow-sm backdrop-blur-sm sm:max-w-[11.5rem]">
                  <p className="text-sm font-semibold text-foreground sm:text-base">
                    {role.label}
                  </p>
                  <p className="mt-1.5 text-xs tracking-wide text-primary sm:text-sm">
                    {role.focus}
                  </p>
                </li>
                {index < roles.length - 1 ? (
                  <li
                    aria-hidden
                    className="flex shrink-0 items-center justify-center py-0.5 text-lg font-light text-primary/35 sm:w-10 sm:px-0"
                  >
                    ×
                  </li>
                ) : null}
              </Fragment>
            ))}
          </ul>

          <div className="mx-auto max-w-2xl space-y-5 text-base leading-[1.85] text-muted-foreground sm:text-[1.0625rem]">
            {intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="pt-1 text-lg font-semibold leading-relaxed text-foreground sm:text-xl">
              {emphasis}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

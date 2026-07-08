import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { cn } from "@/components/ui/utils";

export type TeamMember = {
  name: string;
  role: string;
  image: string;
  imagePosition?: "top" | "center";
  description: string;
  expertise: readonly string[];
};

type TeamMemberCardProps = {
  member: TeamMember;
};

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <article className="grid grid-cols-[7.5rem_1fr] items-start overflow-hidden rounded-xl border border-border bg-white shadow-sm sm:grid-cols-[9.5rem_1fr]">
      <div className="relative aspect-[3/4] bg-[#e8f5ee]">
        <ImageWithFallback
          src={member.image}
          alt={member.name}
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            member.imagePosition === "center" ? "object-center" : "object-top",
          )}
        />
      </div>

      <div className="flex flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-foreground sm:text-xl">
              {member.name}
            </h3>
          </div>
          <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary sm:px-3 sm:py-1 sm:text-sm">
            {member.role}
          </span>
        </div>

        <p className="mt-3 border-l-2 border-primary pl-3 text-sm italic leading-relaxed text-foreground/80">
          {member.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {member.expertise.map((skill) => (
            <span
              key={skill}
              className="rounded bg-[#e8f5ee] px-2 py-0.5 text-xs text-primary"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { conference, guidelines, importantDates, submissionTypes, topics } from "@/lib/conference";
import { PageHero, SubmitButton } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/call-for-papers")({
  head: () => ({
    meta: [
      { title: `Call for Papers — ${conference.name}` },
      { name: "description", content: `Topics, submission types, deadlines and guidelines for ${conference.name}.` },
      { property: "og:title", content: `Call for Papers — ${conference.name}` },
      { property: "og:description", content: `Submit original research on IP, innovation and technology transfer to ${conference.name}.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CallForPapers,
});

function CallForPapers() {
  return (
    <>
      <PageHero eyebrow="Call for Papers" title={conference.theme}
        intro={`${conference.name} invites original research, scholarly contributions and professional perspectives on intellectual property, innovation and technology transfer.`} />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="eyebrow">Conference Topics</p>
        <h2 className="mt-3 text-3xl font-extrabold">Research areas</h2>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <li key={t} className="flex items-center gap-3 rounded-lg border bg-card p-5 font-semibold text-navy">
              <span className="h-2 w-2 rounded-full bg-accent" />{t}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="eyebrow">Submission Types</p>
          <h2 className="mt-3 text-3xl font-extrabold">What you can submit</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {submissionTypes.map((s) => (
              <div key={s.title} className="rounded-lg border bg-card p-6 shadow-card">
                <FileText className="h-5 w-5 text-accent" />
                <h3 className="mt-4 font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-14 px-5 py-20 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="eyebrow">Important Dates</p>
          <h2 className="mt-3 text-3xl font-extrabold">Timeline</h2>
          <ol className="mt-8 border-l-2 border-border">
            {importantDates.map((d) => (
              <li key={d.label} className="relative pb-7 pl-7 last:pb-0">
                <span className={`absolute -left-[7px] top-1.5 h-3 w-3 rounded-full ${d.highlight ? "bg-primary" : "bg-accent"}`} />
                <p className={`font-extrabold ${d.highlight ? "text-primary" : "text-navy"}`}>{d.date}</p>
                <p className="text-sm text-muted-foreground">{d.label}</p>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <p className="eyebrow">Submission Guidelines</p>
          <h2 className="mt-3 text-3xl font-extrabold">Guidelines</h2>
          <dl className="mt-8 divide-y rounded-lg border">
            {guidelines.map((g) => (
              <div key={g.title} className="grid gap-1 p-5 sm:grid-cols-[180px_1fr] sm:gap-6">
                <dt className="font-bold text-navy">{g.title}</dt>
                <dd className="text-muted-foreground">{g.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="grid-lines bg-navy">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-16 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-navy-foreground">Ready to submit?</h2>
            <p className="mt-2 text-navy-foreground/70">Deadline: {importantDates.find((d) => d.highlight)?.date}</p>
          </div>
          <SubmitButton className="min-h-14 px-8 text-base" />
        </div>
      </section>
    </>
  );
}

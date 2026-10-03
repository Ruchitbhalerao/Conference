import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { conference, importantDates, topics } from "@/lib/conference";
import { NetworkPattern } from "@/components/site/NetworkPattern";
import { SubmitButton } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${conference.name} — IP, Innovation & Technology Transfer Conference` },
      { name: "description", content: conference.description },
      { property: "og:title", content: `${conference.name} — ${conference.fullName}` },
      { property: "og:description", content: conference.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const dates = importantDates.filter((d) => d.home);
  const deadline = importantDates.find((d) => d.highlight);
  return (
    <>
      <section className="grid-lines relative overflow-hidden bg-navy">
        <NetworkPattern className="pointer-events-none absolute -right-20 top-1/2 hidden w-[640px] -translate-y-1/2 lg:block" />
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">
          <p className="eyebrow">{conference.fullName}</p>
          <h1 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.08] text-navy-foreground md:text-6xl">
            {conference.theme}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-foreground/70">{conference.description}</p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-navy-foreground">
            <span className="flex items-center gap-2 font-semibold"><CalendarDays className="h-5 w-5 text-accent" />{conference.date}</span>
            <span className="flex items-center gap-2 font-semibold"><MapPin className="h-5 w-5 text-accent" />{conference.location}</span>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <SubmitButton className="min-h-12 px-6" />
            <Link to="/about" className="inline-flex min-h-12 items-center rounded-md border border-navy-foreground/30 px-6 text-sm font-semibold text-navy-foreground hover:bg-navy-foreground/10">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <p className="eyebrow">Important Dates</p>
          <ol className="mt-8 grid gap-8 md:grid-cols-4 md:gap-0">
            {dates.map((d) => (
              <li key={d.label} className="relative md:pr-6">
                <div className="mb-4 hidden items-center md:flex">
                  <span className={`h-3 w-3 rounded-full ${d.highlight ? "bg-primary ring-4 ring-primary/20" : "bg-accent"}`} />
                  <span className="h-px flex-1 bg-border" />
                </div>
                <p className={`text-2xl font-extrabold ${d.highlight ? "text-primary" : "text-navy"}`}>{d.date}</p>
                <p className="mt-1 text-sm text-muted-foreground">{d.label}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow">About the Conference</p>
          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Where research meets real-world impact.</h2>
        </div>
        <div>
          <p className="text-lg leading-relaxed">
            {conference.name} is an international forum on intellectual property, technology transfer and research
            commercialization — connecting universities, industry, policymakers and innovators to advance how
            knowledge moves from the lab to society.
          </p>
          <Link to="/about" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline">
            Learn more about the conference <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="rounded-xl border bg-card p-8 shadow-card md:p-12">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">Call for Papers</p>
                <h2 className="mt-3 max-w-xl text-3xl font-extrabold">{conference.theme}</h2>
              </div>
              <div className="shrink-0 rounded-lg border-l-4 border-primary bg-surface px-5 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Submission deadline</p>
                <p className="text-xl font-extrabold text-navy">{deadline?.date}</p>
              </div>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {topics.slice(0, 8).map((t) => (
                <li key={t} className="rounded-full border px-4 py-1.5 text-sm font-medium text-navy">{t}</li>
              ))}
              <li className="rounded-full px-4 py-1.5 text-sm text-muted-foreground">+ {topics.length - 8} more</li>
            </ul>
            <Link to="/call-for-papers" className="mt-10 inline-flex min-h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              View Call for Papers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

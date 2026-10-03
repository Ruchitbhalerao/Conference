import { createFileRoute } from "@tanstack/react-router";
import { Check, User } from "lucide-react";
import { audiences, committee, conference } from "@/lib/conference";
import { PageHero } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${conference.name}` },
      { name: "description", content: `Purpose, theme, audience and organizing committee of ${conference.fullName}.` },
      { property: "og:title", content: `About ${conference.name}` },
      { property: "og:description", content: `Purpose, theme, audience and committee of ${conference.fullName}.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const pillars = [
  "Intellectual Property", "Technology Transfer", "Innovation",
  "Research Commercialization", "Knowledge Exchange", "Industry–Academia Collaboration",
];

function Person({ name, institution, large = false }: { name: string; institution: string; large?: boolean }) {
  return (
    <div className={`flex items-center gap-4 rounded-lg border bg-card p-5 ${large ? "shadow-card" : ""}`}>
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-surface text-muted-foreground"><User className="h-5 w-5" /></span>
      <div>
        <p className="font-bold text-navy">{name}</p>
        <p className="text-sm text-muted-foreground">{institution}</p>
      </div>
    </div>
  );
}

function About() {
  return (
    <>
      <PageHero eyebrow="About" title="About the Conference"
        intro={`${conference.name} advances dialogue on how intellectual property and technology transfer turn research into innovation that serves society and the economy.`} />

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2">
        <div className="space-y-5 text-lg leading-relaxed">
          <p>The conference provides an international platform for scholars and practitioners to share research, policy insights and practical experience in managing, protecting and commercializing knowledge.</p>
          <p>Its objectives are to strengthen collaboration between academia and industry, promote best practice in technology transfer, and inform the next generation of IP policy.</p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {pillars.map((p) => (
            <li key={p} className="flex items-start gap-3 rounded-lg border p-4 font-semibold text-navy">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />{p}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center">
          <p className="eyebrow">Conference Theme</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">{conference.theme}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed">{conference.themeExplanation}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="eyebrow">Who Should Attend</p>
        <h2 className="mt-3 text-3xl font-extrabold">Built for the whole innovation ecosystem</h2>
        <ul className="mt-10 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <li key={a} className="bg-card p-6">
              <span className="text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-3 font-bold text-navy">{a}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="eyebrow">Organizing Committee</p>
          <h2 className="mt-3 text-3xl font-extrabold">Committee</h2>
          <h3 className="mt-10 text-sm font-bold uppercase tracking-wider text-muted-foreground">Conference Chair</h3>
          <div className="mt-4 max-w-sm"><Person {...committee.chair} large /></div>
          <h3 className="mt-10 text-sm font-bold uppercase tracking-wider text-muted-foreground">Organizing Committee</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">{committee.organizing.map((p, i) => <Person key={i} {...p} />)}</div>
          <h3 className="mt-10 text-sm font-bold uppercase tracking-wider text-muted-foreground">Scientific / Academic Committee</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">{committee.scientific.map((p, i) => <Person key={i} {...p} />)}</div>
        </div>
      </section>
    </>
  );
}

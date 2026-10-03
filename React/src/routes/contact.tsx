import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Building2, Mail, MapPin, Phone } from "lucide-react";
import { conference } from "@/lib/conference";
import { PageHero, SocialLinks } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${conference.name}` },
      { name: "description", content: `Get in touch with the ${conference.name} conference secretariat.` },
      { property: "og:title", content: `Contact the ${conference.name} Secretariat` },
      { property: "og:description", content: `Questions about submissions or attendance? Contact the ${conference.name} team.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const field = "mt-2 block w-full rounded-md border border-input bg-card px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-ring/20";

function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
    window.location.href = `mailto:${conference.email}?subject=${encodeURIComponent(String(f.get("subject")))}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const info = [
    { icon: Mail, label: "Email", value: conference.email, href: `mailto:${conference.email}` },
    { icon: Phone, label: "Phone", value: conference.phone },
    { icon: Building2, label: "Institution", value: conference.institution },
    { icon: MapPin, label: "Address", value: conference.address },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title="Contact Us" intro="Questions about submissions, attendance or partnerships? The secretariat is here to help." />
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <h2 className="text-2xl font-extrabold">Conference Secretariat</h2>
          <ul className="mt-8 space-y-6">
            {info.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex gap-4">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
                  {href ? <a href={href} className="font-semibold text-primary hover:underline">{value}</a> : <p className="font-semibold text-navy">{value}</p>}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8"><SocialLinks /></div>
        </div>
        <form onSubmit={onSubmit} className="rounded-xl border bg-card p-6 shadow-card md:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold text-navy">Name<input required name="name" className={field} /></label>
            <label className="text-sm font-semibold text-navy">Email<input required type="email" name="email" className={field} /></label>
          </div>
          <label className="mt-5 block text-sm font-semibold text-navy">Subject<input required name="subject" className={field} /></label>
          <label className="mt-5 block text-sm font-semibold text-navy">Message<textarea required name="message" rows={6} className={field} /></label>
          <button type="submit" className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary/90 sm:w-auto">
            Send Message
          </button>
          {sent && <p className="mt-4 text-sm text-accent">Your email app should open with your message ready to send.</p>}
        </form>
      </section>
    </>
  );
}

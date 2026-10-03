import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { conference } from "@/lib/conference";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/call-for-papers", label: "Call for Papers" },
  { to: "/contact", label: "Contact" },
] as const;

export function SubmitButton({ variant = "solid", className = "" }: { variant?: "solid" | "outline-light"; className?: string }) {
  const styles =
    variant === "solid"
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "border border-navy-foreground/30 text-navy-foreground hover:bg-navy-foreground/10";
  return (
    <a
      href={conference.submissionUrl}
      target={conference.submissionUrl === "#" ? undefined : "_blank"}
      rel="noreferrer"
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition-colors ${styles} ${className}`}
    >
      Submit a Paper <ArrowRight className="h-4 w-4" />
    </a>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-xs font-extrabold text-primary-foreground">IP</span>
      <span className={`text-base font-extrabold tracking-tight ${light ? "text-navy-foreground" : "text-navy"}`}>
        {conference.name}
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-navy-foreground/10 bg-navy">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo light />
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }}
              className="text-sm font-medium text-navy-foreground/70 transition-colors hover:text-navy-foreground"
              activeProps={{ className: "!text-navy-foreground" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link to="/contact" className="inline-flex min-h-10 items-center rounded-md border border-navy-foreground/25 px-4 text-sm font-semibold text-navy-foreground hover:bg-navy-foreground/10">
            Contact Us
          </Link>
          <SubmitButton className="min-h-10" />
        </div>
        <button className="p-2 text-navy-foreground md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-navy-foreground/10 px-5 pb-6 md:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
              className="block border-b border-navy-foreground/10 py-4 text-base font-medium text-navy-foreground">
              {n.label}
            </Link>
          ))}
          <div className="mt-5 grid gap-3">
            <SubmitButton />
            <Link to="/contact" onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center justify-center rounded-md border border-navy-foreground/25 text-sm font-semibold text-navy-foreground">
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function SocialLinks({ light = false }: { light?: boolean }) {
  const cls = `grid h-10 w-10 place-items-center rounded-md border transition-colors ${light ? "border-navy-foreground/20 text-navy-foreground/70 hover:text-navy-foreground" : "border-border text-navy hover:text-primary"}`;
  return (
    <div className="flex gap-2">
      <a href={conference.social.linkedin} aria-label="LinkedIn" className={cls}>
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.1 1.43-2.1 2.9V21H9z"/></svg>
      </a>
      <a href={conference.social.x} aria-label="X" className={cls}>
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M18.24 2.25h3.3l-7.2 8.24L22.8 21.75h-6.63l-5.2-6.8-5.95 6.8H1.7l7.7-8.8L1.25 2.25h6.8l4.7 6.2zm-1.16 17.52h1.83L7.08 4.13H5.12z"/></svg>
      </a>
      <a href={conference.social.youtube} aria-label="YouTube" className={cls}>
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6z"/></svg>
      </a>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-foreground/65">{conference.fullName}</p>
          <p className="mt-3 text-sm text-navy-foreground/65">Organized by {conference.institution}</p>
        </div>
        <nav className="flex flex-col gap-3 text-sm">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-navy-foreground/70 hover:text-navy-foreground">{n.label}</Link>
          ))}
        </nav>
        <div className="space-y-4 text-sm">
          <a href={`mailto:${conference.email}`} className="block text-navy-foreground/80 hover:text-navy-foreground">{conference.email}</a>
          <SocialLinks light />
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <p className="mx-auto max-w-6xl px-5 py-6 text-xs text-navy-foreground/50">
          © {new Date().getFullYear()} {conference.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="grid-lines relative overflow-hidden bg-navy">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold text-navy-foreground md:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-foreground/70">{intro}</p>}
      </div>
    </section>
  );
}

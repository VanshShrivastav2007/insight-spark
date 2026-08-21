import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowRight, BarChart3, Loader2, Lock, Mail } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RoleNav } from "@/components/app/RoleNav";
import {
  ORGANIZER_ACCOUNTS,
  ORGANIZER_DEMO_PASSWORD,
  findOrganizerByEmail,
  useOrganizerSession,
} from "@/lib/organizer-auth";

export const Route = createFileRoute("/organizer-login")({
  head: () => ({
    meta: [
      { title: "Organizer sign in — HackSort AI" },
      {
        name: "description",
        content:
          "Sign in to the HackSort AI organizer workspace to track submissions, problem landscape saturation and judge progress.",
      },
      { property: "og:title", content: "Organizer sign in — HackSort AI" },
      {
        property: "og:description",
        content: "Organizer access to competition setup, weighted criteria and submission analytics.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OrganizerLoginPage,
});

function OrganizerLoginPage() {
  const navigate = useNavigate();
  const { signIn } = useOrganizerSession();
  const [email, setEmail] = useState(ORGANIZER_ACCOUNTS[0]!.email);
  const [password, setPassword] = useState(ORGANIZER_DEMO_PASSWORD);
  const [remember, setRemember] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const account = findOrganizerByEmail(email);
    if (!account) {
      setError("No organizer account found for that email in this demo.");
      return;
    }
    if (password !== ORGANIZER_DEMO_PASSWORD) {
      setError(`Incorrect password. For this demo use "${ORGANIZER_DEMO_PASSWORD}".`);
      return;
    }
    setPending(true);
    window.setTimeout(() => {
      signIn(account, remember);
      toast.success(`Welcome back, ${account.name}`, { description: "Opening your organizer dashboard." });
      navigate({ to: "/organizer" });
    }, 500);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid-faint opacity-40" aria-hidden />
      <div className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-5 py-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <section className="hidden lg:block">
          <Link to="/" aria-label="HackSort AI home">
            <Logo showTagline />
          </Link>
          <h1 className="mt-10 text-4xl font-semibold leading-tight tracking-tight">
            See beyond the <span className="text-brand-gradient">submission.</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Organizers get the full landscape: intake volume, saturated versus underexplored problem areas, judge
            coverage and weighted criteria setup.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Live submission stats and processing pipeline",
              "Problem landscape saturation charts",
              "Judge roster progress and reminders",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-muted-foreground">
                <BarChart3 className="mt-0.5 size-4 shrink-0 text-primary" />
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section className="card-surface w-full p-6 sm:p-8">
          <div className="lg:hidden">
            <Logo />
          </div>
          <RoleNav className="mt-4" />
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">Organizer Login</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your organizer workspace.</p>

          <form className="mt-6 space-y-4" onSubmit={submit}>
            <div>
              <label htmlFor="org-email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="org-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-xl pl-9"
                  placeholder="you@organization.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="org-password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative mt-1.5">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="org-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-xl pl-9"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <Checkbox checked={remember} onCheckedChange={(v) => setRemember(Boolean(v))} /> Remember me
              </label>
              <button
                type="button"
                className="text-sm font-medium text-primary hover:underline"
                onClick={() =>
                  toast.info("Password reset link sent", {
                    description: `A simulated reset link was sent to ${email || "your inbox"}.`,
                  })
                }
              >
                Forgot password?
              </button>
            </div>

            {error ? (
              <p
                role="alert"
                className="rounded-xl border border-destructive/40 bg-destructive/12 px-3 py-2 text-xs text-destructive"
              >
                {error}
              </p>
            ) : null}

            <Button type="submit" className="h-11 w-full" disabled={pending}>
              {pending ? <Loader2 className="size-4 animate-spin" /> : null}
              {pending ? "Signing in..." : "Sign In"}
              {!pending ? <ArrowRight className="size-4" /> : null}
            </Button>
          </form>

          <div className="mt-6 rounded-xl border border-border bg-muted/40 p-3">
            <p className="text-xs font-semibold">Demo organizer accounts — password “{ORGANIZER_DEMO_PASSWORD}”</p>
            <ul className="mt-2 space-y-1">
              {ORGANIZER_ACCOUNTS.map((o) => (
                <li key={o.id}>
                  <button
                    type="button"
                    className="w-full rounded-lg px-2 py-1 text-left text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    onClick={() => {
                      setEmail(o.email);
                      setPassword(ORGANIZER_DEMO_PASSWORD);
                    }}
                  >
                    <span className="font-medium text-foreground">{o.name}</span> · {o.email}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowRight, KeyRound, Loader2, Lock, Mail, ShieldCheck, Ticket } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { RoleNav } from "@/components/app/RoleNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DEMO_PASSWORD, JUDGE_ACCOUNTS, findJudgeByEmail, useJudgeSession } from "@/lib/judge-auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Judge sign in — HackSort AI" },
      {
        name: "description",
        content:
          "Sign in to the HackSort AI judge workspace to review hackathon submissions, similarity clusters and potential hidden gems.",
      },
      { property: "og:title", content: "Judge sign in — HackSort AI" },
      {
        property: "og:description",
        content: "Secure judge access to priority queues, explainable AI signals and competition selection.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { signIn, redeemInviteCode } = useJudgeSession();
  const [email, setEmail] = useState("anita.rao@hacksort.ai");
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [remember, setRemember] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [invite, setInvite] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const judge = findJudgeByEmail(email);
    if (!judge) {
      setError("No judge account found for that email in this demo.");
      return;
    }
    if (password !== DEMO_PASSWORD) {
      setError(`Incorrect password. For this demo use "${DEMO_PASSWORD}".`);
      return;
    }
    setPending(true);
    window.setTimeout(() => {
      signIn(judge, remember);
      toast.success(`Welcome back, ${judge.name}`, { description: "Select the competition you want to judge." });
      navigate({ to: "/judge/competitions" });
    }, 550);
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
            HackSort AI reads the whole submission landscape, clusters near-identical ideas and surfaces potential
            hidden gems — high innovation and impact hidden behind a weak deck. You still decide the winners.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Priority queue built from explainable signals, not vibes",
              "Similarity clusters per category with key differences",
              "Every highlight shows its evidence — AI recommends, judge decides",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-muted-foreground">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section className="card-surface w-full p-6 sm:p-8">
          <div className="lg:hidden">
            <Logo />
          </div>
          <RoleNav className="mt-4 lg:mt-0" />
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">Judge Login</h2>
          <p className="text-sm text-muted-foreground">Welcome back</p>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your judge workspace.</p>

          <form className="mt-6 space-y-4" onSubmit={submit}>
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-xl pl-9"
                  placeholder="you@university.edu"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative mt-1.5">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
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
              <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/12 px-3 py-2 text-xs text-destructive">
                {error}
              </p>
            ) : null}

            <Button type="submit" className="h-11 w-full" disabled={pending}>
              {pending ? <Loader2 className="size-4 animate-spin" /> : null}
              {pending ? "Signing in..." : "Sign In"}
              {!pending ? <ArrowRight className="size-4" /> : null}
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-wider text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
          </div>

          <Button
            variant="outline"
            className="h-11 w-full"
            onClick={() =>
              toast.info("Google sign-in is UI-only in this demo", {
                description: "Use a demo judge email and the demo password to continue.",
              })
            }
          >
            <GoogleMark /> Continue with Google
          </Button>

          <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="mt-2 h-11 w-full">
                <Ticket className="size-4" /> Join Competition with Invite Code
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Join a competition</DialogTitle>
                <DialogDescription>
                  Enter the invite code your organizer shared. Try <strong>SPRING-2026</strong> or{" "}
                  <strong>CLIMATE-JAM</strong>.
                </DialogDescription>
              </DialogHeader>
              <Input
                value={invite}
                onChange={(e) => setInvite(e.target.value)}
                placeholder="SPRING-2026"
                aria-label="Invite code"
                className="h-11 rounded-xl uppercase"
              />
              <DialogFooter>
                <Button
                  onClick={() => {
                    const result = redeemInviteCode(invite);
                    if (!result.ok) {
                      toast.error("Invite code not recognised");
                      return;
                    }
                    setInviteOpen(false);
                    toast.success("Competition unlocked", {
                      description: "Sign in with your judge account to start reviewing.",
                    });
                  }}
                >
                  <KeyRound className="size-4" /> Redeem code
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="mt-6 rounded-xl border border-border bg-muted/40 p-3">
            <p className="text-xs font-semibold">Demo judge accounts — password “{DEMO_PASSWORD}”</p>
            <ul className="mt-2 space-y-1">
              {JUDGE_ACCOUNTS.map((j) => (
                <li key={j.id}>
                  <button
                    type="button"
                    className="w-full rounded-lg px-2 py-1 text-left text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    onClick={() => {
                      setEmail(j.email);
                      setPassword(DEMO_PASSWORD);
                    }}
                  >
                    <span className="font-medium text-foreground">{j.name}</span> — {j.email}
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Several judges share the same competition, each with their own account and private evaluations.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.3-1.66 3.8-5.5 3.8A6 6 0 1 1 12 6c1.7 0 2.9.7 3.6 1.3l2.6-2.5C16.7 3.4 14.6 2.5 12 2.5a9.5 9.5 0 1 0 0 19c5.5 0 9.1-3.8 9.1-9.2 0-.7-.1-1.3-.2-1.8H12Z"
      />
    </svg>
  );
}

import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  LayoutDashboard,
  ListOrdered,
  Layers,
  Gem,
  BarChart3,
  ClipboardCheck,
  Settings,
  Trophy,
  Users,
  FileStack,
  Map as MapIcon,
  Search,
  Menu,
  LogOut,
  Upload,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NOTIFICATIONS } from "@/lib/demo-data";
import { useJudgeSession } from "@/lib/judge-auth";
import { useNavigate } from "@tanstack/react-router";

export type Role = "judge" | "organizer" | "participant";

interface NavItem {
  label: string;
  to: string;
  icon: ReactNode;
}

const NAV: Record<Role, NavItem[]> = {
  judge: [
    { label: "Overview", to: "/judge", icon: <LayoutDashboard className="size-4" /> },
    { label: "Your Competitions", to: "/judge/competitions", icon: <Trophy className="size-4" /> },
    { label: "Priority Queue", to: "/judge/queue", icon: <ListOrdered className="size-4" /> },
    { label: "All Submissions", to: "/judge/submissions", icon: <FileStack className="size-4" /> },
    { label: "Submission Landscape", to: "/judge/landscape", icon: <MapIcon className="size-4" /> },
    { label: "Similarity Clusters", to: "/judge/clusters", icon: <Layers className="size-4" /> },
    { label: "Potential Hidden Gems", to: "/judge/gems", icon: <Gem className="size-4" /> },
    { label: "Analytics", to: "/judge/analytics", icon: <BarChart3 className="size-4" /> },
    { label: "Evaluations", to: "/judge/evaluations", icon: <ClipboardCheck className="size-4" /> },
  ],
  organizer: [
    { label: "Overview", to: "/organizer", icon: <LayoutDashboard className="size-4" /> },
    { label: "Competitions", to: "/organizer/competitions", icon: <Trophy className="size-4" /> },
    { label: "Submissions", to: "/organizer/submissions", icon: <FileStack className="size-4" /> },
    { label: "Submission Landscape", to: "/judge/landscape", icon: <MapIcon className="size-4" /> },
    { label: "Analytics", to: "/organizer/analytics", icon: <BarChart3 className="size-4" /> },
    { label: "Judges", to: "/organizer/judges", icon: <Users className="size-4" /> },
    { label: "Settings", to: "/organizer/settings", icon: <Settings className="size-4" /> },
  ],
  participant: [
    { label: "Submit Project", to: "/participant", icon: <Upload className="size-4" /> },
    { label: "Submission Landscape", to: "/judge/landscape", icon: <MapIcon className="size-4" /> },
  ],
};

const ROLE_LABEL: Record<Role, { name: string; person: string; initials: string }> = {
  judge: { name: "Judge workspace", person: "Dr. Anita Rao", initials: "AR" },
  organizer: { name: "Organizer console", person: "Meera Iyer", initials: "MI" },
  participant: { name: "Participant portal", person: "Team AgriRecover", initials: "AG" },
};

function SidebarNav({ role, onNavigate }: { role: Role; onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav aria-label="Primary" className="flex flex-1 flex-col gap-1 px-3">
      {NAV[role].map((item) => {
        const active = pathname === item.to || (item.to !== "/judge" && item.to !== "/organizer" && pathname.startsWith(item.to));
        return (
          <Link
            key={item.to + item.label}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
            )}
            aria-current={active ? "page" : undefined}
          >
            {item.icon}
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
      <div className="mt-auto space-y-2 p-1 pt-6">
        <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/50 p-3">
          <p className="text-xs font-semibold text-sidebar-foreground">AI assists. Humans decide.</p>
          <p className="mt-1 text-[11px] leading-relaxed text-sidebar-foreground/65">
            HackSort AI ranks attention, not winners. Every signal links back to the original submission.
          </p>
        </div>
        <Link
          to="/demo"
          onClick={onNavigate}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
        >
          <LogOut className="size-4" /> Switch role
        </Link>
      </div>
    </nav>
  );
}

export function AppShell({
  role,
  children,
  search,
  onSearchChange,
}: {
  role: Role;
  children: ReactNode;
  search?: string;
  onSearchChange?: (v: string) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { judge, competition, competitions, selectCompetition, signOut } = useJudgeSession();
  const isJudge = role === "judge";
  const meta =
    isJudge && judge
      ? { name: judge.affiliation, person: judge.name, initials: judge.initials }
      : ROLE_LABEL[role];

  return (
    <div className="min-h-screen bg-soft-gradient">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-sidebar py-5 lg:flex">
        <div className="px-5 pb-6">
          <Link to="/" aria-label="HackSort AI home">
            <Logo invert showTagline />
          </Link>
        </div>
        <SidebarNav role={role} />
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
          <div className="flex h-16 items-center gap-2 px-4 sm:gap-3 sm:px-6">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 bg-sidebar p-0 pt-5 text-sidebar-foreground">
                <SheetTitle className="px-5 pb-6 text-left">
                  <Logo invert showTagline />
                </SheetTitle>
                <div className="flex h-[calc(100%-6rem)] flex-col">
                  <SidebarNav role={role} onNavigate={() => setMobileOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>

            <div className="relative hidden min-w-0 flex-1 md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search ?? ""}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder="Search teams, projects or problems..."
                aria-label="Search teams, projects or problems"
                className="h-10 rounded-xl pl-9"
                disabled={!onSearchChange}
              />
            </div>
            <div className="flex-1 md:hidden" />

            <div className="hidden lg:block">
              {isJudge && competitions.length ? (
                <Select value={competition?.id ?? competitions[0]!.id} onValueChange={(v) => selectCompetition(v)}>
                  <SelectTrigger className="h-10 w-64 rounded-xl" aria-label="Competition selector">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {competitions.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Select defaultValue="hacksort-2026">
                  <SelectTrigger className="h-10 w-56 rounded-xl" aria-label="Competition selector">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hacksort-2026">National Innovation Hack 2026</SelectItem>
                    <SelectItem value="climate-jam">Climate Jam — Spring</SelectItem>
                    <SelectItem value="civic-sprint">Civic Tech Sprint</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                  <Bell className="size-5" />
                  <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 p-0">
                <p className="border-b border-border px-4 py-3 text-sm font-semibold">Activity</p>
                <ul className="divide-y divide-border">
                  {NOTIFICATIONS.map((n) => (
                    <li key={n.id} className="flex gap-3 px-4 py-3">
                      <span
                        className={cn(
                          "mt-1.5 size-2 shrink-0 rounded-full",
                          n.tone === "gem" ? "bg-gem" : n.tone === "warning" ? "bg-warning" : "bg-primary",
                        )}
                      />
                      <span>
                        <span className="block text-sm">{n.text}</span>
                        <span className="text-xs text-muted-foreground">{n.time}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 rounded-xl px-1.5 py-1 transition-colors hover:bg-secondary" aria-label="Profile">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-brand-gradient text-xs font-semibold text-primary-foreground">
                      {meta.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden text-left sm:block">
                    <span className="block text-xs font-semibold leading-tight">{meta.person}</span>
                    <span className="block text-[11px] leading-tight text-muted-foreground">{meta.name}</span>
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-56 text-sm">
                <p className="font-semibold">{meta.person}</p>
                <p className="text-xs text-muted-foreground">
                  {isJudge && competition ? competition.name : meta.name} · demo account
                </p>
                <div className="mt-3 flex flex-col gap-1">
                  {isJudge ? (
                    <>
                      <Link to="/judge/competitions" className="rounded-md px-2 py-1.5 hover:bg-secondary">
                        Switch competition
                      </Link>
                      <button
                        className="rounded-md px-2 py-1.5 text-left hover:bg-secondary"
                        onClick={() => {
                          signOut();
                          navigate({ to: "/login" });
                        }}
                      >
                        Sign out
                      </button>
                    </>
                  ) : null}
                  <Link to="/demo" className="rounded-md px-2 py-1.5 hover:bg-secondary">
                    Switch role
                  </Link>
                  <Link to="/" className="rounded-md px-2 py-1.5 hover:bg-secondary">
                    Back to landing page
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}

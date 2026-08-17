import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import {
  CATEGORY_CHART,
  SIGNAL_DISTRIBUTION,
  SCATTER_DATA,
  TREND_CHART,
  PROBLEM_AREAS,
} from "@/lib/demo-data";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
  "var(--muted-foreground)",
];

export function ChartCard({
  title,
  subtitle,
  children,
  action,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="card-surface p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          {subtitle ? <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: "var(--card)",
  fontSize: 12,
  color: "var(--foreground)",
};

export function CategoryChart() {
  return (
    <ChartCard title="Submissions by category" subtitle="500 analyzed submissions across 8 categories">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={CATEGORY_CHART} margin={{ left: -18, right: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="category" tick={{ fontSize: 11 }} interval={0} angle={-18} dy={10} height={50} stroke="var(--muted-foreground)" />
          <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {CATEGORY_CHART.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function CategoryPie() {
  return (
    <ChartCard title="Category distribution" subtitle="Share of the total submission pool">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie data={CATEGORY_CHART} dataKey="count" nameKey="category" innerRadius={55} outerRadius={95} paddingAngle={2}>
            {CATEGORY_CHART.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Tooltip contentStyle={tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function TrendChart() {
  return (
    <ChartCard title="Submission trend" subtitle="Submissions received vs analyzed">
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={TREND_CHART} margin={{ left: -18, right: 8 }}>
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.5} />
              <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0.04} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
          <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
          <Tooltip contentStyle={tooltipStyle} />
          <Area type="monotone" dataKey="submissions" stroke="var(--chart-2)" fill="url(#g1)" strokeWidth={2} />
          <Area type="monotone" dataKey="analyzed" stroke="var(--chart-4)" fill="transparent" strokeWidth={2} strokeDasharray="4 4" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function SignalDistributionChart() {
  return (
    <ChartCard
      title="Innovation Signal distribution"
      subtitle="Relative differentiation across the pool — not an absolute innovation score"
    >
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={SIGNAL_DISTRIBUTION} margin={{ left: -18, right: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="band" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
          <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="var(--chart-2)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function SaturationChart() {
  const data = [...PROBLEM_AREAS].sort((a, b) => b.count - a.count).slice(0, 12);
  return (
    <ChartCard title="Problem saturation" subtitle="Largest problem areas by submission count">
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={data} layout="vertical" margin={{ left: 90, right: 16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
          <YAxis type="category" dataKey="area" tick={{ fontSize: 10 }} width={150} stroke="var(--muted-foreground)" />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="count" radius={[0, 8, 8, 0]}>
            {data.map((d, i) => (
              <Cell
                key={i}
                fill={
                  d.saturation === "Highly Saturated"
                    ? "var(--chart-6)"
                    : d.saturation === "Medium"
                      ? "var(--chart-5)"
                      : "var(--chart-4)"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function InnovationVsPresentationScatter() {
  const overlooked = SCATTER_DATA.filter((d) => d.overlooked);
  const rest = SCATTER_DATA.filter((d) => !d.overlooked);
  return (
    <ChartCard
      title="Innovation Signal vs Presentation Quality"
      subtitle="Top-left quadrant = strong project signals, weak presentation — potentially overlooked candidates"
    >
      <ResponsiveContainer width="100%" height={340}>
        <ScatterChart margin={{ left: -12, right: 12, top: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            type="number"
            dataKey="x"
            name="Presentation Quality"
            domain={[0, 100]}
            tick={{ fontSize: 11 }}
            stroke="var(--muted-foreground)"
            label={{ value: "Presentation Quality", position: "insideBottom", offset: -4, fontSize: 11 }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Innovation Signal"
            domain={[0, 100]}
            tick={{ fontSize: 11 }}
            stroke="var(--muted-foreground)"
          />
          <ZAxis range={[45, 45]} />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(v: number, name: string) => [v, name]}
            labelFormatter={() => ""}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Scatter name="Submissions" data={rest} fill="var(--chart-1)" fillOpacity={0.35} />
          <Scatter name="Overlooked candidates" data={overlooked} fill="var(--gem)" />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

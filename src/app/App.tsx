import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard, Sparkles, BarChart2, Users, GraduationCap,
  ShieldCheck, Bell, Settings, LogOut, Search, TrendingUp,
  AlertTriangle, CheckCircle, XCircle, Info, Briefcase, Star,
  Award, Clock, Calendar, ArrowRight, ChevronRight, Plus,
  Download, Eye, EyeOff, Edit, Trash2, Activity, Target, Brain,
  Building2, Shield, Lock, Mail, UserCheck, AlertCircle, Layers,
  MapPin, Phone, Percent, RefreshCw,IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII$IIIIIIIIIIIIII
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip,
} from "recharts";

// ─── TYPES ───────────────────────────────────────────────────────────────────
type Screen =
  | "landing" | "login" | "dashboard" | "matchmaker" | "bench"
  | "directory" | "profile" | "intern" | "security" | "notifications" | "settings";

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
};
const slideRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
};

// ─── ANIMATED PRIMITIVES ──────────────────────────────────────────────────────
function AnimatedNumber({ target, duration = 1100 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [target, duration]);
  return <>{count}</>;
}

function AnimatedBar({ value, delay = 0, className }: { value: number; delay?: number; className: string }) {
  return (
    <motion.div
      className={className}
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 0.9, delay, ease: [0.4, 0, 0.2, 1] }}
    />
  );
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const employees = [
  { id: 1, name: "Sarah Chen", role: "Senior Software Engineer", dept: "Engineering", avatar: "SC", skills: ["React", "TypeScript", "Node.js", "AWS"], available: true, utilization: 85, experience: "7 years", rating: 4.9, location: "San Francisco, CA", email: "s.chen@nexus.corp", phone: "+1 (415) 555-0142" },
  { id: 2, name: "Marcus Williams", role: "Data Scientist", dept: "Data & Analytics", avatar: "MW", skills: ["Python", "ML", "TensorFlow", "SQL"], available: false, utilization: 100, experience: "5 years", rating: 4.7, location: "New York, NY", email: "m.williams@nexus.corp", phone: "+1 (212) 555-0198" },
  { id: 3, name: "Priya Patel", role: "UX Designer", dept: "Design", avatar: "PP", skills: ["Figma", "UX Research", "Prototyping", "Accessibility"], available: true, utilization: 60, experience: "4 years", rating: 4.8, location: "Austin, TX", email: "p.patel@nexus.corp", phone: "+1 (512) 555-0267" },
  { id: 4, name: "James O'Brien", role: "DevOps Engineer", dept: "Infrastructure", avatar: "JO", skills: ["Kubernetes", "Terraform", "CI/CD", "AWS"], available: false, utilization: 95, experience: "6 years", rating: 4.6, location: "Chicago, IL", email: "j.obrien@nexus.corp", phone: "+1 (312) 555-0334" },
  { id: 5, name: "Aisha Mohammed", role: "Product Manager", dept: "Product", avatar: "AM", skills: ["Roadmapping", "Agile", "Jira", "Analytics"], available: true, utilization: 75, experience: "8 years", rating: 4.9, location: "Seattle, WA", email: "a.mohammed@nexus.corp", phone: "+1 (206) 555-0421" },
  { id: 6, name: "Daniel Park", role: "Backend Engineer", dept: "Engineering", avatar: "DP", skills: ["Go", "PostgreSQL", "Redis", "Microservices"], available: true, utilization: 70, experience: "3 years", rating: 4.5, location: "San Francisco, CA", email: "d.park@nexus.corp", phone: "+1 (415) 555-0518" },
  { id: 7, name: "Lisa Huang", role: "ML Engineer", dept: "Data & Analytics", avatar: "LH", skills: ["PyTorch", "MLOps", "Python", "Spark"], available: false, utilization: 92, experience: "5 years", rating: 4.8, location: "Boston, MA", email: "l.huang@nexus.corp", phone: "+1 (617) 555-0612" },
  { id: 8, name: "Carlos Rivera", role: "QA Engineer", dept: "Quality", avatar: "CR", skills: ["Selenium", "Jest", "Cypress", "API Testing"], available: true, utilization: 45, experience: "4 years", rating: 4.4, location: "Miami, FL", email: "c.rivera@nexus.corp", phone: "+1 (305) 555-0709" },
  { id: 9, name: "Nina Okafor", role: "Security Analyst", dept: "Security", avatar: "NO", skills: ["SIEM", "Pen Testing", "SOC", "Compliance"], available: true, utilization: 80, experience: "6 years", rating: 4.7, location: "Washington, DC", email: "n.okafor@nexus.corp", phone: "+1 (202) 555-0803" },
  { id: 10, name: "Tom Bergmann", role: "Full Stack Engineer", dept: "Engineering", avatar: "TB", skills: ["React", "Python", "Docker", "GraphQL"], available: false, utilization: 98, experience: "5 years", rating: 4.6, location: "Denver, CO", email: "t.bergmann@nexus.corp", phone: "+1 (720) 555-0997" },
  { id: 11, name: "Elena Vasquez", role: "Cloud Architect", dept: "Infrastructure", avatar: "EV", skills: ["Azure", "AWS", "GCP", "Terraform"], available: true, utilization: 55, experience: "9 years", rating: 4.9, location: "San Jose, CA", email: "e.vasquez@nexus.corp", phone: "+1 (408) 555-0145" },
  { id: 12, name: "Kevin Liu", role: "Frontend Engineer", dept: "Engineering", avatar: "KL", skills: ["Vue.js", "CSS", "WebGL", "Performance"], available: false, utilization: 88, experience: "3 years", rating: 4.3, location: "Portland, OR", email: "k.liu@nexus.corp", phone: "+1 (503) 555-0234" },
];

const workforceData = [
  { month: "Jan", assigned: 138, available: 42, interns: 18 },
  { month: "Feb", assigned: 145, available: 38, interns: 20 },
  { month: "Mar", assigned: 152, available: 35, interns: 22 },
  { month: "Apr", assigned: 148, available: 40, interns: 24 },
  { month: "May", assigned: 162, available: 31, interns: 26 },
  { month: "Jun", assigned: 158, available: 33, interns: 24 },
  { month: "Jul", assigned: 171, available: 28, interns: 28 },
  { month: "Aug", assigned: 175, available: 25, interns: 30 },
];

const allocationData = [
  { name: "Assigned", value: 175, color: "#1B3A8F" },
  { name: "Available", value: 34, color: "#10B981" },
  { name: "On Leave", value: 12, color: "#F59E0B" },
  { name: "Interns", value: 30, color: "#8B5CF6" },
];

const deptUtilization = [
  { dept: "Engineering", util: 89 },
  { dept: "Design", util: 72 },
  { dept: "Product", util: 95 },
  { dept: "Data & AI", util: 88 },
  { dept: "DevOps", util: 100 },
  { dept: "QA", util: 58 },
  { dept: "Security", util: 74 },
];

const skillInventory = [
  { skill: "React / TS", count: 28, needed: 35 },
  { skill: "Python / ML", count: 22, needed: 30 },
  { skill: "DevOps", count: 15, needed: 18 },
  { skill: "Cloud Arch", count: 12, needed: 20 },
  { skill: "Data Eng", count: 18, needed: 22 },
  { skill: "Security", count: 8, needed: 14 },
];

const auditTrendData = [
  { time: "00:00", info: 12, warning: 3, critical: 0 },
  { time: "04:00", info: 8, warning: 2, critical: 0 },
  { time: "08:00", info: 45, warning: 12, critical: 2 },
  { time: "10:00", info: 62, warning: 18, critical: 1 },
  { time: "12:00", info: 58, warning: 14, critical: 3 },
  { time: "14:00", info: 71, warning: 22, critical: 0 },
  { time: "16:00", info: 84, warning: 19, critical: 4 },
  { time: "18:00", info: 52, warning: 11, critical: 1 },
  { time: "20:00", info: 34, warning: 8, critical: 0 },
  { time: "22:00", info: 18, warning: 4, critical: 0 },
];

const auditLogs = [
  { id: 1, time: "16:42:18", severity: "CRITICAL", user: "admin@nexus.corp", action: "Bulk permission export triggered — IAM module", ip: "192.168.1.104", module: "IAM" },
  { id: 2, time: "16:38:05", severity: "WARNING", user: "j.obrien@nexus.corp", action: "Failed login attempt (3rd consecutive)", ip: "10.0.2.45", module: "Auth" },
  { id: 3, time: "16:31:22", severity: "INFO", user: "n.okafor@nexus.corp", action: "Security policy updated: MFA required for all admin roles", ip: "10.0.1.22", module: "Policy" },
  { id: 4, time: "16:28:47", severity: "INFO", user: "s.chen@nexus.corp", action: "Employee profile updated: skill matrix modified", ip: "10.0.3.88", module: "HR" },
  { id: 5, time: "16:19:33", severity: "WARNING", user: "unknown", action: "API rate limit exceeded from external IP address", ip: "203.0.113.47", module: "API Gateway" },
  { id: 6, time: "16:12:01", severity: "CRITICAL", user: "system", action: "Database backup verification failed — integrity check error", ip: "internal", module: "Database" },
  { id: 7, time: "15:58:44", severity: "INFO", user: "a.mohammed@nexus.corp", action: "Project 'Orion' resource allocation updated", ip: "10.0.1.67", module: "Resource" },
  { id: 8, time: "15:44:19", severity: "INFO", user: "p.patel@nexus.corp", action: "New intern onboarding completed: Raj Mehta", ip: "10.0.2.31", module: "HR" },
  { id: 9, time: "15:32:55", severity: "WARNING", user: "system", action: "Skill gap detected: Cloud Architecture — 8 of 20 positions filled", ip: "internal", module: "Analytics" },
  { id: 10, time: "15:18:07", severity: "INFO", user: "m.williams@nexus.corp", action: "Report exported: Q2 Workforce Utilization Summary", ip: "10.0.1.93", module: "Reports" },
  { id: 11, time: "15:09:42", severity: "INFO", user: "admin@nexus.corp", action: "New role created: Senior Data Architect", ip: "10.0.0.5", module: "IAM" },
  { id: 12, time: "14:55:18", severity: "WARNING", user: "t.bergmann@nexus.corp", action: "Attempted access to restricted HR module — denied", ip: "10.0.3.72", module: "Auth" },
];

const notificationsData = [
  { id: 1, type: "critical", category: "Security", title: "Critical: Unauthorized Access Attempt", desc: "Multiple failed login attempts detected for admin account from IP 203.0.113.47.", time: "5 min ago", read: false },
  { id: 2, type: "warning", category: "Skill Gap", title: "Skill Shortage Alert: Cloud Architecture", desc: "Only 8/20 required Cloud Architects are currently available. Projects Orion and Atlas may be at risk.", time: "23 min ago", read: false },
  { id: 3, type: "warning", category: "Resource", title: "High Utilization Warning: DevOps Team", desc: "DevOps department is at 100% utilization. New project requests cannot be fulfilled.", time: "1 hr ago", read: false },
  { id: 4, type: "info", category: "Assignment", title: "Resource Allocated: Sarah Chen → Project Nexus", desc: "Sarah Chen assigned as lead frontend engineer. Project start: Jul 1.", time: "2 hr ago", read: true },
  { id: 5, type: "success", category: "Mentorship", title: "Intern Milestone Achieved: Raj Mehta", desc: "Intern Raj Mehta completed the React Foundations roadmap milestone.", time: "3 hr ago", read: true },
  { id: 6, type: "info", category: "Skill Gap", title: "Upskilling Opportunity: QA Team", desc: "QA team bench utilization at 42%. Recommend enrolling 5 engineers in automation training.", time: "4 hr ago", read: true },
  { id: 7, type: "warning", category: "Project", title: "Project Atlas Timeline at Risk", desc: "Project Atlas is 2 weeks behind schedule due to unresolved Cloud Architecture gap.", time: "Yesterday", read: true },
  { id: 8, type: "info", category: "System", title: "System Maintenance Scheduled", desc: "Maintenance window: Jun 29, 02:00–04:00 UTC. Auth services briefly unavailable.", time: "Yesterday", read: true },
];

const recentActivity = [
  { user: "Sarah Chen", action: "assigned to Project Nexus as Lead Frontend Engineer", time: "2 min ago", avatar: "SC" },
  { user: "Marcus Williams", action: "updated skill proficiency: TensorFlow → Expert", time: "18 min ago", avatar: "MW" },
  { user: "Priya Patel", action: "completed certification: UXMC Level 2", time: "1 hr ago", avatar: "PP" },
  { user: "Aisha Mohammed", action: "created project requirement: AI Dashboard v2", time: "2 hr ago", avatar: "AM" },
  { user: "James O'Brien", action: "returned from leave — status now Available", time: "3 hr ago", avatar: "JO" },
  { user: "System", action: "Skill gap alert triggered: Security team understaffed", time: "4 hr ago", avatar: "SY" },
];

const internData = {
  name: "Raj Mehta",
  role: "Software Engineering Intern",
  dept: "Engineering",
  mentor: employees[0],
  goals: ["Master React + TypeScript", "Contribute to 2 production features", "Complete AWS Cloud Practitioner", "Learn agile sprint process"],
  milestones: [
    { label: "Onboarding & Setup", status: "completed", date: "Jun 5" },
    { label: "React Foundations", status: "completed", date: "Jun 12" },
    { label: "First Feature Contribution", status: "completed", date: "Jun 20" },
    { label: "TypeScript Deep Dive", status: "active", date: "Jul 3" },
    { label: "AWS Cloud Practitioner Exam", status: "pending", date: "Jul 18" },
    { label: "Full Feature Ownership", status: "pending", date: "Aug 1" },
    { label: "Capstone Project Demo", status: "pending", date: "Aug 22" },
  ],
  skills: [
    { name: "React", progress: 78 },
    { name: "TypeScript", progress: 52 },
    { name: "Node.js", progress: 44 },
    { name: "Git / GitHub", progress: 88 },
    { name: "AWS", progress: 30 },
    { name: "Agile / Scrum", progress: 65 },
  ],
};

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function AvBadge({ initials, size = "md" }: { initials: string; size?: "sm" | "md" | "lg" }) {
  const palettes = [
    "bg-blue-100 text-blue-700", "bg-violet-100 text-violet-700",
    "bg-emerald-100 text-emerald-700", "bg-amber-100 text-amber-700",
    "bg-rose-100 text-rose-700", "bg-cyan-100 text-cyan-700",
  ];
  const c = palettes[initials.charCodeAt(0) % palettes.length];
  const sz = size === "sm" ? "w-8 h-8 text-xs" : size === "lg" ? "w-14 h-14 text-base" : "w-10 h-10 text-sm";
  return (
    <div className={`${sz} ${c} rounded-full flex items-center justify-center font-semibold flex-shrink-0 select-none`}>
      {initials}
    </div>
  );
}

function StatusDot({ available }: { available: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${available ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${available ? "bg-emerald-500" : "bg-slate-400"}`} />
      {available ? "Available" : "Assigned"}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const map: Record<string, { cls: string; icon: React.ReactNode }> = {
    INFO: { cls: "bg-blue-50 text-blue-700 border border-blue-200", icon: <Info className="w-3 h-3" /> },
    WARNING: { cls: "bg-amber-50 text-amber-700 border border-amber-200", icon: <AlertTriangle className="w-3 h-3" /> },
    CRITICAL: { cls: "bg-red-50 text-red-700 border border-red-200", icon: <XCircle className="w-3 h-3" /> },
  };
  const s = map[severity] ?? map.INFO;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold flex-shrink-0 ${s.cls}`}>
      {s.icon} {severity}
    </span>
  );
}

function StatCard({ icon, label, value, numValue, delta, color, delay = 0 }: {
  icon: React.ReactNode; label: string; value: string; numValue?: number;
  delta?: string; color: string; delay?: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -3, boxShadow: "0 12px 28px rgba(0,0,0,0.09)" }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="bg-card rounded-xl p-5 border border-border shadow-sm cursor-default"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
          <p className="text-2xl font-display font-bold text-foreground">
            {numValue !== undefined ? (
              <><AnimatedNumber target={numValue} />{value.replace(String(numValue), "")}</>
            ) : value}
          </p>
          {delta && (
            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-0.5 font-medium">
              <TrendingUp className="w-3 h-3" /> {delta}
            </p>
          )}
        </div>
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: delay + 0.2, duration: 0.4, type: "spring" }}
          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );
}

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-xl p-3 text-xs">
      <p className="font-semibold text-slate-700 mb-1.5">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.stroke || p.fill }} className="mb-0.5">{p.name}: <strong>{p.value}</strong></p>
      ))}
    </div>
  );
};

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
function LandingPage({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#1B3A8F] rounded-lg flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-[#0B1437] text-lg">NexusHR</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-500 font-medium">
            {["Platform", "Solutions", "Pricing", "Customers"].map(l => (
              <a key={l} href="#" className="hover:text-slate-900 transition-colors">{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate("login")} className="text-sm text-slate-600 font-medium hover:text-slate-900 transition-colors px-4 py-2">Sign In</button>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(27,58,143,0.3)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("login")}
              className="text-sm bg-[#1B3A8F] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#162F76] transition-colors"
            >
              Request Demo
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-b from-[#EEF3FD] to-white">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}
          className="absolute top-16 right-[8%] w-[480px] h-[480px] bg-blue-200/25 rounded-full blur-3xl pointer-events-none" />
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, delay: 0.2 }}
          className="absolute -bottom-12 left-[5%] w-[360px] h-[360px] bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.88, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-8">
            <Sparkles className="w-3 h-3" /> Now with AI-Powered Resource Matching
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
            className="text-5xl md:text-6xl font-display font-bold text-[#0B1437] leading-tight mb-6 max-w-4xl mx-auto">
            Your Workforce,<br /><span className="text-[#1B3A8F]">Fully Visible.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.22 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            NexusHR unifies skill tracking, resource allocation, bench management, and talent intelligence — giving enterprise HR teams complete workforce clarity.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.34 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <motion.button whileHover={{ scale: 1.04, boxShadow: "0 12px 32px rgba(27,58,143,0.32)" }} whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("login")}
              className="flex items-center gap-2 bg-[#1B3A8F] text-white font-semibold px-6 py-3.5 rounded-xl transition-colors">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate("login")}
              className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold px-6 py-3.5 rounded-xl hover:border-slate-300 transition-all">
              <Eye className="w-4 h-4" /> View Live Demo
            </motion.button>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {[{ v: "340+", l: "Enterprises Using NexusHR" }, { v: "280K+", l: "Employees Managed" }, { v: "1.2M+", l: "Skills Tracked Daily" }, { v: "94%", l: "AI Match Accuracy" }].map(s => (
              <motion.div key={s.l} variants={scaleIn} whileHover={{ y: -4, boxShadow: "0 10px 24px rgba(0,0,0,0.1)" }}
                className="bg-white rounded-xl border border-slate-100 p-5 text-center shadow-sm cursor-default">
                <div className="text-3xl font-display font-bold text-[#1B3A8F] mb-1">{s.v}</div>
                <div className="text-xs text-slate-500 font-medium">{s.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45 }} className="text-center mb-14">
            <h2 className="text-3xl font-display font-bold text-[#0B1437] mb-3">Everything your HR team needs</h2>
            <p className="text-slate-500 max-w-xl mx-auto">One unified platform for every workforce challenge.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Brain className="w-5 h-5 text-[#1B3A8F]" />, title: "AI Best-Fit Matching", desc: "Automatically rank employees for projects based on skill proficiency, availability, and experience." },
              { icon: <BarChart2 className="w-5 h-5 text-[#1B3A8F]" />, title: "Bench Strength Analytics", desc: "Real-time workforce utilization, department capacity, skill inventory, and gap forecasting." },
              { icon: <GraduationCap className="w-5 h-5 text-[#1B3A8F]" />, title: "Intern Mentorship Portal", desc: "Structured learning roadmaps, AI mentor pairing, milestone tracking, and progress analytics." },
              { icon: <ShieldCheck className="w-5 h-5 text-[#1B3A8F]" />, title: "Security Audit Trail", desc: "SOC-grade audit logging with severity classification and real-time activity monitoring." },
              { icon: <Users className="w-5 h-5 text-[#1B3A8F]" />, title: "Employee Skill Matrix", desc: "Searchable skill database with proficiency ratings, certification tracking, and expertise maps." },
              { icon: <Activity className="w-5 h-5 text-[#1B3A8F]" />, title: "Resource Allocation", desc: "Assign, track, and optimize resource allocation across projects with live utilization indicators." },
            ].map(f => (
              <motion.div key={f.title} variants={fadeUp} whileHover={{ y: -5, boxShadow: "0 14px 32px rgba(0,0,0,0.08)", borderColor: "#BFDBFE" }}
                className="bg-[#F8FAFD] rounded-xl p-6 border border-slate-100 cursor-default transition-colors">
                <motion.div whileHover={{ scale: 1.1, rotate: 3 }} transition={{ type: "spring", stiffness: 400 }}
                  className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">{f.icon}</motion.div>
                <h3 className="font-display font-semibold text-[#0B1437] mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#F3F6FB]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="text-center mb-14">
            <h2 className="text-3xl font-display font-bold text-[#0B1437] mb-3">Built for every role</h2>
            <p className="text-slate-500">Tailored experiences for HR Managers, Center Managers, Admins, Employees, and Interns.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { role: "HR Managers & Admins", icon: <Building2 className="w-5 h-5" />, points: ["Full workforce visibility dashboard", "Skill gap alerting and forecasting", "AI-powered project staffing", "Compliance and audit reporting"] },
              { role: "Center Managers", icon: <Target className="w-5 h-5" />, points: ["Department utilization metrics", "Resource allocation controls", "Bench strength monitoring", "Project timeline insights"] },
              { role: "Employees & Interns", icon: <Star className="w-5 h-5" />, points: ["Personal skill profile management", "Certification tracking", "Mentorship pairing", "Structured learning roadmaps"] },
            ].map(r => (
              <motion.div key={r.role} variants={fadeUp} whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(0,0,0,0.08)" }}
                className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm cursor-default">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 bg-[#1B3A8F] rounded-lg flex items-center justify-center text-white">{r.icon}</div>
                  <h3 className="font-display font-semibold text-[#0B1437]">{r.role}</h3>
                </div>
                <ul className="space-y-2.5">
                  {r.points.map(p => (
                    <li key={p} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" /> {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#0B1437] relative overflow-hidden">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
          className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-display font-bold text-white mb-4">Ready to transform your workforce strategy?</h2>
          <p className="text-blue-300 text-lg mb-8">Join 340+ enterprises already using NexusHR to build smarter, more resilient teams.</p>
          <div className="flex items-center justify-center gap-4">
            <motion.button whileHover={{ scale: 1.04, boxShadow: "0 10px 28px rgba(255,255,255,0.15)" }} whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("login")} className="flex items-center gap-2 bg-white text-[#1B3A8F] font-semibold px-6 py-3.5 rounded-xl hover:bg-blue-50 transition-all">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 border border-blue-700 text-blue-200 font-semibold px-6 py-3.5 rounded-xl hover:border-blue-500 transition-all">
              Talk to Sales
            </motion.button>
          </div>
        </motion.div>
      </section>

      <footer className="py-10 bg-[#060E26] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#1B3A8F] rounded-lg flex items-center justify-center">
              <Layers className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-bold text-white text-sm">NexusHR</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            {["Privacy", "Terms", "Security", "Status", "Docs"].map(l => (
              <a key={l} href="#" className="hover:text-slate-300 transition-colors">{l}</a>
            ))}
          </div>
          <p className="text-xs text-slate-600">© 2026 NexusHR Corp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin, onNavigate }: { onLogin: () => void; onNavigate: (s: Screen) => void }) {
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("admin@nexus.corp");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [forgot, setForgot] = useState(false);

  if (forgot) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#F3F6FB] flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.92, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-md p-8">
          <button onClick={() => setForgot(false)} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors">
            <ChevronRight className="w-4 h-4 rotate-180" /> Back to sign in
          </button>
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
            <Mail className="w-6 h-6 text-[#1B3A8F]" />
          </div>
          <h2 className="text-xl font-display font-bold text-[#0B1437] mb-2">Reset your password</h2>
          <p className="text-sm text-slate-500 mb-6">Enter your work email and we'll send a secure reset link.</p>
          <input type="email" placeholder="work@company.com" className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" />
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className="w-full bg-[#1B3A8F] text-white font-semibold py-3 rounded-xl hover:bg-[#162F76] transition-colors">
            Send Reset Link
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F6FB] flex">
      <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="hidden lg:flex flex-col justify-between w-[45%] bg-[#0B1437] p-12 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#1B3A8F] rounded-lg flex items-center justify-center">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-white text-lg">NexusHR</span>
        </div>
        <div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-display font-bold text-white leading-tight mb-4">
            Enterprise workforce<br />intelligence at scale.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}
            className="text-blue-300 text-base leading-relaxed mb-8">
            Manage skills, match talent to projects, and gain real-time visibility into your entire workforce.
          </motion.p>
          <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-3">
            {["AI-powered resource matching", "Real-time skill gap analytics", "SOC-grade security auditing"].map(f => (
              <motion.div key={f} variants={fadeUp} className="flex items-center gap-2.5 text-sm text-blue-200">
                <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" /> {f}
              </motion.div>
            ))}
          </motion.div>
        </div>
        <p className="text-blue-900 text-xs">© 2026 NexusHR Corp. Enterprise Edition v4.2</p>
      </motion.div>

      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }} className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-2xl font-display font-bold text-[#0B1437] mb-1">Welcome back</h2>
            <p className="text-sm text-slate-500">Sign in to your NexusHR account</p>
          </div>
          <div className="mb-6">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Access Role</label>
            <div className="grid grid-cols-2 gap-2">
              {[{ id: "admin", label: "Admin / HR" }, { id: "manager", label: "Center Manager" }, { id: "employee", label: "Employee" }, { id: "intern", label: "Intern" }].map(r => (
                <motion.button key={r.id} onClick={() => setRole(r.id)} whileTap={{ scale: 0.97 }}
                  className={`py-2.5 px-3 rounded-lg text-sm font-medium border transition-all ${role === r.id ? "bg-[#1B3A8F] border-[#1B3A8F] text-white shadow-md shadow-blue-900/15" : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                  {r.label}
                </motion.button>
              ))}
            </div>
          </div>
          <div className="space-y-4 mb-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" placeholder="you@company.com" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" placeholder="••••••••" />
                <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-6 text-sm">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
              <input type="checkbox" className="rounded border-slate-300" /> Remember me
            </label>
            <button onClick={() => setForgot(true)} className="text-[#1B3A8F] font-medium hover:underline">Forgot password?</button>
          </div>
          <motion.button whileHover={{ scale: 1.015, boxShadow: "0 10px 28px rgba(27,58,143,0.3)" }} whileTap={{ scale: 0.97 }}
            onClick={onLogin} className="w-full bg-[#1B3A8F] text-white font-semibold py-3.5 rounded-xl hover:bg-[#162F76] transition-colors mb-4">
            Sign in securely
          </motion.button>
          <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs text-blue-700">
            <Shield className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            Secured with enterprise SSO and 2FA. Your session is monitored for security compliance.
          </div>
          <p className="mt-4 text-center text-xs text-slate-500">
            Need an account?{" "}
            <button onClick={() => onNavigate("landing")} className="text-[#1B3A8F] font-medium hover:underline">Contact your administrator</button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
function Dashboard({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-display font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Monday, June 23, 2026 — Q2 Week 12</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground border border-border rounded-lg px-3 py-2 hover:bg-muted transition-colors">
            <Download className="w-3.5 h-3.5" /> Export
          </motion.button>
          <motion.button whileHover={{ scale: 1.02, rotate: 15 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground border border-border rounded-lg px-3 py-2 hover:bg-muted transition-colors">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </motion.button>
        </div>
      </motion.div>

      <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard icon={<Users className="w-5 h-5 text-[#1B3A8F]" />} label="Total Employees" value="251" numValue={251} delta="+8 this month" color="bg-blue-50" />
        <StatCard icon={<UserCheck className="w-5 h-5 text-emerald-600" />} label="Available Resources" value="34" numValue={34} color="bg-emerald-50" delay={0.07} />
        <StatCard icon={<Briefcase className="w-5 h-5 text-violet-600" />} label="Assigned Resources" value="175" numValue={175} color="bg-violet-50" delay={0.14} />
        <StatCard icon={<Target className="w-5 h-5 text-amber-600" />} label="Active Projects" value="24" numValue={24} delta="+3 this month" color="bg-amber-50" delay={0.21} />
        <StatCard icon={<GraduationCap className="w-5 h-5 text-cyan-600" />} label="Active Interns" value="30" numValue={30} color="bg-cyan-50" delay={0.28} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.4 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-display font-semibold text-foreground">Workforce Trends</h3>
              <p className="text-xs text-muted-foreground">Jan – Aug 2026</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#1B3A8F]" /> Assigned</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" /> Available</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-violet-400" /> Interns</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={workforceData} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="gA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B3A8F" stopOpacity={0.15} /><stop offset="95%" stopColor="#1B3A8F" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gB" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.12} /><stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="assigned" stroke="#1B3A8F" strokeWidth={2} fill="url(#gA)" name="Assigned" />
              <Area type="monotone" dataKey="available" stroke="#10B981" strokeWidth={2} fill="url(#gB)" name="Available" />
              <Area type="monotone" dataKey="interns" stroke="#8B5CF6" strokeWidth={2} fill="none" strokeDasharray="4 4" name="Interns" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-display font-semibold text-foreground mb-1">Resource Allocation</h3>
          <p className="text-xs text-muted-foreground mb-3">Current headcount breakdown</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={allocationData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {allocationData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(val: number, name: string) => [`${val} people`, name]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-1">
            {allocationData.map(d => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <span className="text-muted-foreground">{d.name}</span>
                </div>
                <span className="font-semibold text-foreground">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.4 }} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-card rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-display font-semibold text-foreground">Recent Activity</h3>
            <button className="text-xs text-[#1B3A8F] font-medium hover:underline">View all</button>
          </div>
          <motion.div variants={staggerFast} initial="hidden" animate="visible" className="space-y-4">
            {recentActivity.map((a, i) => (
              <motion.div key={i} variants={fadeUp} className="flex items-start gap-3">
                <AvBadge initials={a.avatar} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground"><span className="font-medium">{a.user}</span> {a.action}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-display font-semibold text-foreground mb-1">Skill Inventory</h3>
          <p className="text-xs text-muted-foreground mb-4">Available vs. needed headcount</p>
          <div className="space-y-3">
            {skillInventory.map((s, i) => (
              <div key={s.skill}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground font-medium">{s.skill}</span>
                  <span className={`font-semibold ${s.count < s.needed ? "text-amber-600" : "text-emerald-600"}`}>{s.count}/{s.needed}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <AnimatedBar value={(s.count / s.needed) * 100} delay={0.4 + i * 0.08} className={`h-full rounded-full ${s.count < s.needed ? "bg-amber-400" : "bg-emerald-500"}`} />
                </div>
              </div>
            ))}
          </div>
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} onClick={() => onNavigate("bench")}
            className="mt-4 w-full text-xs text-[#1B3A8F] font-medium border border-blue-200 rounded-lg py-2 hover:bg-blue-50 transition-colors">
            View Bench Analytics →
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── AI MATCHMAKER ────────────────────────────────────────────────────────────
function AIMatchmaker() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["React", "TypeScript"]);
  const [searched, setSearched] = useState(false);
  const [projectName, setProjectName] = useState("Project Nexus — Phase 2");
  const allSkills = ["React", "TypeScript", "Node.js", "Python", "AWS", "Kubernetes", "PostgreSQL", "GraphQL", "ML/AI", "DevOps", "Figma", "Go", "Docker"];
  const matchResults = [
    { ...employees[0], score: 96, matched: ["React", "TypeScript"] },
    { ...employees[9], score: 88, matched: ["React", "TypeScript"] },
    { ...employees[5], score: 72, matched: ["React"] },
    { ...employees[11], score: 65, matched: ["React"] },
  ];
  const toggleSkill = (s: string) => setSelectedSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-xl font-display font-bold text-foreground">AI Best-Fit Matchmaker</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Define project requirements and find the most qualified available employees</p>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="lg:col-span-2 space-y-4">
          <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
            <h3 className="text-sm font-display font-semibold text-foreground mb-4">Project Requirements</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Project Name</label>
                <input value={projectName} onChange={e => setProjectName(e.target.value)}
                  className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Timeline</label>
                <select className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none bg-background text-foreground">
                  <option>3 months</option><option>6 months</option><option>12 months</option><option>Ongoing</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Required Skills</label>
                <div className="flex flex-wrap gap-2">
                  {allSkills.map(s => (
                    <motion.button key={s} onClick={() => toggleSkill(s)} whileTap={{ scale: 0.9 }}
                      animate={selectedSkills.includes(s) ? { scale: [1, 1.08, 1] } : {}} transition={{ duration: 0.2 }}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${selectedSkills.includes(s) ? "bg-[#1B3A8F] border-[#1B3A8F] text-white shadow-sm shadow-blue-900/20" : "bg-background border-border text-muted-foreground hover:border-slate-300"}`}>
                      {s}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Minimum Proficiency</label>
                <select className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none bg-background text-foreground">
                  <option>Intermediate</option><option>Advanced</option><option>Expert</option>
                </select>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.02, boxShadow: "0 10px 24px rgba(27,58,143,0.28)" }} whileTap={{ scale: 0.97 }}
              onClick={() => setSearched(true)} className="w-full mt-5 bg-[#1B3A8F] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" /> Find Best Fit
            </motion.button>
          </div>
          <AnimatePresence>
            {searched && (
              <motion.div initial={{ opacity: 0, y: -10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}
                className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm mb-1"><Brain className="w-4 h-4" /> AI Analysis Complete</div>
                <p className="text-blue-600 text-xs leading-relaxed">Analyzed <strong>251 employees</strong> across 7 departments. Found <strong>4 high-confidence matches</strong> for <em>{projectName}</em>.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {!searched ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="bg-card rounded-xl border border-border h-80 flex items-center justify-center text-center shadow-sm">
                <div>
                  <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                    className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-[#1B3A8F]" />
                  </motion.div>
                  <h3 className="font-display font-semibold text-foreground mb-2">Ready to match</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">Configure project requirements and click "Find Best Fit" to see AI-ranked matches.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-display font-semibold text-foreground">Top Matches — {projectName}</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">4 results</span>
                </div>
                <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-4">
                  {matchResults.map((emp, i) => (
                    <motion.div key={emp.id} variants={slideRight} whileHover={{ x: 2, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
                      className="bg-card rounded-xl border border-border p-5 shadow-sm hover:border-blue-200 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <AvBadge initials={emp.avatar} size="md" />
                          {i === 0 && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: "spring", stiffness: 400 }}
                              className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center">
                              <Star className="w-3 h-3 text-white fill-white" />
                            </motion.div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <h4 className="text-sm font-semibold text-foreground">{emp.name}</h4>
                              <p className="text-xs text-muted-foreground">{emp.role} · {emp.dept}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="text-2xl font-display font-bold text-[#1B3A8F]">{emp.score}%</div>
                              <div className="text-xs text-muted-foreground">match</div>
                            </div>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-3">
                            <AnimatedBar value={emp.score} delay={0.15 + i * 0.1} className="h-full rounded-full bg-gradient-to-r from-[#1B3A8F] to-blue-400" />
                          </div>
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex flex-wrap gap-1">
                              {emp.skills.slice(0, 3).map(s => (
                                <span key={s} className={`px-2 py-0.5 rounded text-xs font-medium ${emp.matched.includes(s) ? "bg-blue-100 text-blue-700" : "bg-muted text-muted-foreground"}`}>{s}</span>
                              ))}
                            </div>
                            <StatusDot available={emp.available} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── BENCH ANALYTICS ──────────────────────────────────────────────────────────
function BenchAnalytics() {
  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-display font-bold text-foreground">Bench Strength Analytics</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Workforce utilization and capacity intelligence</p>
        </div>
        <select className="text-xs border border-border rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none">
          <option>Last 30 days</option><option>Last Quarter</option><option>YTD</option>
        </select>
      </motion.div>
      <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Users className="w-5 h-5 text-slate-500" />} label="On Bench" value="34" numValue={34} color="bg-slate-100" />
        <StatCard icon={<Percent className="w-5 h-5 text-[#1B3A8F]" />} label="Avg Utilization" value="83%" numValue={83} delta="+4% vs last month" color="bg-blue-50" delay={0.07} />
        <StatCard icon={<AlertTriangle className="w-5 h-5 text-amber-500" />} label="Over-utilized Depts" value="2" numValue={2} color="bg-amber-50" delay={0.14} />
        <StatCard icon={<AlertCircle className="w-5 h-5 text-red-500" />} label="Critical Skill Gaps" value="3" numValue={3} color="bg-red-50" delay={0.21} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-display font-semibold text-foreground mb-1">Department Utilization</h3>
          <p className="text-xs text-muted-foreground mb-4">% of headcount actively assigned to projects</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={deptUtilization} margin={{ top: 5, right: 5, bottom: 0, left: -15 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
              <XAxis dataKey="dept" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
              <Tooltip formatter={(v: number) => [`${v}%`, "Utilization"]} />
              <Bar dataKey="util" name="Utilization" radius={[4, 4, 0, 0]}>
                {deptUtilization.map((entry, i) => <Cell key={i} fill={entry.util >= 95 ? "#EF4444" : entry.util >= 80 ? "#1B3A8F" : "#10B981"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#1B3A8F]" /> Healthy (80–94%)</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Available (&lt;80%)</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-red-400" /> Over-utilized (≥95%)</span>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-display font-semibold text-foreground mb-4 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-500" /> Skill Gap Alerts
          </h3>
          <motion.div variants={staggerFast} initial="hidden" animate="visible" className="space-y-3">
            {skillInventory.map((s, i) => {
              const pct = Math.round((s.count / s.needed) * 100);
              const gap = s.needed - s.count;
              const critical = pct < 60;
              return (
                <motion.div key={s.skill} variants={fadeUp} whileHover={{ scale: 1.01 }}
                  className={`p-3 rounded-lg border ${critical ? "border-red-200 bg-red-50" : "border-amber-200 bg-amber-50"}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-foreground">{s.skill}</span>
                    <span className={`text-xs font-bold ${critical ? "text-red-600" : "text-amber-600"}`}>{gap} short</span>
                  </div>
                  <div className="h-1.5 bg-white/70 rounded-full overflow-hidden">
                    <AnimatedBar value={pct} delay={0.3 + i * 0.07} className={`h-full rounded-full ${critical ? "bg-red-400" : "bg-amber-400"}`} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{s.count} available · {s.needed} needed</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.4 }}
        className="bg-card rounded-xl border border-border p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-sm font-display font-semibold text-foreground">Capacity Trend</h3>
          <p className="text-xs text-muted-foreground">Monthly assigned vs available workforce, Jan–Aug 2026</p>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={workforceData} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
            <defs>
              <linearGradient id="benchG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1B3A8F" stopOpacity={0.1} /><stop offset="95%" stopColor="#1B3A8F" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="assigned" stroke="#1B3A8F" strokeWidth={2} fill="url(#benchG)" name="Assigned" />
            <Area type="monotone" dataKey="available" stroke="#10B981" strokeWidth={2} fill="none" strokeDasharray="5 3" name="Available" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

// ─── EMPLOYEE DIRECTORY ───────────────────────────────────────────────────────
function EmployeeDirectory({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [availFilter, setAvailFilter] = useState("All");
  const depts = ["All", "Engineering", "Data & Analytics", "Design", "Infrastructure", "Product", "Quality", "Security"];
  const filtered = employees.filter(e => {
    const q = search.toLowerCase();
    return (e.name.toLowerCase().includes(q) || e.role.toLowerCase().includes(q) || e.skills.some(s => s.toLowerCase().includes(q)))
      && (deptFilter === "All" || e.dept === deptFilter)
      && (availFilter === "All" || (availFilter === "Available" ? e.available : !e.available));
  });

  return (
    <div className="p-6 space-y-5">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-display font-bold text-foreground">Employee Directory</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{employees.length} employees across 7 departments</p>
        </div>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1.5 text-xs font-medium bg-[#1B3A8F] text-white rounded-lg px-3 py-2 hover:bg-[#162F76] transition-colors">
          <Plus className="w-3.5 h-3.5" /> Add Employee
        </motion.button>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="w-full border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background"
            placeholder="Search by name, role, or skill..." />
        </div>
        <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none bg-background text-foreground">
          {depts.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={availFilter} onChange={e => setAvailFilter(e.target.value)} className="border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none bg-background text-foreground">
          <option>All</option><option>Available</option><option>Assigned</option>
        </select>
      </motion.div>
      {filtered.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-muted-foreground">
          <Users className="w-10 h-10 mx-auto mb-3 opacity-30" /><p className="text-sm">No employees match your filters.</p>
        </motion.div>
      ) : (
        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(emp => (
            <motion.div key={emp.id} variants={scaleIn} whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(0,0,0,0.09)", borderColor: "#BFDBFE" }}
              onClick={() => onNavigate("profile")} className="bg-card rounded-xl border border-border p-5 shadow-sm cursor-pointer transition-colors group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <AvBadge initials={emp.avatar} size="md" />
                  <div>
                    <h4 className="text-sm font-semibold text-foreground group-hover:text-[#1B3A8F] transition-colors">{emp.name}</h4>
                    <p className="text-xs text-muted-foreground">{emp.role}</p>
                  </div>
                </div>
                <StatusDot available={emp.available} />
              </div>
              <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {emp.dept}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {emp.experience}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {emp.skills.slice(0, 3).map(s => <span key={s} className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs font-medium">{s}</span>)}
                {emp.skills.length > 3 && <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs">+{emp.skills.length - 3}</span>}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                    <AnimatedBar value={emp.utilization} delay={0.2} className="h-full bg-[#1B3A8F] rounded-full" />
                  </div>
                  <span>{emp.utilization}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-medium text-foreground">{emp.rating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

// ─── EMPLOYEE PROFILE ─────────────────────────────────────────────────────────
function EmployeeProfile({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [tab, setTab] = useState("overview");
  const emp = employees[0];
  const skillMatrix = [
    { skill: "React", level: 5, years: 6 }, { skill: "TypeScript", level: 5, years: 5 },
    { skill: "Node.js", level: 4, years: 4 }, { skill: "AWS", level: 4, years: 3 },
    { skill: "GraphQL", level: 3, years: 2 }, { skill: "Docker", level: 3, years: 2 },
    { skill: "PostgreSQL", level: 3, years: 4 }, { skill: "Python", level: 2, years: 1 },
  ];
  const profLabels = ["Beginner", "Learning", "Intermediate", "Advanced", "Expert"];
  const assignments = [
    { project: "Project Nexus — Phase 2", role: "Lead Frontend Engineer", period: "Jul 1, 2026 → Ongoing", status: "upcoming" },
    { project: "Dashboard Revamp", role: "Senior Engineer", period: "Mar 15 → Jun 20, 2026", status: "completed" },
    { project: "API Gateway Migration", role: "Frontend Engineer", period: "Jan 8 → Mar 10, 2026", status: "completed" },
  ];
  const certs = [
    { name: "AWS Solutions Architect", issuer: "Amazon Web Services", date: "May 2026", expiry: "May 2029" },
    { name: "React Expert Certification", issuer: "Meta", date: "Feb 2025" },
    { name: "Google Cloud Associate", issuer: "Google Cloud", date: "Aug 2024", expiry: "Aug 2027" },
  ];

  return (
    <div className="p-6 space-y-5">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
        <button onClick={() => onNavigate("directory")} className="hover:text-foreground transition-colors">Employee Directory</button>
        <ChevronRight className="w-3 h-3" /><span className="text-foreground font-medium">{emp.name}</span>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
        className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <motion.div whileHover={{ scale: 1.04 }} transition={{ type: "spring", stiffness: 300 }}>
            <AvBadge initials={emp.avatar} size="lg" />
          </motion.div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div>
                <h1 className="text-xl font-display font-bold text-foreground">{emp.name}</h1>
                <p className="text-sm text-muted-foreground mt-0.5">{emp.role} · {emp.dept}</p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {emp.email}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {emp.phone}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {emp.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <StatusDot available={emp.available} />
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted transition-colors">
                  <Edit className="w-3.5 h-3.5" /> Edit
                </motion.button>
              </div>
            </div>
            <motion.div variants={stagger} initial="hidden" animate="visible" className="flex items-center gap-6">
              {[{ label: "Experience", value: emp.experience }, { label: "Projects", value: "14 completed" }, { label: "Utilization", value: `${emp.utilization}%` }, { label: "Rating", value: `${emp.rating}/5.0` }].map(s => (
                <motion.div key={s.label} variants={scaleIn}>
                  <div className="text-base font-display font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="flex items-center gap-1 border-b border-border">
        {["overview", "skills", "projects", "certifications"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium capitalize border-b-2 transition-colors -mb-px ${tab === t ? "border-[#1B3A8F] text-[#1B3A8F]" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {t}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
          {tab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5 shadow-sm">
                <h3 className="text-sm font-display font-semibold text-foreground mb-4">Top Skills</h3>
                <div className="space-y-3.5">
                  {skillMatrix.slice(0, 5).map((s, i) => (
                    <div key={s.skill}>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-medium text-foreground">{s.skill}</span>
                        <span className="text-muted-foreground">{profLabels[s.level - 1]} · {s.years}y exp</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <AnimatedBar value={(s.level / 5) * 100} delay={0.1 + i * 0.09} className="h-full rounded-full bg-[#1B3A8F]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Current Assignment</h4>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm font-semibold text-foreground">Project Nexus — Phase 2</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Lead Frontend Engineer</p>
                    <p className="text-xs text-blue-600 mt-1 font-medium">Starting Jul 1, 2026</p>
                  </div>
                </div>
                <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Recent Certifications</h4>
                  <div className="space-y-2.5">
                    {certs.slice(0, 2).map(c => (
                      <div key={c.name} className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div><p className="text-xs font-medium text-foreground">{c.name}</p><p className="text-xs text-muted-foreground">{c.issuer} · {c.date}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {tab === "skills" && (
            <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
              <h3 className="text-sm font-display font-semibold text-foreground mb-4">Full Skill Matrix</h3>
              <div className="space-y-4">
                {skillMatrix.map((s, i) => (
                  <div key={s.skill} className="flex items-center gap-4">
                    <span className="text-sm font-medium text-foreground w-28 flex-shrink-0">{s.skill}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <AnimatedBar value={(s.level / 5) * 100} delay={i * 0.08} className="h-full rounded-full bg-[#1B3A8F]" />
                    </div>
                    <span className="text-xs text-muted-foreground w-24 text-right">{profLabels[s.level - 1]}</span>
                    <span className="text-xs text-muted-foreground w-12 text-right">{s.years}y exp</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "projects" && (
            <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
              <h3 className="text-sm font-display font-semibold text-foreground mb-4">Project History</h3>
              <motion.div variants={staggerFast} initial="hidden" animate="visible" className="space-y-3">
                {assignments.map((a, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/40 transition-colors">
                    <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${a.status === "upcoming" ? "bg-blue-500" : "bg-emerald-500"}`} />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-foreground">{a.project}</h4>
                      <p className="text-xs text-muted-foreground">{a.role}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{a.period}</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-md flex-shrink-0 ${a.status === "upcoming" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"}`}>{a.status}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
          {tab === "certifications" && (
            <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
              <h3 className="text-sm font-display font-semibold text-foreground mb-4">Certifications & Achievements</h3>
              <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certs.map((c, i) => (
                  <motion.div key={i} variants={scaleIn} className="flex items-start gap-3 p-4 border border-border rounded-lg">
                    <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{c.name}</h4>
                      <p className="text-xs text-muted-foreground">{c.issuer}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Issued: {c.date}{c.expiry ? ` · Expires: ${c.expiry}` : ""}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── INTERN PORTAL ────────────────────────────────────────────────────────────
function InternPortal() {
  return (
    <div className="p-6 space-y-5">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-xl font-display font-bold text-foreground">Intern Skill-Up & Mentorship Portal</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Personalized learning journey and mentor connection</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.35 }}
        className="bg-card rounded-xl border border-border p-5 shadow-sm">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <AvBadge initials="RM" size="lg" />
            <div>
              <h2 className="text-lg font-display font-bold text-foreground">{internData.name}</h2>
              <p className="text-sm text-muted-foreground">{internData.role} · {internData.dept}</p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Jun 2 – Aug 29, 2026 · 12 weeks remaining
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-display font-bold text-[#1B3A8F]">43%</div>
            <div className="text-xs text-muted-foreground mb-1">Program complete</div>
            <div className="h-1.5 w-28 bg-muted rounded-full overflow-hidden">
              <AnimatedBar value={43} delay={0.3} className="h-full bg-[#1B3A8F] rounded-full" />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.35 }}
            className="bg-card rounded-xl border border-border p-5 shadow-sm">
            <h3 className="text-sm font-display font-semibold text-foreground mb-3">Learning Goals</h3>
            <div className="flex flex-wrap gap-2">
              {internData.goals.map((g, i) => (
                <motion.span key={g} initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 + i * 0.06 }}
                  className="px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium rounded-lg">{g}</motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.35 }}
            className="bg-card rounded-xl border border-border p-5 shadow-sm">
            <h3 className="text-sm font-display font-semibold text-foreground mb-4">Learning Roadmap</h3>
            <div>
              {internData.milestones.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.07, duration: 0.3 }} className="flex items-start gap-4 pb-4 last:pb-0">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ delay: 0.4 + i * 0.07, type: "spring", stiffness: 300 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${m.status === "completed" ? "bg-emerald-500" : m.status === "active" ? "bg-[#1B3A8F]" : "bg-muted border-2 border-border"}`}>
                      {m.status === "completed" ? <CheckCircle className="w-4 h-4 text-white" /> : m.status === "active" ? <Activity className="w-4 h-4 text-white" /> : <span className="w-2 h-2 rounded-full bg-slate-300" />}
                    </motion.div>
                    {i < internData.milestones.length - 1 && (
                      <div className={`w-0.5 flex-1 mt-1 min-h-4 ${m.status === "completed" ? "bg-emerald-300" : "bg-border"}`} />
                    )}
                  </div>
                  <div className="flex-1 pb-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className={`text-sm font-medium ${m.status === "pending" ? "text-muted-foreground" : "text-foreground"}`}>{m.label}</h4>
                      <span className="text-xs text-muted-foreground flex-shrink-0">{m.date}</span>
                    </div>
                    {m.status === "active" && (
                      <motion.span animate={{ opacity: [1, 0.6, 1] }} transition={{ repeat: Infinity, duration: 2 }}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md font-medium mt-1 inline-block">In Progress</motion.span>
                    )}
                    {m.status === "completed" && <span className="text-xs text-emerald-600 font-medium mt-0.5 inline-block">Completed ✓</span>}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.35 }}
            className="bg-card rounded-xl border border-border p-5 shadow-sm">
            <h3 className="text-sm font-display font-semibold text-foreground mb-4">Skill Progress</h3>
            <div className="space-y-3">
              {internData.skills.map((s, i) => (
                <div key={s.name}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-foreground">{s.name}</span>
                    <span className="text-muted-foreground">{s.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <AnimatedBar value={s.progress} delay={0.5 + i * 0.09}
                      className={`h-full rounded-full ${s.progress >= 70 ? "bg-emerald-500" : s.progress >= 40 ? "bg-[#1B3A8F]" : "bg-amber-400"}`} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.4 }} className="space-y-4">
          <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <motion.div animate={{ rotate: [0, 15, -10, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}>
                <Sparkles className="w-4 h-4 text-[#1B3A8F]" />
              </motion.div>
              <h3 className="text-sm font-display font-semibold text-foreground">Suggested Mentor</h3>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 mb-3">
              <div className="flex items-center gap-3 mb-3">
                <AvBadge initials={internData.mentor.avatar} size="md" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{internData.mentor.name}</h4>
                  <p className="text-xs text-muted-foreground">{internData.mentor.role}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {internData.mentor.skills.slice(0, 3).map(s => (
                  <span key={s} className="px-2 py-0.5 bg-white border border-blue-200 text-blue-700 rounded text-xs font-medium">{s}</span>
                ))}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span>{internData.mentor.rating} rating · {internData.mentor.experience}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              <span className="font-semibold text-[#1B3A8F]">98% skill alignment</span> with your learning goals. Sarah has mentored 4 interns with a 5-star record.
            </p>
            <motion.button whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(27,58,143,0.25)" }} whileTap={{ scale: 0.97 }}
              className="w-full bg-[#1B3A8F] text-white text-xs font-semibold py-2.5 rounded-lg transition-colors">
              Request Mentorship
            </motion.button>
          </div>
          <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
            <h3 className="text-sm font-display font-semibold text-foreground mb-3">Development Stats</h3>
            <div className="space-y-2.5">
              {[
                { l: "Milestones Completed", v: "3 / 7", c: "text-[#1B3A8F]" },
                { l: "Skills in Progress", v: "6 active", c: "text-foreground" },
                { l: "Avg Skill Growth / Week", v: "+4.2%", c: "text-emerald-600" },
                { l: "Mentor Sessions", v: "4 completed", c: "text-foreground" },
                { l: "Feedback Score", v: "4.8 / 5.0", c: "text-amber-600" },
              ].map(s => (
                <div key={s.l} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{s.l}</span>
                  <span className={`font-semibold ${s.c}`}>{s.v}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── SECURITY AUDIT ───────────────────────────────────────────────────────────
function SecurityAudit() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? auditLogs : auditLogs.filter(l => l.severity === filter);

  return (
    <div className="p-6 space-y-5">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-display font-bold text-foreground">Security Audit Visualizer</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Enterprise activity monitoring and compliance audit trail</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.span animate={{ opacity: [1, 0.7, 1] }} transition={{ repeat: Infinity, duration: 2.2 }}
            className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Monitoring
          </motion.span>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 text-xs font-medium border border-border rounded-lg px-3 py-2 hover:bg-muted transition-colors">
            <Download className="w-3.5 h-3.5" /> Export Logs
          </motion.button>
        </div>
      </motion.div>

      <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Activity className="w-5 h-5 text-[#1B3A8F]" />} label="Total Events Today" value="312" numValue={312} color="bg-blue-50" />
        <StatCard icon={<Info className="w-5 h-5 text-blue-500" />} label="INFO Logs" value="284" numValue={284} color="bg-blue-50" delay={0.07} />
        <StatCard icon={<AlertTriangle className="w-5 h-5 text-amber-500" />} label="WARNING Logs" value="22" numValue={22} color="bg-amber-50" delay={0.14} />
        <StatCard icon={<XCircle className="w-5 h-5 text-red-500" />} label="CRITICAL Alerts" value="6" numValue={6} color="bg-red-50" delay={0.21} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}
        className="bg-card rounded-xl border border-border p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-sm font-display font-semibold text-foreground">Activity Timeline</h3>
          <p className="text-xs text-muted-foreground">Event distribution over the past 24 hours</p>
        </div>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={auditTrendData} margin={{ top: 5, right: 5, bottom: 0, left: -15 }} barSize={16}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
            <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar dataKey="info" name="INFO" stackId="a" fill="#DBEAFE" />
            <Bar dataKey="warning" name="WARNING" stackId="a" fill="#FEF3C7" />
            <Bar dataKey="critical" name="CRITICAL" stackId="a" fill="#FEE2E2" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4 }}
        className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border flex-wrap gap-3">
          <h3 className="text-sm font-display font-semibold text-foreground">Audit Log — June 23, 2026</h3>
          <div className="flex items-center gap-1.5">
            {["All", "INFO", "WARNING", "CRITICAL"].map(f => (
              <motion.button key={f} onClick={() => setFilter(f)} whileTap={{ scale: 0.95 }}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${filter === f ? "bg-[#1B3A8F] text-white" : "text-muted-foreground hover:bg-muted"}`}>
                {f}
              </motion.button>
            ))}
          </div>
        </div>
        <div className="divide-y divide-border">
          <AnimatePresence>
            {filtered.map((log, i) => (
              <motion.div key={log.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                transition={{ delay: i * 0.04, duration: 0.25 }}
                className={`flex items-start gap-3 px-4 py-3 hover:bg-muted/40 transition-colors ${log.severity === "CRITICAL" ? "bg-red-50/60" : log.severity === "WARNING" ? "bg-amber-50/40" : ""}`}>
                <span className="text-xs font-mono text-muted-foreground whitespace-nowrap flex-shrink-0 pt-0.5 w-16">{log.time}</span>
                <div className="flex-shrink-0 pt-0.5"><SeverityBadge severity={log.severity} /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground leading-relaxed">{log.action}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 font-mono">{log.user} · {log.ip} · {log.module}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

// ─── NOTIFICATIONS CENTER ─────────────────────────────────────────────────────
function NotificationsCenter() {
  const [readIds, setReadIds] = useState<number[]>(notificationsData.filter(n => n.read).map(n => n.id));
  const typeConfig: Record<string, { icon: React.ReactNode; border: string }> = {
    critical: { icon: <XCircle className="w-4 h-4 text-red-500" />, border: "border-l-red-500" },
    warning: { icon: <AlertTriangle className="w-4 h-4 text-amber-500" />, border: "border-l-amber-400" },
    info: { icon: <Info className="w-4 h-4 text-blue-500" />, border: "border-l-blue-500" },
    success: { icon: <CheckCircle className="w-4 h-4 text-emerald-500" />, border: "border-l-emerald-500" },
  };
  const iconBg: Record<string, string> = { critical: "bg-red-50", warning: "bg-amber-50", info: "bg-blue-50", success: "bg-emerald-50" };
  const unread = notificationsData.filter(n => !readIds.includes(n.id)).length;

  return (
    <div className="p-6 space-y-5">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-display font-bold text-foreground">Notifications & Alerts</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{unread > 0 ? `${unread} unread notification${unread !== 1 ? "s" : ""}` : "All caught up!"}</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} onClick={() => setReadIds(notificationsData.map(n => n.id))}
          className="text-xs text-[#1B3A8F] font-medium hover:underline">Mark all as read</motion.button>
      </motion.div>
      <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-3">
        {notificationsData.map(n => {
          const isRead = readIds.includes(n.id);
          const tc = typeConfig[n.type] ?? typeConfig.info;
          return (
            <motion.div key={n.id} variants={slideRight} whileHover={{ x: 2, boxShadow: "0 6px 18px rgba(0,0,0,0.07)" }}
              onClick={() => setReadIds(prev => prev.includes(n.id) ? prev : [...prev, n.id])}
              className={`bg-card rounded-xl border shadow-sm p-4 cursor-pointer transition-all border-border ${!isRead ? `border-l-4 ${tc.border}` : ""}`}>
              <div className="flex items-start gap-3">
                <motion.div whileHover={{ scale: 1.12 }} transition={{ type: "spring", stiffness: 400 }}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg[n.type] ?? "bg-blue-50"}`}>
                  {tc.icon}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <div className="flex items-center gap-2 min-w-0">
                      {!isRead && <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}
                        className="w-1.5 h-1.5 rounded-full bg-[#1B3A8F] flex-shrink-0" />}
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{n.category}</span>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">{n.time}</span>
                  </div>
                  <h4 className={`text-sm font-semibold mb-1 ${isRead ? "text-muted-foreground" : "text-foreground"}`}>{n.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{n.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
function SettingsAdmin() {
  const [tab, setTab] = useState("users");
  const [securityToggles, setSecurityToggles] = useState([true, true, true, false, false]);
  const tabs = [
    { id: "users", label: "User Management", icon: <Users className="w-4 h-4" /> },
    { id: "roles", label: "Roles & Permissions", icon: <Shield className="w-4 h-4" /> },
    { id: "skills", label: "Skill Categories", icon: <Brain className="w-4 h-4" /> },
    { id: "system", label: "System Config", icon: <Settings className="w-4 h-4" /> },
    { id: "security", label: "Security", icon: <Lock className="w-4 h-4" /> },
  ];

  return (
    <div className="p-6 space-y-5">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-xl font-display font-bold text-foreground">Settings & Administration</h1>
        <p className="text-sm text-muted-foreground mt-0.5">System configuration, user management, and security controls</p>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex gap-6">
        <nav className="w-52 flex-shrink-0 space-y-1">
          {tabs.map(t => (
            <motion.button key={t.id} onClick={() => setTab(t.id)} whileHover={{ x: 2 }} whileTap={{ scale: 0.97 }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${tab === t.id ? "bg-[#1B3A8F] text-white shadow-md shadow-blue-900/15" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
              {t.icon} {t.label}
            </motion.button>
          ))}
        </nav>
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
              {tab === "users" && (
                <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-display font-semibold text-foreground">User Accounts</h3>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-1.5 text-xs bg-[#1B3A8F] text-white rounded-lg px-3 py-2 hover:bg-[#162F76] transition-colors">
                      <Plus className="w-3.5 h-3.5" /> Add User
                    </motion.button>
                  </div>
                  <motion.div variants={staggerFast} initial="hidden" animate="visible" className="divide-y divide-border">
                    {employees.slice(0, 7).map(emp => (
                      <motion.div key={emp.id} variants={fadeUp} className="flex items-center gap-3 py-3">
                        <AvBadge initials={emp.avatar} size="sm" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{emp.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{emp.email}</p>
                        </div>
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md flex-shrink-0">{emp.dept}</span>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <motion.button whileHover={{ scale: 1.1 }} className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"><Edit className="w-3.5 h-3.5" /></motion.button>
                          <motion.button whileHover={{ scale: 1.1 }} className="p-1.5 text-muted-foreground hover:text-red-500 rounded-md hover:bg-red-50 transition-colors"><Trash2 className="w-3.5 h-3.5" /></motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              )}
              {tab === "roles" && (
                <div className="bg-card rounded-xl border border-border p-5 shadow-sm overflow-x-auto">
                  <h3 className="text-sm font-display font-semibold text-foreground mb-4">Role Permissions Matrix</h3>
                  <table className="w-full text-xs min-w-[560px]">
                    <thead>
                      <tr className="text-muted-foreground text-left">
                        <th className="pb-3 font-semibold pr-4">Permission</th>
                        {["Admin", "HR Mgr", "Center Mgr", "Employee", "Intern"].map(r => (
                          <th key={r} className="pb-3 font-semibold text-center px-2">{r}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        ["View All Employees", true, true, true, false, false],
                        ["Edit Employee Profiles", true, true, false, false, false],
                        ["AI Matchmaker Access", true, true, true, false, false],
                        ["Bench Analytics", true, true, true, false, false],
                        ["Security Audit Logs", true, false, false, false, false],
                        ["Manage Roles & Perms", true, false, false, false, false],
                        ["Own Profile (read/write)", true, true, true, true, true],
                        ["Intern Portal", true, true, true, false, true],
                      ].map(([perm, ...roles]) => (
                        <motion.tr key={String(perm)} whileHover={{ backgroundColor: "rgba(243,246,251,0.8)" }} className="transition-colors">
                          <td className="py-2.5 font-medium text-foreground pr-4">{perm}</td>
                          {roles.map((allowed, i) => (
                            <td key={i} className="py-2.5 text-center px-2">
                              {allowed ? <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" /> : <span className="text-slate-200 text-base">–</span>}
                            </td>
                          ))}
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {tab === "skills" && (
                <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-display font-semibold text-foreground">Skill Categories</h3>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-1.5 text-xs bg-[#1B3A8F] text-white rounded-lg px-3 py-2 hover:bg-[#162F76] transition-colors">
                      <Plus className="w-3.5 h-3.5" /> Add Category
                    </motion.button>
                  </div>
                  <motion.div variants={staggerFast} initial="hidden" animate="visible" className="space-y-2">
                    {[
                      { name: "Frontend Development", skills: 24, c: "bg-blue-100 text-blue-700" },
                      { name: "Backend Development", skills: 31, c: "bg-violet-100 text-violet-700" },
                      { name: "Data Science & ML", skills: 18, c: "bg-emerald-100 text-emerald-700" },
                      { name: "Cloud & DevOps", skills: 22, c: "bg-amber-100 text-amber-700" },
                      { name: "Design & UX", skills: 15, c: "bg-pink-100 text-pink-700" },
                      { name: "Security & Compliance", skills: 12, c: "bg-red-100 text-red-700" },
                      { name: "Project Management", skills: 9, c: "bg-cyan-100 text-cyan-700" },
                    ].map(cat => (
                      <motion.div key={cat.name} variants={fadeUp} whileHover={{ x: 3 }}
                        className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/40 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${cat.c}`}>{cat.skills} skills</span>
                          <span className="text-sm font-medium text-foreground">{cat.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <motion.button whileHover={{ scale: 1.1 }} className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"><Edit className="w-3.5 h-3.5" /></motion.button>
                          <motion.button whileHover={{ scale: 1.1 }} className="p-1.5 text-muted-foreground hover:text-red-500 rounded-md hover:bg-red-50 transition-colors"><Trash2 className="w-3.5 h-3.5" /></motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              )}
              {tab === "system" && (
                <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
                  <h3 className="text-sm font-display font-semibold text-foreground mb-4">System Configuration</h3>
                  <div className="space-y-1">
                    {[
                      { label: "Organization Name", value: "NexusCorp Global" },
                      { label: "Default Timezone", value: "America/New_York (UTC-4)" },
                      { label: "Session Timeout", value: "4 hours" },
                      { label: "AI Matching Threshold", value: "65% minimum score" },
                      { label: "Max Active Interns", value: "50 per cycle" },
                      { label: "Audit Log Retention", value: "2 years (rolling)" },
                    ].map(s => (
                      <div key={s.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <span className="text-sm text-muted-foreground">{s.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">{s.value}</span>
                          <motion.button whileHover={{ scale: 1.1 }} className="p-1 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"><Edit className="w-3.5 h-3.5" /></motion.button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {tab === "security" && (
                <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
                  <h3 className="text-sm font-display font-semibold text-foreground mb-4">Security Controls</h3>
                  <div className="space-y-1">
                    {[
                      { label: "Multi-Factor Authentication", desc: "Require MFA for all admin and HR accounts" },
                      { label: "SSO Integration (SAML 2.0)", desc: "Enable Single Sign-On via enterprise identity provider" },
                      { label: "Audit Logging", desc: "Log all user actions and system events for compliance" },
                      { label: "IP Allowlisting", desc: "Restrict access to approved IP ranges only" },
                      { label: "Privileged Session Recording", desc: "Record admin sessions for security compliance" },
                    ].map((s, i) => (
                      <div key={s.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div>
                          <p className="text-sm font-medium text-foreground">{s.label}</p>
                          <p className="text-xs text-muted-foreground">{s.desc}</p>
                        </div>
                        <motion.button
                          onClick={() => setSecurityToggles(prev => prev.map((v, j) => j === i ? !v : v))}
                          whileTap={{ scale: 0.92 }}
                          className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ml-4 ${securityToggles[i] ? "bg-[#1B3A8F]" : "bg-muted"}`}
                        >
                          <motion.span animate={{ x: securityToggles[i] ? 20 : 2 }} transition={{ type: "spring", stiffness: 500, damping: 35 }}
                            className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow" />
                        </motion.button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

// ─── APP SHELL ────────────────────────────────────────────────────────────────
const navItems = [
  { id: "dashboard", label: "Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: "matchmaker", label: "AI Matchmaker", icon: <Sparkles className="w-4 h-4" /> },
  { id: "bench", label: "Bench Analytics", icon: <BarChart2 className="w-4 h-4" /> },
  { id: "directory", label: "Employee Directory", icon: <Users className="w-4 h-4" /> },
  { id: "intern", label: "Intern Portal", icon: <GraduationCap className="w-4 h-4" /> },
  { id: "security", label: "Security Audit", icon: <ShieldCheck className="w-4 h-4" /> },
  { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" />, badge: 3 },
  { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
];

function AppShell({ screen, setScreen, onLogout, children }: {
  screen: Screen; setScreen: (s: Screen) => void; onLogout: () => void; children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <motion.aside animate={{ width: collapsed ? 60 : 220 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex-shrink-0 bg-[#0B1437] flex flex-col overflow-hidden">
        <div className={`h-14 flex items-center border-b border-white/5 ${collapsed ? "px-3 justify-center" : "px-4"}`}>
          {!collapsed ? (
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <div className="w-7 h-7 bg-[#1B3A8F] rounded-lg flex items-center justify-center flex-shrink-0">
                <Layers className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-display font-bold text-white text-sm truncate">NexusHR</span>
            </div>
          ) : (
            <div className="w-7 h-7 bg-[#1B3A8F] rounded-lg flex items-center justify-center flex-shrink-0">
              <Layers className="w-3.5 h-3.5 text-white" />
            </div>
          )}
          {!collapsed && (
            <motion.button whileHover={{ scale: 1.1 }} onClick={() => setCollapsed(true)} className="p-1 text-slate-500 hover:text-slate-300 transition-colors ml-1">
              <ChevronRight className="w-4 h-4 rotate-180" />
            </motion.button>
          )}
        </div>
        {collapsed && (
          <motion.button whileHover={{ scale: 1.05 }} onClick={() => setCollapsed(false)} className="flex items-center justify-center py-2 text-slate-500 hover:text-slate-300 transition-colors border-b border-white/5">
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.button>
        )}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {!collapsed && <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest px-2 mb-2 mt-1">Navigation</p>}
          {navItems.map(item => (
            <motion.button key={item.id} onClick={() => setScreen(item.id as Screen)} title={collapsed ? item.label : undefined}
              whileHover={{ x: collapsed ? 0 : 2 }} whileTap={{ scale: 0.96 }}
              className={`w-full flex items-center gap-2.5 px-2 py-2.5 rounded-lg text-sm font-medium transition-colors relative ${collapsed ? "justify-center" : ""} ${screen === item.id ? "bg-[#1B3A8F] text-white shadow-lg shadow-blue-900/30" : "text-slate-400 hover:bg-white/5 hover:text-slate-200"}`}>
              <span className="flex-shrink-0 relative z-10">{item.icon}</span>
              {!collapsed && <span className="truncate flex-1 text-left relative z-10">{item.label}</span>}
              {!collapsed && item.badge && (
                <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}
                  className="w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold flex-shrink-0 relative z-10">
                  {item.badge}
                </motion.span>
              )}
              {collapsed && item.badge && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
            </motion.button>
          ))}
        </nav>
        <div className="p-2 border-t border-white/5">
          {collapsed ? (
            <motion.button whileHover={{ scale: 1.1 }} onClick={onLogout} title="Sign out"
              className="w-full flex items-center justify-center p-2 text-slate-500 hover:text-slate-300 rounded-lg hover:bg-white/5 transition-colors">
              <LogOut className="w-4 h-4" />
            </motion.button>
          ) : (
            <div className="flex items-center gap-2 px-2 py-1.5">
              <div className="w-7 h-7 bg-[#1B3A8F] rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">HR</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-300 truncate">HR Administrator</p>
                <p className="text-xs text-slate-600 truncate">admin@nexus.corp</p>
              </div>
              <motion.button whileHover={{ scale: 1.15, rotate: -10 }} onClick={onLogout} title="Sign out"
                className="p-1.5 text-slate-500 hover:text-slate-300 rounded-md hover:bg-white/5 transition-colors flex-shrink-0">
                <LogOut className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          )}
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="h-14 border-b border-border bg-card flex items-center px-6 gap-4 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">NexusHR</span>
              <ChevronRight className="w-3 h-3" />
              <span className="font-medium capitalize">{navItems.find(n => n.id === screen)?.label ?? screen}</span>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setScreen("notifications")}
            className="relative p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
            <Bell className="w-4 h-4" />
            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 3 }}
              className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </motion.button>
          <div className="w-7 h-7 bg-[#1B3A8F] rounded-full flex items-center justify-center text-xs font-bold text-white select-none">HR</div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div key={screen} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}>
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = (s: Screen) => setScreen(s);
  const handleLogin = () => { setLoggedIn(true); setScreen("dashboard"); };
  const handleLogout = () => { setLoggedIn(false); setScreen("landing"); };

  if (!loggedIn) {
    return (
      <AnimatePresence mode="wait">
        {screen === "login" ? (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <LoginPage onLogin={handleLogin} onNavigate={navigate} />
          </motion.div>
        ) : (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <LandingPage onNavigate={navigate} />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  const screens: Partial<Record<Screen, JSX.Element>> = {
    dashboard: <Dashboard onNavigate={navigate} />,
    matchmaker: <AIMatchmaker />,
    bench: <BenchAnalytics />,
    directory: <EmployeeDirectory onNavigate={navigate} />,
    profile: <EmployeeProfile onNavigate={navigate} />,
    intern: <InternPortal />,
    security: <SecurityAudit />,
    notifications: <NotificationsCenter />,
    settings: <SettingsAdmin />,
  };

  return (
    <AppShell screen={screen} setScreen={navigate} onLogout={handleLogout}>
      {screens[screen] ?? <Dashboard onNavigate={navigate} />}
    </AppShell>
  );
}

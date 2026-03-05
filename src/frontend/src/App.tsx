import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContactForm } from "@/hooks/useQueries";
import {
  AlertCircle,
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Globe,
  Heart,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Shield,
  Star,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

/* ── tiny scroll helper ─────────────────────────────────── */
const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

/* ── fade-in-up animation variant ──────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.1 },
  }),
};

/* ────────────────────────────────────────────────────────── */
/*  NAV                                                        */
/* ────────────────────────────────────────────────────────── */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { id: "home", label: "Home", ocid: "nav.home_link" },
    { id: "about", label: "About", ocid: "nav.about_link" },
    { id: "services", label: "Services", ocid: "nav.services_link" },
    { id: "contact", label: "Contact", ocid: "nav.contact_link" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-xs border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => scrollTo("home")}
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">
            Nexus
          </span>
        </motion.div>

        {/* Desktop links */}
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center gap-8"
        >
          {links.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                data-ocid={l.ocid}
                onClick={() => scrollTo(l.id)}
                className="nav-link text-muted-foreground hover:text-foreground pb-1"
              >
                {l.label}
              </button>
            </li>
          ))}
        </motion.ul>

        {/* Desktop CTA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:block"
        >
          <Button
            size="sm"
            onClick={() => scrollTo("contact")}
            className="font-heading font-semibold"
          >
            Get Started
          </Button>
        </motion.div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-background/98 backdrop-blur-md border-b border-border overflow-hidden"
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    data-ocid={l.ocid}
                    onClick={() => {
                      scrollTo(l.id);
                      setOpen(false);
                    }}
                    className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors w-full text-left"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <Button
                  size="sm"
                  className="w-full font-heading"
                  onClick={() => {
                    scrollTo("contact");
                    setOpen(false);
                  }}
                >
                  Get Started
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  HERO                                                       */
/* ────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-bg.dim_1920x1080.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.13_0.06_230/0.85)] via-[oklch(0.15_0.07_210/0.75)] to-[oklch(0.97_0.008_200)]" />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          <span
            className="section-label mb-4 inline-block"
            style={{ color: "oklch(0.85 0.15 62)" }}
          >
            ✦ Welcome to the Future
          </span>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-white mt-4 mb-6"
        >
          Build Smarter, <span className="gradient-text">Grow Faster</span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
          className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We craft digital experiences that transform ideas into impact. From
          strategy to execution — we're your partner every step of the way.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            data-ocid="hero.primary_button"
            size="lg"
            onClick={() => scrollTo("contact")}
            className="font-heading font-semibold text-base px-8 py-6 gap-2 shadow-glow hover:shadow-glow transition-shadow duration-300"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => scrollTo("services")}
            className="font-heading text-base text-white hover:text-white hover:bg-white/15 border border-white/20 px-8 py-6"
          >
            Explore Services
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={4}
          className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
        >
          {[
            { label: "Projects", value: "500+" },
            { label: "Clients", value: "120+" },
            { label: "Awards", value: "18" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display font-bold text-2xl md:text-3xl text-white">
                {s.value}
              </div>
              <div className="text-white/55 text-sm mt-1 font-heading">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
          className="cursor-pointer text-white/50 hover:text-white/80 transition-colors"
          onClick={() => scrollTo("about")}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  ABOUT                                                      */
/* ────────────────────────────────────────────────────────── */
function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: Star,
      title: "Excellence First",
      desc: "We hold ourselves to the highest standards in every project we deliver.",
    },
    {
      icon: Users,
      title: "Collaborative Approach",
      desc: "Deep partnership with clients means your vision drives every decision.",
    },
    {
      icon: Award,
      title: "Proven Track Record",
      desc: "Over 500 successful projects across industries worldwide.",
    },
    {
      icon: TrendingUp,
      title: "Growth Focused",
      desc: "Our solutions are engineered to scale with your ambitions.",
    },
  ];

  return (
    <section id="about" ref={ref} className="py-28 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={0}
          >
            <span className="section-label">About Nexus</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl mt-3 mb-6 leading-tight text-foreground">
              We Turn Vision Into <span className="gradient-text">Reality</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Founded in 2018, Nexus is a full-service digital agency passionate
              about creating exceptional web experiences. Our team of designers,
              engineers, and strategists work together to build products that
              users love.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We believe great design solves real problems. Every pixel, every
              interaction, every line of code is crafted with purpose — to
              create the kind of digital presence that makes your brand
              unforgettable.
            </p>
            <Button
              onClick={() => scrollTo("contact")}
              className="font-heading font-semibold gap-2"
            >
              Work With Us <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Highlights grid */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={i + 1}
                className="group p-5 rounded-xl border border-border bg-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <h.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-sm text-foreground mb-1.5">
                  {h.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {h.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  SERVICES                                                   */
/* ────────────────────────────────────────────────────────── */
function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const services = [
    {
      icon: Globe,
      title: "Web Design & Development",
      desc: "Beautiful, responsive websites built with modern technologies. From landing pages to complex web applications.",
      tags: ["React", "TypeScript", "Tailwind"],
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: BarChart3,
      title: "Digital Strategy",
      desc: "Data-driven strategies that align your digital presence with your business goals and audience needs.",
      tags: ["Analytics", "SEO", "Growth"],
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      desc: "Lightning-fast experiences that retain users. We audit, optimize, and fine-tune every aspect of performance.",
      tags: ["Core Web Vitals", "CDN", "Caching"],
      color: "text-[oklch(0.6_0.18_160)]",
      bg: "bg-[oklch(0.6_0.18_160/0.1)]",
    },
    {
      icon: Shield,
      title: "Security & Reliability",
      desc: "Enterprise-grade security practices and robust infrastructure to keep your product safe and always available.",
      tags: ["HTTPS", "Auth", "Monitoring"],
      color: "text-[oklch(0.55_0.16_280)]",
      bg: "bg-[oklch(0.55_0.16_280/0.1)]",
    },
  ];

  return (
    <section id="services" ref={ref} className="py-28 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="section-label">What We Do</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl mt-3 mb-4 text-foreground">
            Services Built for{" "}
            <span className="gradient-text">Modern Business</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            End-to-end digital services designed to help you stand out, scale
            up, and stay ahead.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={i + 1}
              className="group relative p-8 rounded-2xl border border-border bg-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Subtle decorative bg blob */}
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-primary/15" />

              <div
                className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}
              >
                <s.icon className={`w-6 h-6 ${s.color}`} />
              </div>

              <h3 className="font-display font-bold text-xl text-foreground mb-3">
                {s.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-5">
                {s.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="font-heading text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  CONTACT                                                    */
/* ────────────────────────────────────────────────────────── */
function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mutation = useSubmitContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await mutation.mutateAsync({ name, email, message });
      toast.success("Message sent! We'll be in touch soon.");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" ref={ref} className="py-28 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left info */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={0}
          >
            <span className="section-label">Get In Touch</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl mt-3 mb-6 leading-tight text-foreground">
              Let's Build Something{" "}
              <span className="gradient-text">Together</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Have a project in mind? We'd love to hear about it. Fill out the
              form and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-5">
              {[
                { icon: Mail, label: "Email", value: "hello@nexus.io" },
                { icon: Phone, label: "Phone", value: "+1 (555) 000-0000" },
                { icon: MapPin, label: "Office", value: "San Francisco, CA" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-heading">
                      {c.label}
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {c.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={1}
            className="rounded-2xl border border-border bg-card p-8 shadow-card"
          >
            <AnimatePresence mode="wait">
              {mutation.isSuccess ? (
                <motion.div
                  key="success"
                  data-ocid="contact.success_state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">
                    Message Received!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Thanks for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => mutation.reset()}
                    className="font-heading"
                  >
                    Send Another
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-name"
                      className="font-heading text-sm"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="contact-name"
                      data-ocid="contact.name_input"
                      placeholder="Jane Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={mutation.isPending}
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-email"
                      className="font-heading text-sm"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="contact-email"
                      data-ocid="contact.email_input"
                      type="email"
                      placeholder="jane@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={mutation.isPending}
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-message"
                      className="font-heading text-sm"
                    >
                      Your Message
                    </Label>
                    <Textarea
                      id="contact-message"
                      data-ocid="contact.textarea"
                      placeholder="Tell us about your project..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={mutation.isPending}
                      rows={5}
                      required
                      className="resize-none"
                    />
                  </div>

                  {/* Error state */}
                  <AnimatePresence>
                    {mutation.isError && (
                      <motion.div
                        data-ocid="contact.error_state"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20"
                      >
                        <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                        <span className="text-sm text-destructive">
                          Failed to send. Please try again.
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    data-ocid="contact.submit_button"
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full font-heading font-semibold py-6 text-base gap-2"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2
                          data-ocid="contact.loading_state"
                          className="w-4 h-4 animate-spin"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  FOOTER                                                     */
/* ────────────────────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer className="border-t border-border bg-foreground/[0.03] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
            <Zap className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-foreground">Nexus</span>
        </div>

        <p className="text-muted-foreground text-sm text-center">
          © {year}. Built with{" "}
          <Heart className="inline-block w-3.5 h-3.5 text-accent fill-accent mx-0.5 -mt-0.5" />{" "}
          using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            caffeine.ai
          </a>
        </p>

        <nav className="flex items-center gap-6">
          {["home", "about", "services", "contact"].map((id) => (
            <button
              type="button"
              key={id}
              onClick={() => scrollTo(id)}
              className="text-xs capitalize text-muted-foreground hover:text-foreground transition-colors font-heading"
            >
              {id}
            </button>
          ))}
        </nav>
      </div>
    </footer>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  APP ROOT                                                   */
/* ────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster richColors position="top-right" />
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

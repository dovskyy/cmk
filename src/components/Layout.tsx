import { useState, useEffect, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Stethoscope } from "lucide-react";
import { cn } from "../lib/utils";

const NAV_LINKS = [
  { name: "Główna", path: "/" },
  { name: "Dorośli", path: "/dorosli" },
  { name: "Pediatria", path: "/pediatria" },
  { name: "Diagnostyka", path: "/diagnostyka" },
  { name: "Kontakt", path: "/#kontakt" },
];

export function Layout({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.substring(1));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);

  // Handle scroll for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <div className="min-h-screen flex flex-col font-sans relative overflow-hidden">
      {/* Navigation */}
      <nav
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-surface/80 backdrop-blur-xl border-b border-border shadow-sm py-4"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 text-primary z-50 relative group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
              <Stethoscope className="w-6 h-6" />
            </div>
            <span className="font-display font-semibold text-lg sm:text-xl hidden sm:block tracking-tight text-foreground">
              Centrum Kasprzaka
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary tracking-wide",
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 z-50 relative">
            <button className="hidden md:flex bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg active:scale-95">
              Umów wizytę
            </button>

            <button
              className="md:hidden p-2 rounded-lg text-primary hover:bg-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-surface border-b border-border shadow-lg p-6 flex flex-col gap-4 md:hidden"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-lg font-medium p-4 rounded-xl transition-colors",
                    location.pathname === link.path
                      ? "bg-primary/5 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <button className="bg-secondary text-secondary-foreground p-4 rounded-xl mt-4 font-semibold shadow-md active:scale-95 transition-transform w-full">
                Umów wizytę online
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow pt-24 min-h-[80vh]">
        <AnimatePresence mode="wait">
           <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full h-full"
           >
              {children}
           </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2 space-y-4">
             <div className="flex items-center gap-3 text-primary opacity-80 mix-blend-luminosity">
                <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <span className="font-display font-semibold text-lg text-foreground">Centrum Kasprzaka</span>
             </div>
             <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
               © 2026 Centrum Medyczne Kasprzaka.<br />Kliniczna precyzja, ludzkie ciepło.
             </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-primary tracking-wide text-sm uppercase">Legalne</h4>
            <div className="flex flex-col gap-3">
               <Link to="#" className="text-muted-foreground hover:text-secondary text-sm transition-colors">Polityka Prywatności</Link>
               <Link to="#" className="text-muted-foreground hover:text-secondary text-sm transition-colors">Regulamin Usług</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-primary tracking-wide text-sm uppercase">Kontakt</h4>
            <div className="flex flex-col gap-3">
               <Link to="/#kontakt" className="text-muted-foreground hover:text-secondary text-sm transition-colors">Skontaktuj się</Link>
               <Link to="/#kontakt" className="text-muted-foreground hover:text-secondary text-sm transition-colors">Lokalizacje</Link>
               <a href="#" className="text-muted-foreground hover:text-secondary text-sm transition-colors">Newsletter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

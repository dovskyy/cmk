import { User, Video, Home as HomeIcon, Banknote, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ContactSection } from "../components/ContactSection";

export function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden hero-clip bg-gradient-to-b from-[#e0f0f0] to-background text-foreground">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10 w-full">
          
          <div className="md:col-span-6 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-primary/10 text-primary px-4 py-2 rounded-full w-fit mb-2 shadow-sm text-sm tracking-wider uppercase font-medium">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              Zaufana Opieka
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-primary drop-shadow-sm">
              Kompleksowa opieka medyczna dla całej rodziny
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed font-light">
              Doświadcz klinicznej precyzji w połączeniu z ludzkim ciepłem. 
              Nasi czołowi specjaliści zapewniają pełną diagnostykę i leczenie w nowoczesnym środowisku.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button className="inline-flex items-center justify-center bg-secondary text-secondary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-secondary/90 active:scale-95 transition-all shadow-lg hover:shadow-xl">
                Umów wizytę
              </button>
              <button className="inline-flex items-center justify-center border-2 border-primary text-primary px-8 py-4 rounded-xl font-semibold hover:bg-primary/5 transition-all">
                Nasi specjaliści
              </button>
            </div>
          </div>

          <div className="md:col-span-6 relative mt-12 md:mt-0 flex justify-center">
            <div className="relative w-full max-w-[480px] aspect-square overflow-hidden shadow-2xl image-organic border-4 border-white backdrop-blur-sm p-1.5 bg-white/50">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI2Cr8uUAxidt2E8BaOwfHPkZ4Cfr5iT3cgdq-OXLxONRq-F4FBakpVvxJTrWPbkgcnPs89b7awdfwfzCC9qcC-uLA1vnl3Ydka7VEkm5RNYuWjPaEURYDezm5WLSt3Js-bk7c_cRPz5lH5xVNqco-JHBX120qxOyF0_fO5nEskH1AkwMUNhehlQz__AqgITdh0aDgS7KkAU45Q2heu9-GY4V1caSxGGQynN5SfD4rFhWi75EGfBo_tepVG20IuqGiRh6Yg5AaERk" 
                alt="Lekarz konsultujący się z pacjentem" 
                className="object-cover w-full h-full image-organic"
              />
            </div>
            
            <div className="absolute -bottom-8 -left-4 sm:left-4 bg-surface text-foreground p-5 rounded-2xl shadow-xl flex items-center gap-5 border border-border hover:scale-105 transition-transform duration-300 z-20">
              <div className="bg-secondary/15 p-3 rounded-full text-secondary">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-primary leading-none">4.9/5</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1.5 font-semibold">Satysfakcja</p>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Quick Access Bento */}
      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: User, title: "Portal Pacjenta", desc: "Dostęp do wyników" },
            { icon: Video, title: "Telemedycyna", desc: "Konsultacje online" },
            { icon: HomeIcon, title: "Wizyty Domowe", desc: "Opieka w domu" },
            { icon: Banknote, title: "Cennik", desc: "Przejrzyste koszty" },
          ].map((item, i) => (
            <Link 
              key={i}
              to="#"
              className="bg-surface backdrop-blur-md p-8 rounded-3xl shadow-soft border border-border flex flex-col items-center text-center gap-4 group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              <div className="bg-primary/5 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <item.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-display text-xl text-primary font-bold">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Services Bento */}
      <section className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl text-primary mb-6 font-bold tracking-tight">Kluczowe usługi medyczne</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Zapewniamy specjalistyczną opiekę w wielu dyscyplinach, aby zagwarantować pełne pokrycie zdrowotne dla Ciebie i Twoich bliskich.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">
          
          {/* Main Card */}
          <div className="md:col-span-8 bg-surface rounded-[2rem] shadow-soft border border-border overflow-hidden relative flex flex-col md:flex-row group hover:shadow-xl transition-all">
            <div className="p-8 sm:p-12 flex flex-col justify-between md:w-[55%] z-10">
              <div>
                <div className="mb-6">
                  <span className="bg-secondary/15 text-secondary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">Zaawansowana diagnostyka</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl text-primary mb-4 font-bold leading-tight group-hover:text-secondary transition-colors">Diagnostyka USG</h3>
                <p className="text-muted-foreground mb-8 text-base sm:text-lg leading-relaxed">
                  Najnowocześniejsze obrazowanie ultradźwiękowe, zapewniające dokładne, nieinwazyjne diagnozy wielonarządowe.
                </p>
                <ul className="space-y-4 mb-8">
                  {["Jama brzuszna i miednica", "Tarczyca i tkanki miękkie", "USG Doppler naczyń"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-foreground font-medium">
                      <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/diagnostyka" className="text-secondary hover:text-primary transition-colors flex items-center gap-2 group/link w-fit font-bold">
                Dowiedz się więcej <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1.5 transition-transform" />
              </Link>
            </div>
            <div className="md:w-[45%] relative min-h-[300px] md:min-h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent z-10 md:block hidden" />
              <img 
                 src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGc90Tku3-XAB7Q0Hg-i2ZUYXjmKCnlzP8AOz39CXmrmPudgsDr_DvN5GnsDihjJgU0NbUem6rDLm0ZZPd6C2cnfrSRsdmeVRM3uyZ27VdQyVGkE9jNhZcjtr1p5iuQ_4_HvbYVVtepXnPupiqbM-fVmTn1rt5USCPWRDstLlmbTtwVrHGooMdxDoUcmFg5YNUeQ_lQMu20e0r8t-JNAYxA3ZsX-6Zf_XVDUABtQCJaYWojHyWsYtAl2fHwjx-jvT6PPV5RO8Ds08" 
                 alt="Maszyna USG w gabinecie"
                 className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
          </div>

          {/* Small Cards */}
          <div className="md:col-span-4 bg-surface p-10 rounded-[2rem] shadow-soft border border-border flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl transition-all">
            <div>
              <div className="mb-6">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">Opieka Dziecięca</span>
              </div>
              <h3 className="font-display text-3xl text-primary mb-4 font-bold group-hover:text-secondary transition-colors">Pediatria</h3>
              <p className="text-muted-foreground leading-relaxed">Współczująca opieka dla noworodków, dzieci i nastolatków.</p>
            </div>
            <Link to="/pediatria" className="mt-8 text-primary hover:text-secondary transition-colors flex items-center gap-2 group/link w-fit font-bold">
              ZOBACZ <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          <div className="md:col-span-6 bg-surface p-10 rounded-[2rem] shadow-soft border border-border flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl transition-all">
            <div>
               <div className="mb-6">
                <span className="bg-secondary/15 text-secondary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">Zaburzenia ruchu</span>
              </div>
              <h3 className="font-display text-3xl text-primary mb-4 font-bold group-hover:text-secondary transition-colors">Ortopedia</h3>
              <p className="text-muted-foreground leading-relaxed">Kompleksowe leczenie schorzeń kości i stawów przywracające sprawność.</p>
            </div>
             <Link to="/dorosli" className="mt-8 text-secondary hover:text-primary transition-colors flex items-center gap-2 group/link w-fit font-bold">
              ZOBACZ <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          <div className="md:col-span-6 bg-primary text-primary-foreground p-10 rounded-[2rem] shadow-soft flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl transition-all relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-[#001430] opacity-80 z-0"></div>
            <div className="relative z-10">
               <div className="mb-6">
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">Zabiegowe</span>
              </div>
              <h3 className="font-display text-3xl mb-4 font-bold">Chirurgia Ogólna</h3>
              <p className="text-white/80 leading-relaxed">Tradycyjne i małoinwazyjne zabiegi przeprowadzane przez zespół ekspertów.</p>
            </div>
            <Link to="/dorosli" className="relative z-10 mt-8 text-secondary-foreground hover:text-white transition-colors flex items-center gap-2 group/link w-fit font-bold opacity-90">
              ZOBACZ <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1.5 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* Kontakt i opinie u dołu strony */}
      <ContactSection />
    </div>
  );
}

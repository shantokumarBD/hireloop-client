import Logo from "../shared/Logo";
import AuthButtons from "../shared/AuthButtons";
import MobileNav from "../shared/MobileNav";
import NavLinks from "../shared/NavLinks";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full pt-4 pb-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center justify-between h-16 px-6 rounded-2xl bg-[#0F1014]/90 backdrop-blur-md border border-white/10 shadow-2xl">
          <Logo />

          <div className="flex items-center gap-7">
            <NavLinks />
            <div className="hidden md:block h-4 w-px bg-white/15" />
            <AuthButtons />
            <MobileNav />
          </div>
        </nav>
      </div>
    </header>
  );
}
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  ChevronDown,
  Globe,
} from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { useUIStore } from "../../store/uiStore";
import {
  useCurrencyStore,
  CURRENCIES,
  type CurrencyCode,
} from "../../store/currencyStore";
import { ROUTES } from "../../constants/routes";

const brandLinks = [
  { label: "Donaldson Filtration", to: ROUTES.brand("donaldson") },
  { label: "YUKO Lubricants", to: ROUTES.brand("yuko") },
  { label: "Eurocar Batteries", to: ROUTES.brand("eurocar") },
];

export default function Navbar() {
  const [brandMenuOpen, setBrandMenuOpen] = useState(false);
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const itemCount = useCartStore((s) => s.itemCount());
  const openCart = useCartStore((s) => s.openCart);
  const openMobileMenu = useUIStore((s) => s.openMobileMenu);

  const currentCurrency = useCurrencyStore((s) => s.currentCurrency);
  const setCurrency = useCurrencyStore((s) => s.setCurrency);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`${ROUTES.search}?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <header className='sticky top-0 z-40 border-b border-neutral-border bg-blue-200'>
      <div className='mx-auto flex max-w-content items-center gap-4 px-4 py-3 lg:px-6'>
        <button
          type='button'
          onClick={openMobileMenu}
          className='rounded-md p-2 text-neutral-text hover:bg-neutral-bg lg:hidden'
          aria-label='Open menu'>
          <Menu size={22} />
        </button>

        <Link to={ROUTES.home} className='shrink-0'>
          <img src='/images/logo.png' alt='' className='h-10 w-auto' />
        </Link>

        <nav className='ml-4 hidden items-center gap-6 text-sm font-medium lg:flex'>
          <Link
            to={ROUTES.products}
            className='text-neutral-text hover:text-brand-donaldson'>
            All Products
          </Link>
          <div
            className='relative'
            onMouseEnter={() => setBrandMenuOpen(true)}
            onMouseLeave={() => setBrandMenuOpen(false)}>
            <button
              type='button'
              className='flex items-center gap-1 text-neutral-text hover:text-brand-donaldson'>
              Brands <ChevronDown size={16} />
            </button>
            {brandMenuOpen && (
              <div className='absolute left-0 top-full w-56 rounded-lg border border-neutral-border bg-neutral-surface py-2 shadow-lg'>
                {brandLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className='block px-4 py-2 text-sm text-neutral-text hover:bg-neutral-bg'>
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {/* Genuine Spare Parts - Elevated to Top Level */}
          <Link
            to={ROUTES.brand("spare-parts")}
            className='text-neutral-text hover:text-brand-donaldson'>
            Genuine Spare Parts
          </Link>
          <Link
            to={ROUTES.about}
            className='text-neutral-text hover:text-brand-donaldson'>
            About
          </Link>
          <Link
            to={ROUTES.contact}
            className='text-neutral-text hover:text-brand-donaldson'>
            Contact
          </Link>
        </nav>

        <form
          onSubmit={handleSearchSubmit}
          className='mx-auto hidden max-w-md flex-1 lg:block'>
          <div className='relative'>
            <Search
              size={18}
              className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-muted'
            />
            <input
              type='search'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search filters, oils, batteries…'
              className='w-full rounded-full border border-neutral-border bg-neutral-bg py-2 pl-10 pr-4 text-sm outline-none focus:border-brand-donaldson'
            />
          </div>
        </form>

        <div className='ml-auto flex items-center gap-1 lg:ml-0'>
          {/* Currency Selector */}
          <div
            className='relative hidden sm:block'
            onMouseEnter={() => setCurrencyMenuOpen(true)}
            onMouseLeave={() => setCurrencyMenuOpen(false)}>
            <button
              type='button'
              className='flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-neutral-text hover:bg-neutral-bg'>
              <Globe size={18} />
              {currentCurrency}
            </button>
            {currencyMenuOpen && (
              <div className='absolute right-0 top-full w-40 rounded-lg border border-neutral-border bg-neutral-surface py-2 shadow-lg'>
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                  <button
                    key={code}
                    onClick={() => {
                      setCurrency(code);
                      setCurrencyMenuOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm hover:bg-neutral-bg ${
                      currentCurrency === code
                        ? "font-bold text-brand-donaldson"
                        : "text-neutral-text"
                    }`}>
                    {CURRENCIES[code].symbol} {code}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            to={ROUTES.account}
            className='rounded-full p-2 text-neutral-text hover:bg-neutral-bg'
            aria-label='Account'>
            <User size={22} />
          </Link>
          <button
            type='button'
            onClick={openCart}
            className='relative rounded-full p-2 text-neutral-text hover:bg-neutral-bg'
            aria-label='Open cart'>
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <span className='absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-donaldson px-1 text-xs font-semibold text-white'>
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

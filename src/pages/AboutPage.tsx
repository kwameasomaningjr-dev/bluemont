import { Award, BadgeCheck, MapPinned, ShieldCheck, Truck } from "lucide-react";
import { brands } from "../data/brands";
import { ROUTES } from "../constants/routes";
import { Link } from "react-router-dom";
import { SectionHeading } from "../components/utility/SectionHeading";

const values = [
  {
    icon: BadgeCheck,
    title: "Genuine Products",
    description:
      "Every item we sell is sourced directly from authorised manufacturers — no counterfeits, ever.",
  },
  {
    icon: ShieldCheck,
    title: "Quality You Can Trust",
    description:
      "From heavy-duty filtration to industrial lubricants and batteries, our range is built for Ghana’s roads and worksites.",
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    description:
      "We deliver across all 16 regions of Ghana, with fast turnaround from our Tema warehouse.",
  },
  {
    icon: MapPinned,
    title: "Locally Rooted",
    description:
      "Headquartered in Tema, Community 25 — proudly serving Ghanaian businesses and motorists since day one.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className='bg-neutral-surface'>
        <div className='mx-auto max-w-content px-4 py-16 text-center lg:px-6'>
          <SectionHeading
            label='About Bluemont'
            heading='Your Trusted Partner in Filtration, Lubricants &amp; Batteries'
            subtext='Bluemont Engineering Services supplies genuine Donaldson Filtration, YUKO Lubricants, and Eurocar Batteries to businesses and motorists across Ghana.'
            align='center'
          />
        </div>
      </section>

      <section className='mx-auto max-w-content px-4 py-14 lg:px-6'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {values.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className='rounded-2xl border border-neutral-border bg-neutral-surface p-6 text-center'>
              <span className='mx-auto inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-donaldson/10 text-brand-donaldson'>
                <Icon size={22} />
              </span>
              <h3 className='mt-4 font-display text-base font-bold text-neutral-text'>
                {title}
              </h3>
              <p className='mt-1.5 text-sm text-neutral-muted'>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='bg-neutral-surface'>
        <div className='mx-auto max-w-content px-4 py-14 lg:px-6'>
          <SectionHeading
            label='Our Brands'
            heading='Three Brands, One Promise of Quality'
            align='center'
          />
          <div className='mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3'>
            {brands.map((brand) => (
              <div
                key={brand.slug}
                className='rounded-2xl border border-neutral-border bg-neutral-bg p-6 text-center'>
                <span
                  className='mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white'
                  style={{ backgroundColor: brand.colorPrimary }}>
                  {brand.name.charAt(0)}
                </span>
                <h3 className='mt-4 font-display text-lg font-bold text-neutral-text'>
                  {brand.name}
                </h3>
                <p className='mt-1 text-sm text-neutral-muted'>
                  {brand.tagline}
                </p>
                <Link
                  to={ROUTES.brand(brand.slug)}
                  className='mt-4 inline-block text-sm font-semibold hover:underline'
                  style={{ color: brand.colorPrimary }}>
                  Explore {brand.name} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-content px-4 py-14 lg:px-6'>
        <div className='flex flex-col items-center gap-4 rounded-2xl border border-status-success/30 bg-status-success/10 p-8 text-center sm:flex-row sm:text-left'>
          <span className='rounded-xl bg-status-success/15 p-3 text-status-success'>
            <Award size={28} />
          </span>
          <div>
            <h3 className='font-display text-lg font-bold text-neutral-text'>
              🇬🇭 Proudly Made in Ghana
            </h3>
            <p className='mt-1 max-w-2xl text-sm text-neutral-muted'>
              Eurocar Batteries are manufactured locally in Tema, supporting
              Ghanaian jobs and giving you faster access to genuine,
              climate-tested batteries — every unit backed by a comprehensive
              1-year warranty.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

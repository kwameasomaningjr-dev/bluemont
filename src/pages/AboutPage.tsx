import { brands } from "../data/brands";
import { ROUTES } from "../constants/routes";
import { Link } from "react-router-dom";
import { SectionHeading } from "../components/utility/SectionHeading";

export default function AboutPage() {
  return (
    <div className="bg-neutral-bg">
      <section className='bg-neutral-surface border-b border-neutral-border'>
        <div className='mx-auto max-w-content px-4 py-20 text-center lg:px-6'>
          <SectionHeading
            label='About Bluemont'
            heading='Engineering Excellence in Filtration, Lubricants & Batteries'
            subtext='Bluemont Engineering Services is Ghana’s premier destination for world-class industrial and automotive solutions.'
            align='center'
          />
        </div>
      </section>

      <section className='mx-auto max-w-content px-4 py-20 lg:px-6'>
        <div className='grid grid-cols-1 gap-12'>
          {brands.map((brand) => (
            <div key={brand.slug} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-display text-3xl font-bold text-neutral-text mb-4">{brand.name}</h3>
                <p className="text-neutral-muted leading-relaxed mb-6">{brand.description}</p>
                <Link
                  to={ROUTES.brand(brand.slug)}
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-bold text-white transition-all"
                  style={{ backgroundColor: brand.colorPrimary }}
                >
                  Explore {brand.name} &rarr;
                </Link>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-xl bg-neutral-surface aspect-video flex items-center justify-center p-12">
                 <img src={brand.heroImage} alt={brand.name} className="w-full max-w-sm object-contain" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

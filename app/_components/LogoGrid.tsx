import Image from "next/image";

const LogoGrid = () => {
  const partners = [
    {
      name: "exness",
      image: "/assets/icons/exness.svg",
    },
    {
      name: "deriv",
      image: "/assets/icons/deriv.svg",
    },
    {
      name: "fbs",
      image: "/assets/icons/fbs.svg",
    },
  ];
  return (
    <div className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h3 className="font-semibold text-sm text-gray-600 text-center uppercase">
          Global Traders Trust Our Signals for Consistent Success.
        </h3>
        <div className="mt-6">
          <ul className="flex gap-y-6 flex-wrap items-center justify-center [&>*]:px-12 lg:divide-x">
            {partners.map((company) => (
              <li className="flex-none" key={company.name}>
                <Image
                  src={company.image}
                  alt={company.name}
                  width={240}
                  height={1200}
                  priority={true}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LogoGrid;

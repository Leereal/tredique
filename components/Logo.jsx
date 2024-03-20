import Image from "next/image";
import Link from "next/link";
export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center justify-center gap-x-2 flex">
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          priority={true}
          height={40}
          width={40}
        />
        <h1 className="logo bg-gradient-to-r from-[#0F52BA] to-[#50C878] bg-clip-text text-transparent">
          TREDIQUE
        </h1>
      </div>
    </Link>
  );
};

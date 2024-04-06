import { socialLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SocialWidgets = () => {
  return (
    <div className="min-w-screen flex items-center justify-center my-5">
      <div className="w-full space-y-3 md:flex md:justify-between md:items-center">
        {socialLinks &&
          socialLinks.map((socialLink) => (
            <div
              key={socialLink.label}
              className="bg-slate-100 p-3 flex rounded-xl"
            >
              <div className="w-1/3 flex items-center justify-center">
                <Image
                  src={socialLink.icon}
                  alt={socialLink.label}
                  width={50}
                  height={50}
                />
              </div>

              <div className="w-2/3 flex flex-col items-center">
                <h3 className="font-bold text-primary text-xl">
                  {socialLink.label}
                </h3>
                <Link href={socialLink.link}>
                  <p className="text-blue-300 font-semibold">
                    {socialLink.btnMessage}
                  </p>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SocialWidgets;

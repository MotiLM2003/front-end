import Image from "next/image";
import React from "react";
import logo from "../../../images/logo-white.svg";
import question from "../../../images/question.svg";
import settings from "../../../images/settings.svg";
import bell from "../../../images/bell.svg";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-primary min-h-[98px] p-4 text-`>">
      <div className="flex flex-row-reverse gap-3 justify-start">
        <Image src={logo} />
        <Image src={question} />
        <Link className="cursor-pointer" href="/crm/settings/">
          <Image src={settings} className="cursor-pointer" />
        </Link>
        <Image src={bell} />
      </div>
    </header>
  );
};

export default Header;

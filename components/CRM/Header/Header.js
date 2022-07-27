import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import logo from "../../../images/logo-white.svg";
import question from "../../../images/question.svg";
import settings from "../../../images/settings.svg";
import bell from "../../../images/bell.svg";
import Link from "next/link";
import UserSwitcher from "../UserSwitcher/UserSwitcher";

const Header = () => {
  const onUserSwitch = (user) => {
    console.log("user", user);
  };
  return (
    <header className="bg-primary min-h-[98px] p-4 `>">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <div className="ml-[1rem] flex gap-3 items-center">
            <Link className="cursor-pointer" href="/crm/settings/">
              <Image src={settings} className="cursor-pointer" />
            </Link>
            <Image src={bell} />
            <Image src={question} />
          </div>

          <div className="">
            <Image src={logo} />
          </div>
        </div>
        <div className="flex justify-center">
          <UserSwitcher onSelected={onUserSwitch} />
        </div>
      </div>
    </header>
  );
};

export default Header;

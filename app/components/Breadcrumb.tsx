"use client";

import React, { ReactNode } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";

type TBreadCrumbProps = {
  homeElement?: ReactNode;
  separatorElement?: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
  listCrumbs?: ICrumb[];
};

export interface ICrumb {
  name: string;
  link?: string;
}

const NextBreadcrumb = ({
  homeElement,
  separatorElement,
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks,
  listCrumbs,
}: TBreadCrumbProps) => {
  const paths = usePathname() || "";
  const pathNames = paths.split("/").filter((path) => path);

  const home = homeElement ? homeElement : "Home";
  const separator = separatorElement ? separatorElement : ">";
  const listClass = containerClasses
    ? containerClasses
    : "flex gap-2 mb-5 font-semibold flex-wrap dark:text-white";

  return (
    <div className="w-full text-left">
      <ul className={listClass}>
        <li className={listClasses} key={"home"}>
          <Link href={"/"}>{home}</Link>
        </li>
        {pathNames.length > 0 && separator}

        {listCrumbs &&
          listCrumbs.map((item, index) => (
            <li key={index} className={listClasses}>
              {item.link ? (
                <Link href={item.link}>{item.name}</Link>
              ) : (
                <span className={`font-normal  ${listClasses}`}>
                  {item.name}
                </span>
              )}
              {index < listCrumbs.length - 1 && separator}
            </li>
          ))}

        {!listCrumbs &&
          pathNames.map((link, index) => {
            let href = `/${pathNames.slice(0, index + 1).join("/")}`;
            let itemClasses =
              paths === href ? `${listClasses} ${activeClasses}` : listClasses;
            let itemLink = capitalizeLinks
              ? link[0].toUpperCase() + link.slice(1, link.length)
              : link;
            return (
              <React.Fragment key={index}>
                <li className={itemClasses}>
                  <Link href={href}>{itemLink}</Link>
                </li>
                {pathNames.length !== index + 1 && separator}
              </React.Fragment>
            );
          })}
      </ul>
    </div>
  );
};

export default NextBreadcrumb;

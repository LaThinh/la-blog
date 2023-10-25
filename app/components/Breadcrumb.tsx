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
        <li className={`flex gap-2 items-center ${listClasses}`} key={"home"}>
          <svg
            className="w-[16px] h-[16px] text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
          </svg>
          <Link href={"/"}>{home}</Link>
        </li>

        {listCrumbs &&
          listCrumbs.map((item, index) => (
            <li
              key={index}
              className={`flex gap-2 items-center ${listClasses}`}
            >
              <svg
                className="w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>

              {item.link ? (
                <Link href={item.link}>{item.name}</Link>
              ) : (
                <span className={`font-normal  ${listClasses}`}>
                  {item.name}
                </span>
              )}
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

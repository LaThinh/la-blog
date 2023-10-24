"use client";

import React, { useEffect, useState } from "react";
import {
  Switch,
  useSwitch,
  VisuallyHidden,
  SwitchProps,
} from "@nextui-org/react";
import { useTheme } from "next-themes";

import { MoonIcon, SunIcon } from "@/app/icons/Icons";

const ThemeSwitch = (props: SwitchProps) => {
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch(props);

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const changeTheme = () => {
    setTheme(theme == "light" ? "dark" : "light");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center  justify-end">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              "w-8 h-8 m-0",
              "flex items-center justify-center",
              "rounded-lg bg-default-100 hover:bg-default-200",
              "dark:bg-white dark:hover:bg-gray-300 dark:text-blue-500",
            ],
          })}
          onClick={changeTheme}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </div>
      </Component>
      <p className="text-default-500 select-none hidden">
        {theme === "light" ? "Light" : "Dark"}
      </p>
    </div>
  );
};

export default ThemeSwitch;

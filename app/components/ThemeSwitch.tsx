"use client";

import React from "react";
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

  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    setTheme(theme == "light" ? "dark" : "light");
  };

  return (
    <div className="flex gap-1 items-center">
      <p className="text-default-500 select-none hidden">
        {theme === "light" ? "Light" : "Dark"}
      </p>

      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              "w-8 h-8",
              "flex items-center justify-center",
              "rounded-lg bg-default-100 hover:bg-default-200",
              "dark:bg-white dark:hover:bg-gray-300",
            ],
          })}
          onClick={changeTheme}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </div>
      </Component>
    </div>
  );
};

export default ThemeSwitch;
// export default function App() {
//   return <ThemeSwitch />;
// }

// import React from 'react'
// import PropTypes from 'prop-types'

// function ThemeSwitch(props) {
//   return (
//     <div>ThemeSwitch</div>
//   )
// }

// ThemeSwitch.propTypes = {}

// export default ThemeSwitch

import React from "react";
import WidgetSearch from "./WidgetSearch";
import WidgetCategories from "./WidgetCategories";
import WidgetNewPost from "./WidgetNewPost";

function Sidebar() {
  return (
    <div className="sidebar lg:sticky lg:top-[100px] flex flex-col gap-5 xl:gap-10">
      <WidgetNewPost items={5} />
      <WidgetCategories />
      <WidgetSearch />
    </div>
  );
}

export default Sidebar;

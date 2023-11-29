import React, { useState, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTab } from "../../Store/Slices/tabSlice";

interface TabProps {
  tabs: string[];
  contentComponents: ReactNode[];
  reduxTab: boolean;
}

const TabComponent: React.FC<TabProps> = ({
  reduxTab,
  tabs,
  contentComponents,
}) => {
  const [currentTab, setCurrentTab] = useState(1);

  const dispatch = useDispatch();
  const currTab = useSelector((state: any) => state.tab.createcourseTab);

  const handleTabClick = (tabNumber: number) => {
    if (!reduxTab) {
      setCurrentTab(tabNumber);
    } else {
      dispatch(addTab({ createcourseTab: tabNumber }));

    }
  };

  return (
    <>
      {!reduxTab ? (
        <>
          <div className="flex rounded-xl w-full overflow-x-scroll scrollbar-hidden">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`cursor-pointer lg:px-4 py-2 px-2 ${
                  currentTab === index + 1
                    ? "border-b-2 border-primary text-primary"
                    : ""
                }`}
                onClick={() => handleTabClick(index + 1)}
              >
                {tab}
              </div>
            ))}
          </div>
          <div className="mt-4  rounded-lg ">
            {contentComponents.map((content, index) => (
              <div key={index}>{currentTab === index + 1 && content}</div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex rounded-xl w-full">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`cursor-pointer px-4 py-2 ${
                  currTab === index + 1
                    ? "border-b-2 border-primary text-primary"
                    : ""
                }`}
                onClick={() => handleTabClick(index + 1)}
              >
                {tab}
              </div>
            ))}
          </div>
          <div className="mt-4 px-5 rounded-lg pb-5">
            {contentComponents.map((content, index) => (
              <div key={index}>{currTab === index + 1 && content}</div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default TabComponent;

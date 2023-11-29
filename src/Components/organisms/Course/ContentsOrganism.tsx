//@ts-nocheck
import React from "react";
import AccordionCustomIcon from "../../atoms/Accordion";
import { PiVideoLight } from "react-icons/pi";
import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import { TfiLock } from "react-icons/tfi";
import { GoPlay } from "react-icons/go";
import { MdDownloading } from "react-icons/md";
import PlayerModal from "../../molecules/Others/VideoModal";
import { useState } from "react";
import customAxios from "../../../Utils/customAxios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

type Content = {
  _id: string;
  name: string;
  description: string;
  data: string; 
  type: string;
  section: string;
  attachment: string[];
  isDeleted: boolean;
  course: string;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  content: {
    _id: string;
    name: string;
    description: string;
    data: string;
    type: string;
    section: string;
    attachment: string[];
    isDeleted: boolean;
    course: string;
    createdAt: string;
    updatedAt: string;
  }[];
  section: string[];
  playBUttonSubscriber?: boolean;
  setUrl?: React.Dispatch<React.SetStateAction<string>>;
  setContents?: React.Dispatch<React.SetStateAction<Content>>;
  locked?: boolean;
  activated?: string[];
  instructor?: string;
  handleVideoEnd?: () => void;
};

const ContentsOrganism: React.FC<Props> = ({
  setUrl,
  playBUttonSubscriber,
  content,
  section,
  setContents,
  locked,
  activated,
  handleVideoEnd,
  instructor
}) => {
  const [vdoUrl, setVdoUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const email = useSelector((state: any) => state.user.email);

  const handlePreviewClick = (link: string) => {
    setVdoUrl(link);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

 

  const organizedContent = section.reduce<React.ReactNode[]>(
    (acc, itemsection, index) => {
      const sectionContent = content
        .filter((item) => item.section === itemsection)
        .map((item, innerIndex) => (
          <div className="flex justify-between items-center border-b last:border-none p-3">
            <div
              className="flex items-center gap-3 text-[15px]"
              key={innerIndex}
            >
              <PiVideoLight
                className={`text-primary  ${
                  item.type == "video" ? "block" : "hidden"
                }`}
                size={20}
              />
              <HiOutlineDocumentChartBar
                className={`text-primary  ${
                  item.type == "document" ? "block" : "hidden"
                }`}
                size={20}
              />
              {item.name}
            </div>

            {locked ? (
              <>
                <div>
                  <TfiLock
                    className={`text-sec_pink ${
                      index == 0 && innerIndex == 0 || email===instructor ? "hidden" : "block"
                    }`}
                    size={18}
                  />
                  <div
                    onClick={() => {
                      if (!playBUttonSubscriber) {
                        handlePreviewClick(item.data);
                      } else {
                        if (setUrl && setContents) {
                          setUrl(import.meta.env.VITE_BUCKET_BASE + item.data);
                          setContents(item);
                        }
                      }
                    }}
                  >
                    <GoPlay
                      className={`text-primary cursor-pointer ${
                        ((index == 0 && innerIndex == 0) || (email===instructor)) && item.type === "video"
                          ? "block"
                          : "hidden"
                      }`}
                      size={22}
                    />
                  </div>

                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href =
                        import.meta.env.VITE_BUCKET_BASE + item.data;
                    }}
                  >
                    <MdDownloading
                      className={`text-primary cursor-pointer ${
                        ((index == 0 && innerIndex == 0) || (email===instructor))  &&
                        item.type === "document"
                          ? "block"
                          : "hidden"
                      }`}
                      size={22}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <TfiLock
                    className={`text-sec_pink ${
                     activated?.includes(item._id) || index===0 && innerIndex===0 ? "hidden" : "block"
                    }`}
                    size={18}
                  />
                  <div
                    onClick={() => {
                      if (!playBUttonSubscriber) {
                        handlePreviewClick(item.data);
                      } else {
                        if (setUrl && setContents) {
                          setUrl(import.meta.env.VITE_BUCKET_BASE + item.data);
                          setContents(item);
                        }
                      }
                    }}
                  >
                    <GoPlay
                      className={`text-primary cursor-pointer ${
                          ((activated?.includes(item._id)) || (index==0 && innerIndex== 0)) && item.type === "video"
                          ? "block"
                          : "hidden"
                      }`}
                      size={22}
                    />
                  </div>

                  <div
                    onClick={(e) => {
                      handleVideoEnd && handleVideoEnd(item._id);
                      e.preventDefault();
                      window.location.href =
                        import.meta.env.VITE_BUCKET_BASE + item.data;
                    }}
                  >
                    <MdDownloading
                      className={`text-primary cursor-pointer ${
                        ((activated?.includes(item._id)) || (index==0 && innerIndex== 0)) && item.type === "document"
                          ? "block"
                          : "hidden"
                      }`}
                      size={22}
                    />
                  </div>
                </div>
              </>
            )}

            {!playBUttonSubscriber && (
              <PlayerModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                videoUrl={import.meta.env.VITE_BUCKET_BASE + vdoUrl}
              />
            )}
          </div>
        ));
      acc.push(
        <AccordionCustomIcon
          key={index}
          accordionHeader={
            <p>
              Module {index + 1} : {itemsection}
            </p>
          }
          accordionNumber={index + 1}
        >
          <ul>{sectionContent}</ul>
        </AccordionCustomIcon>
      );
      return acc;
    },
    []
  );

  return <>{organizedContent}</>;
};

export default ContentsOrganism;

import React from "react";
import { notificationImages } from "../constants";
import { notification1 } from "../assets";

const Notification = () => {
  return (
    <div
      className="hidden items-center absolute bottom-[6rem] -right-[6rem] bg-n-10/40
      backdrop-blur rounded-xl p-2 border border-n-1 w-[18rem] h-[5rem] lg:flex gap-4"
    >
      <img
        src={notification1}
        alt=""
        width={64}
        height={40}
        className="rounded-xl"
      />

      <div className="">
        <h3 className=" text-n-1 text-sm font-semibold mb-2">
          Code Generation
        </h3>

        <div className="">
          <ul className="flex gap-2">
            {notificationImages.map((image, index) => (
              <li key={index}>
                <img
                  src={image}
                  alt="/index"
                  width={26}
                  height={26}
                  className="object-cover rounded-full"
                />
              </li>
            ))}
            <p className="absolute text-xs text-n-3  bottom-3 right-3">
              1m ago
            </p>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notification;

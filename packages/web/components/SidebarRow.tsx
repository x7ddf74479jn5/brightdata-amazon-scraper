"use client";

import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { DocumentData } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "react-spinkit";

type Props = {
  doc: DocumentData;
};

export const SidebarRow = ({ doc }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(doc.id));
  }, [pathname, doc]);

  return (
    <li>
      <button
        className={`flex flex-col md:flex-row justify-between p-4 cursor-pointer hover:bg-white hover:shadow-md rounded-lg ${
          active && "bg-white shadow-md"
        }`}
        onClick={() => router.push(`/search/${doc.id}`)}
      >
        <div className="flex flex-col justify-center">
          <p className="text-sm md:text-base font-bold">{doc.data().search}</p>
          {doc.data().status === "pending" && <p className="text-sx">Scraping information...</p>}
        </div>

        <span className="-order-2 md:order-1 ">
          {doc.data().status === "pending" ? (
            <Spinner name="cube-grid" fadeIn="none" color="indigo" />
          ) : (
            <CheckCircleIcon className="h-6 w-6 text-green-500" />
          )}
        </span>
      </button>
    </li>
  );
};

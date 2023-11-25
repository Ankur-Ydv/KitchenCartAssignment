import Link from "next/link";
import React from "react";

interface props {
  title: string;
  links: string[];
}

const Table = ({ title, links }: props) => {
  return (
    <table className="w-full table-fixed h-fit">
      <thead className="w-full bg-gray-400 ">
        <tr>
          <th className="border border-white w-16 p-1">S.NO.</th>
          <th className="border border-white p-1">{title}</th>
        </tr>
      </thead>
      <tbody className="w-full bg-gray-300">
        {links.map((link, index) => {
          return (
            <tr key={index}>
              <td className="border border-white p-1 text-center">{index}</td>
              <td className="border border-white p-1 px-3 whitespace-nowrap text-ellipsis overflow-hidden">
                <Link
                  href={link}
                  target="_blank"
                  className="hover:text-gray-400"
                >
                  {link}
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

"use client";
import React, { Suspense, useState } from "react";
import Table from "./Table";

const Home = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [links, setLinks] = useState({ brokenLinks: [], validLinks: [] });
  const handleClick = async () => {
    if (search) {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/check?url=${search}`);
        const data = await response.json();
        if (response.status === 200) setLinks(data);
        else throw Error("Invalid");
        setIsLoading(false);
      } catch (error) {
        setMsg("Unable to access the URL!");
        setIsLoading(false);
      }
    } else {
      setMsg("URL cannot be empty!");
    }
  };

  return (
    <main className="w-full h-full flex flex-col items-center gap-8 mt-8 px-2">
      <section className="w-full md:w-1/3 flex flex-col gap-4 justify-center items-center">
        <h1 className="text-3xl font-semibold text-gray-600">
          Detect 404 URLs
        </h1>
        <input
          type="text"
          placeholder="Please enter your URL here"
          className="p-2 w-full rounded-md shadow-sm border border-gray-400"
          disabled={isLoading}
          onChange={(e) => setSearch(e.target.value)}
        />
        {msg !== "" && <p className="text-red-500 -mt-2">{msg}</p>}
        <button
          type="button"
          onClick={handleClick}
          className="bg-gray-200 px-4 py-2 rounded-md shadow-md font-semibold"
        >
          {isLoading ? "Finding..." : "Submit"}
        </button>
      </section>

      <section className="w-full md:w-2/3 flex flex-col justify-evenly gap-4 p-2">
        <Table
          title={"Invalid Links"}
          links={links.brokenLinks}
          key={"invalidLinks"}
        />
        <Table
          title={"Valid Links"}
          links={links.validLinks}
          key={"validLinks"}
        />
      </section>
    </main>
  );
};

export default Home;

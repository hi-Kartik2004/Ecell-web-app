"use client";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import React from "react";
import FooterSection from "../../(sections)/FooterSection";
import data from "@/app/data";
import GlassCard from "@/components/GlassCard";
import Loader from "@/components/Loader";
import teamData from "@/app/team";
import {
  BiLogoGithub,
  BiLogoGmail,
  BiLogoInstagram,
  BiLogoLinkedin,
} from "react-icons/bi";
import Link from "next/link";
import { Input } from "@/components/ui/input";

console.log(teamData);

const TeamMemberCard = ({
  name,
  post,
  imageUrl,
  instagram,
  linkedin,
  email,
  github,
}) => (
  <div className="max-w-xs mx-auto mb-4 border border-yellow rounded-lg shadow-[5px_5px_0px_0px_rgba(249,203,21)]">
    <div className="max-h-[300px] h-full max-w-[300px] flex flex-wrap overflow-hidden w-full bg-muted flex-grow">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name || "Image"}
          className="object-cover min-w-[280px] min-h-[300px]"
        />
      ) : (
        <span className="w-full h-full flex flex-wrap flex-wrapitems-center justify-center">
          No image available
        </span>
      )}
    </div>
    <div className="bg-secondary  p-4 rounded-b">
      <h3 className="text-center text-lg font-semibold">{name}</h3>
      <p className="text-center text-muted-foreground">{post}</p>
      <div className="flex flex-wrap flex-wrapflex-wrap items-center gap-2 mt-4 justify-around">
        {instagram && (
          <Link
            href={`https://instagram.com/${instagram}`}
            className="flex flex-wrap flex-wrapgap-2 items-center"
            target="_blank"
          >
            <BiLogoInstagram size={30} />
            {/* <p>{instagram}</p> */}
          </Link>
        )}

        {linkedin && (
          <Link
            href={`https://${linkedin}`}
            className="flex flex-wrap flex-wrapgap-2 items-center"
            target="_blank"
          >
            <BiLogoLinkedin size={30} />
            {/* <p>{linkedin}</p> */}
          </Link>
        )}

        {email && (
          <Link
            href={`mailto:${email}`}
            className="flex flex-wrap flex-wrapgap-2 items-center"
          >
            <BiLogoGmail size={30} />
            {/* <p>{email}</p> */}
          </Link>
        )}

        {github && (
          <Link
            href={`https://github.com/${github}`}
            className="flex flex-wrap flex-wrapgap-2 items-center"
            target="_blank"
          >
            <BiLogoGithub size={30} />
            {/* <p>{email}</p> */}
          </Link>
        )}
      </div>
    </div>
  </div>
);

const About = () => {
  const [loading, setLoading] = useState(true);
  const [searchYear, setSearchYear] = useState("");

  useEffect(() => {
    setLoading(false);
  }, []);

  const filteredTeamData = teamData.filter((team) =>
    team.year.includes(searchYear)
  );

  if (loading) {
    return (
      <div className="min-h-[100vh] flex flex-wrap items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <main className="dark:bg-[url('/texture-pattern-dark.svg')] bg-[url('/texture-pattern-light.svg')]">
      <div className="container flex flex-wrap flex-col items-center mx-auto p-4 bg-brown">
        <br />
        <br />
        <br />
        <div className="max-w-[800px]">
          <h1 className={`text-3xl font-bold mb-4  text-center`}>
            <span className="text-primary underline underline-offset-8">
              {data.aboutPageTitle}
            </span>
          </h1>
          {/* <p className="text-muted-foreground text-center">
            {data.aboutPageDescription}
          </p> */}
        </div>
        <div className="flex flex-wrap justify-around max-w-[1200px]">
          <GlassCard
            className="right-2 top-4 lg:left-2"
            data={data.aboutSectionVision}
          />
          <GlassCard
            className="-bottom-4 left-2 lg:left-[50%]"
            data={data.aboutSectionMission}
          />
          <div className="blob-container relative z-2">
            <svg
              className={`-bottom-6 right-2 lg:top-8 blob w-20 h-20 rounded-full bg-primary absolute transform z-1`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
            >
              <path
                fill="yellow"
                d="M37.5,-57.5C48.4,-45.6,55.2,-30.7,61.4,-15.6C67.6,-0.5,73.1,14.8,68.3,25.2C63.5,35.6,48.4,41,34.1,45.5C19.8,50,6.2,53.7,-9.3,56.4C-24.8,59.1,-49.6,60.8,-66.7,52C-83.7,43.3,-93.1,24,-96.7,6.5C-100.3,-11.1,-98.1,-26.6,-87.2,-40.6C-76.3,-54.6,-56.7,-67.1,-39.3,-72.9C-21.8,-78.6,-6.5,-77.6,8.9,-73.3C24.3,-68.9,48.5,-61.3,63.6,-50.3C78.8,-39.4,84.8,-25.2,89.2,-9.3C93.5,6.6,96.2,22.5,92.2,34.6C88.2,46.7,77.5,55,65.5,64.1C53.5,73.2,40.2,83,26.1,82.6C12,82.2,-2.8,71.7,-16.3,62.5C-29.7,53.3,-41.8,45.4,-53.1,35.4C-64.3,25.3,-74.6,13.2,-80.7,-0.2C-86.8,-13.7,-88.7,-27.5,-80.1,-39.4C-71.6,-51.3,-52.6,-61.4,-36.6,-69.5C-20.7,-77.6,-7.9,-83.7,4.9,-82.9C17.6,-82.1,35.2,-74.4,37.5,-57.5Z"
                transform="translate(100 100)"
              />
            </svg>
            <div className="backdrop-filter backdrop-blur-lg bg-card/50 bg-opacity-30 rounded-lg p-6 mt-10 shadow-inner border-2 dark:text-white  relative z-2 max-w-[1000px] ">
              <h1 className={`text-xl font-semibold `}>History</h1>
              <p className="my-4 text-primary">
                <b>{data.aboutPageHistoryHeading}</b>
              </p>
              <p className="mt-4 text-muted-foreground">
                {data.aboutPageHistoryP1}
              </p>
              <p className="mt-4 text-muted-foreground">
                {data.aboutPageHistoryP2}
              </p>
              <p className="mt-4 text-muted-foreground">
                {data.aboutPageHistoryP3}
              </p>
            </div>
          </div>
        </div>
        <br />
        {/* team */}
      </div>
      <Separator />
      <div className="mb-10">
        <div className="container mx-auto p-4">
          <br />
          <h1 className=" text-center text-3xl font-bold">
            Team <span className="text-primary">E Cell UVCE</span>
          </h1>
          <br />
          <div className=" w-full flex flex-wrap justify-center mb-10">
            <Input
              name={"year"}
              type="text"
              className="max-w-[200px]"
              placeholder="search team by year"
              value={searchYear}
              onChange={(e) => setSearchYear(e.target.value)}
            />
          </div>
          {filteredTeamData.length === 0 ? (
            <div className="mt-10 text-center">
              ❄️ Either the year entered is before E-cell was established, or we
              don't have that year's team details, reach us out if you think
              this is wrong.
            </div>
          ) : (
            filteredTeamData.slice(0, 1).map((team) => {
              console.log(team);
              return (
                <div key={team?.year}>
                  <h1 className="text-2xl text-center font-bold mb-4">
                    Presidents - {team?.year}
                  </h1>
                  <br />
                  <div className="flex flex-wrap flex-wrapflex-wrap justify-evenly gap-8">
                    {team?.presidents.map((president, index) => (
                      <TeamMemberCard key={index} {...president} />
                    ))}
                  </div>
                  <br />
                  <div className="flex flex-wrap flex-wrapflex-wrap justify-evenly gap-8">
                    <div>
                      <h1 className="text-2xl mt-10 text-center font-bold mb-4">
                        Public Relations Team Leads - {team?.year}
                      </h1>
                      <div className="flex flex-wrap flex-wrapjustify-evenly gap-8">
                        {team?.publicRelationsTeam.map(
                          (member, index) =>
                            member.post === "Lead" && (
                              <TeamMemberCard key={index} {...member} />
                            )
                        )}
                      </div>
                    </div>
                    <div>
                      <h1 className="text-2xl mt-10 text-center font-bold mb-4">
                        Public Relations Team - {team?.year}
                      </h1>
                      <div className="flex flex-wrap flex-wrapjustify-evenly gap-8">
                        {team?.publicRelationsTeam.map(
                          (member, index) =>
                            member.post !== "Lead" && (
                              <TeamMemberCard key={index} {...member} />
                            )
                        )}
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="flex flex-wrap flex-wrapflex-wrap justify-evenly gap-8">
                    <div>
                      <h1 className="text-2xl mt-10 text-center font-bold mb-4">
                        Design Leads - {team?.year}
                      </h1>
                      <div className="flex flex-wrap flex-wrapjustify-evenly gap-8">
                        {team?.designTeam.map(
                          (member, index) =>
                            (member.post === "Lead" ||
                              member.post == "Vice Lead") && (
                              <TeamMemberCard key={index} {...member} />
                            )
                        )}
                      </div>
                    </div>
                    <div>
                      <h1 className="text-2xl mt-10 text-center font-bold mb-4">
                        Design Team - {team?.year}
                      </h1>
                      <div className="flex flex-wrap flex-wrapjustify-evenly gap-8">
                        {team?.designTeam.map(
                          (member, index) =>
                            member.post !== "Lead" &&
                            member.post != "Vice Lead" && (
                              <TeamMemberCard key={index} {...member} />
                            )
                        )}
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="flex flex-wrap flex-wrapflex-wrap justify-evenly gap-8">
                    <div>
                      <h1 className="text-2xl mt-10 text-center font-bold mb-4">
                        Technical Leads - {team?.year}
                      </h1>
                      <div className="flex flex-wrap flex-wrapjustify-evenly gap-8">
                        {team?.technicalTeam.map(
                          (member, index) =>
                            member.post === "Lead" && (
                              <TeamMemberCard key={index} {...member} />
                            )
                        )}
                      </div>
                    </div>
                    <div>
                      <h1 className="text-2xl mt-10 text-center font-bold mb-4">
                        Technical Team - {team?.year}
                      </h1>
                      <div className="flex flex-wrap flex-wrapjustify-evenly gap-8">
                        {team?.technicalTeam.map(
                          (member, index) =>
                            member.post !== "Lead" && (
                              <TeamMemberCard key={index} {...member} />
                            )
                        )}
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="flex flex-wrap flex-wrapflex-wrap justify-evenly gap-8">
                    <div>
                      <h1 className="text-2xl mt-10 text-center font-bold mb-4">
                        Marketing Team Leads - {team?.year}
                      </h1>
                      <div className="flex flex-wrap flex-wrapjustify-evenly gap-8">
                        {team?.marketingTeam.map(
                          (member, index) =>
                            (member.post === "Lead" ||
                              member.post == "Vice Lead") && (
                              <TeamMemberCard key={index} {...member} />
                            )
                        )}
                      </div>
                    </div>
                    <div>
                      <h1 className="text-2xl mt-10 text-center font-bold mb-4">
                        Marketing Team - {team?.year}
                      </h1>
                      <div className="flex flex-wrap flex-wrapjustify-evenly gap-8">
                        {team?.marketingTeam.map(
                          (member, index) =>
                            member.post !== "Lead" &&
                            member.post !== "Vice Lead" && (
                              <TeamMemberCard key={index} {...member} />
                            )
                        )}
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="flex flex-wrap flex-col items-center justify-evenly gap-8">
                    <div>
                      <h1 className="text-2xl mt-10 text-center font-bold mb-4">
                        Content Team Leads - {team?.year}
                      </h1>
                      <div className="flex flex-wrap flex-wrapjustify-evenly gap-8">
                        {team?.contentTeam.map((member, index) => {
                          // Check if the member is a lead or vice lead
                          if (
                            member.post === "Lead" ||
                            member.post === "Vice Lead"
                          ) {
                            return <TeamMemberCard key={index} {...member} />;
                          }
                          return null; // Return null for other team members
                        })}
                      </div>
                    </div>
                    <div>
                      <h1 className="text-2xl mt-10 text-center font-bold mb-4">
                        Content Team - {team?.year}
                      </h1>
                      <div className="flex flex-wrap flex-wrapjustify-evenly gap-8">
                        {team?.contentTeam.map((member, index) => {
                          // Exclude leads and vice leads
                          if (
                            member.post !== "Lead" &&
                            member.post !== "Vice Lead"
                          ) {
                            return <TeamMemberCard key={index} {...member} />;
                          }
                          return null; // Return null for leads and vice leads
                        })}
                      </div>
                    </div>
                  </div>
                  <br />

                  <div className="flex flex-wrap flex-wrapflex-wrap justify-evenly gap-8">
                    <div>
                      <h1 className="text-2xl mt-10 text-center font-bold mb-4">
                        Operations Team Leads - {team?.year}
                      </h1>
                      <div className="flex flex-wrap flex-wrapjustify-evenly gap-8">
                        {team?.operationsTeam.map(
                          (member, index) =>
                            member.post === "Lead" && (
                              <TeamMemberCard key={index} {...member} />
                            )
                        )}
                      </div>
                    </div>
                    <div>
                      <h1 className="text-2xl mt-10 text-center font-bold mb-4">
                        Operations Team - {team?.year}
                      </h1>
                      <div className="flex flex-wrap flex-wrapjustify-evenly gap-8">
                        {team?.operationsTeam.map(
                          (member, index) =>
                            member.post !== "Lead" && (
                              <TeamMemberCard key={index} {...member} />
                            )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <Separator />
    </main>
  );
};

// const leads = [
//   {
//     name: "John Doe",
//     position: "President",
//     imageUrl: "https://placekitten.com/600/400",
//   },
//   {
//     name: "Jane Doe",
//     position: "Vice President",
//     imageUrl: "https://placekitten.com/300/200",
//   },
// ];
// const relation = [
//   {
//     name: "John Doe",
//     position: "Design Lead",
//     imageUrl: "https://placekitten.com/600/400",
//   },
//   {
//     name: "Jane Doe",
//     position: "Co-Design Lead",
//     imageUrl: "https://placekitten.com/300/200",
//   },
//   {
//     name: "Jane Doe",
//     position: "Co-Design Lead",
//     imageUrl: "https://placekitten.com/300/200",
//   },
// ];
// const design = [
//   {
//     name: "John Doe",
//     position: "Design Lead",
//     imageUrl: "https://placekitten.com/600/400",
//   },
//   {
//     name: "Jane Doe",
//     position: "Co-Design Lead",
//     imageUrl: "https://placekitten.com/300/200",
//   },
//   {
//     name: "Jane Doe",
//     position: "Co-Design Lead",
//     imageUrl: "https://placekitten.com/300/200",
//   },
// ];
// const tech = [
//   {
//     name: "Saini",
//     position: "Co-Design Lead",
//     imageUrl: "https://placekitten.com/300/200",
//   },
//   {
//     name: "Vansh Bhardwaj",
//     position: "Design Lead",
//     imageUrl: "https://placekitten.com/600/400",
//   },
// ];
// const market = [
//   {
//     name: "John Doe",
//     position: "Design Lead",
//     imageUrl: "https://placekitten.com/600/400",
//   },
//   {
//     name: "Jane Doe",
//     position: "Co-Design Lead",
//     imageUrl: "https://placekitten.com/300/200",
//   },
//   {
//     name: "Jane Doe",
//     position: "Co-Design Lead",
//     imageUrl: "https://placekitten.com/300/200",
//   },
// ];
// const content = [
//   {
//     name: "John Doe",
//     position: "Design Lead",
//     imageUrl: "https://placekitten.com/600/400",
//   },
//   {
//     name: "Jane Doe",
//     position: "Co-Design Lead",
//     imageUrl: "https://placekitten.com/300/200",
//   },
//   {
//     name: "Jane Doe",
//     position: "Co-Design Lead",
//     imageUrl: "https://placekitten.com/300/200",
//   },
// ];

export default About;

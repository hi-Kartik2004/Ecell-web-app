import Link from "next/link";
import React from "react";
import { BiSolidBullseye } from "react-icons/bi";
import { MdWorkspacePremium } from "react-icons/md";
import globalData from "@/app/data";

function MembershipForm() {
  return (
    <div>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid max-w-md gap-10 row-gap-5 sm:row-gap-10 lg:max-w-screen-md lg:grid-cols-2 sm:mx-auto mt-10">
          <div className="flex flex-col justify-between p-5 bg-primary shadow-xl shadow-primary/50 border rounded-lg">
            <div className="mb-6">
              <div className="flex items-center justify-between pb-6 mb-6 border-b">
                <div>
                  <p className="text-sm font-bold tracking-wider uppercase text-black">
                    {globalData?.joinPageMembershipCardMessage}
                  </p>
                  <p className="text-5xl font-extrabold text-black mt-2">
                    Rs {globalData?.joinPageMembershipCardAmount}
                  </p>
                </div>
                <div className="flex items-center justify-center w-24 h-24 border rounded-full bg-white">
                  <MdWorkspacePremium size={60} className="text-black" />

                  {/* <svg
                    className="w-10 h-10 text-black"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLidth="2"
                  >
                    <path
                      d="M4,7L4,7 C2.895,7,2,6.105,2,5v0c0-1.105,0.895-2,2-2h0c1.105,0,2,0.895,2,2v0C6,6.105,5.105,7,4,7z"
                      fill="none"
                      stroke="currentColor"
                    />
                    <path
                      d="M6,21H3v-4 l-2,0v-5c0-1.105,0.895-2,2-2h1"
                      fill="none"
                      stroke="currentColor"
                    />
                    <path
                      d="M20,7L20,7 c1.105,0,2-0.895,2-2v0c0-1.105-0.895-2-2-2h0c-1.105,0-2,0.895-2,2v0C18,6.105,18.895,7,20,7z"
                      fill="none"
                      stroke="currentColor"
                    />
                    <path
                      d="M18,21h3v-4 l2,0v-5c0-1.105-0.895-2-2-2h-1"
                      fill="none"
                      stroke="currentColor"
                    />
                    <path
                      d="M12,7L12,7 c-1.657,0-3-1.343-3-3v0c0-1.657,1.343-3,3-3h0c1.657,0,3,1.343,3,3v0C15,5.657,13.657,7,12,7z"
                      fill="none"
                      stroke="currentColor"
                    />
                    <path
                      d="M15,23H9v-6H7v-5 c0-1.105,0.895-2,2-2h6c1.105,0,2,0.895,2,2v6h-2V23z"
                      fill="none"
                      stroke="currentColor"
                    />
                  </svg> */}
                </div>
              </div>
              <div>
                <p className="mb-2 font-bold tracking-wide text-black">
                  Benefits
                </p>
                <ul className="space-y-2">
                  {globalData.joinPageMembershipCardBenefits &&
                    globalData?.joinPageMembershipCardBenefits.map(
                      (benefit) => {
                        return (
                          <li className="flex items-center">
                            <div className="mr-2">
                              <svg
                                className="w-4 h-4 text-black"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLidth="2"
                              >
                                <polyline
                                  fill="none"
                                  stroke="currentColor"
                                  points="6,12 10,16 18,8"
                                />
                                <circle
                                  cx="12"
                                  cy="12"
                                  fill="none"
                                  r="11"
                                  stroke="currentColor"
                                />
                              </svg>
                            </div>
                            <p className="font-medium text-gray-800">
                              {benefit}
                            </p>
                          </li>
                        );
                      }
                    )}
                </ul>
              </div>
            </div>
            <div>
              <Link
                href="/purchase"
                className="inline-flex items-center justify-center w-full h-12 px-6 mb-4 tracking-wide text-black font-bold transition duration-200 rounded-lg shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none border bg-white"
              >
                Purchase &rarr;
              </Link>
              <p className="text-sm text-gray-700">
                {globalData?.joinPageMembershipCardDescription}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between p-5 bg-indigo-50 border rounded-lg shadow-2xl shadow-indigo-50/50">
            <div className="mb-6">
              <div className="flex items-center justify-between pb-6 mb-6 border-b">
                <div>
                  <p className="text-sm text-black font-bold tracking-wider uppercase"></p>
                  <p className="text-5xl font-extrabold text-black">Free</p>
                </div>
                <div className="flex items-center justify-center w-24 h-24 border rounded-full bg-blue-gray-50">
                  <svg
                    className="w-10 h-10 text-gray-700"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLidth="2"
                  >
                    <path
                      d="M12,7L12,7 c-1.657,0-3-1.343-3-3v0c0-1.657,1.343-3,3-3h0c1.657,0,3,1.343,3,3v0C15,5.657,13.657,7,12,7z"
                      fill="none"
                      stroke="currentColor"
                    />
                    <path
                      d="M15,23H9v-5H7v-6 c0-1.105,0.895-2,2-2h6c1.105,0,2,0.895,2,2v6h-2V23z"
                      fill="none"
                      stroke="currentColor"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <p className="mb-2 font-bold tracking-wide text-black">
                  Benefits
                </p>
                <ul className="space-y-2">
                  {globalData.joinPageFreeCardBenefits &&
                    globalData?.joinPageFreeCardBenefits.map((benefit) => {
                      return (
                        <li className="flex items-center">
                          <div className="mr-2">
                            <svg
                              className="w-4 h-4 text-black"
                              viewBox="0 0 24 24"
                              strokeLinecap="round"
                              strokeLidth="2"
                            >
                              <polyline
                                fill="none"
                                stroke="currentColor"
                                points="6,12 10,16 18,8"
                              />
                              <circle
                                cx="12"
                                cy="12"
                                fill="none"
                                r="11"
                                stroke="currentColor"
                              />
                            </svg>
                          </div>
                          <p className="font-medium text-gray-800">{benefit}</p>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div>
              <Link
                href="/"
                className="inline-flex items-center justify-center w-full h-12 px-6 mb-4 font-medium tracking-wide text-primary transition duration-200 bg-gray-800 rounded-lg shadow-md hover:bg-gray-900 focus:shadow-outline focus:outline-none"
              >
                Start for free &rarr;
              </Link>
              <p className="text-sm text-gray-700">
                {globalData?.joinPageFreeCardDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MembershipForm;

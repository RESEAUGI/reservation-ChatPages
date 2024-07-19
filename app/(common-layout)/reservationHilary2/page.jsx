"use client"
import React, { useEffect, useState } from 'react';
import { Tab } from "@headlessui/react";
import { carlistings } from "@/public/data/carlisting";
import { HandThumbDownIcon, HandThumbUpIcon, HeartIcon, CheckIcon, ClockIcon, StarIcon } from "@heroicons/react/24/solid";
import {ChatBubbleLeftRightIcon} from "@heroicons/react/24/outline"
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import {
  CameraIcon,
  FaceSmileIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  PlusCircleIcon,
  VideoCameraIcon,
  XMarkIcon,
  PaperClipIcon, DocumentIcon
} from "@heroicons/react/24/outline";
import InputEmoji from "react-input-emoji";
import { useRef } from "react";
import { data } from 'autoprefixer';
import { MicrophoneIcon, StopIcon } from "@heroicons/react/20/solid";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


export default function page() {
  const scrollRef = useRef(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const searchParams = useSearchParams()
  //console.log("111111",searchParams.entries())
  const { id, img, price, title, driverPicture, driverName, driverNumber, driverLocation, driverMail, pass, bag, maxDistance, fuelType, boxType, star, departureCity, arrivalCity, departureDay, arrivalDay, departureHour, arrivalHour, travelClass }
  = Object.fromEntries(searchParams);
 
 


  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [count, setCount] = useState(1);
  const unitPrice = price;
  const maxSeats = pass; 
  const tax = 0; 
  
  

  const [childSeats, setChildSeats] = useState(0);
  const [hasChildSeats, setHasChildSeats] = useState(false);
  const [handicapSeats, setHandicapSeats] = useState(0);
  const [hasHandicapSeats, setHasHandicapSeats] = useState(false);
  const childSeatPrice = unitPrice/2; // Price per child seat
  const handicapSeatPrice = unitPrice*(2/3); // Price per handicap seat

  const handleSeatChange = (setSeatFunction, value, otherSeatCount) => {
    const newSeatCount = parseInt(value, 10);
    if (newSeatCount + otherSeatCount + count <= maxSeats) {
      setSeatFunction(newSeatCount);
    }
  };

  const handleChildSeatChange = (event) => {
    handleSeatChange(setChildSeats, event.target.value, handicapSeats);
  };

  const handleHandicapSeatChange = (event) => {
    handleSeatChange(setHandicapSeats, event.target.value, childSeats);
  };

  const childSeatsTotal = childSeats * childSeatPrice;
  const handicapSeatsTotal = handicapSeats * handicapSeatPrice;
  const additionalSeatsTotal = childSeatsTotal + handicapSeatsTotal;

  const increment = () => {
    if (count + childSeats + handicapSeats < maxSeats) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const totalPrice = (price * count + additionalSeatsTotal) * (1 + tax / 100);

  const [isChat, setIsChat] = useState(false);

  const handleChatClick = () => {
    setIsChat((prevIsChat) => !prevIsChat);
  }

  const selectedImage = true
  const [text, setText] = useState('');
  

  return (
    <>
       
    <div className="py-[30px] lg:py-[60px] bg-[var(--bg-2)] px-3">
      <div className="container">
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          <div className="col-span-12 lg:col-span-8">
            <div className="pb-lg-0">    
              <div className="bg-white  rounded-md p-3 sm:p-4 lg:p-6 mb-6">
              <div className="relative flex justify-between items-center: pb-4">
                <h3 className="h3">Travel Informations</h3>
                <button onClick={handleChatClick} className="link flex items-center relative group transition-transform transform hover:scale-110">
                  <ChatBubbleLeftRightIcon 
                    className="duration-100 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary hover:bg-blue-700 text-white " 
                  />
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-500">
                    Chat
                  </span>
                </button>
              </div>

                
        
                <Tab.Group>
                  <Tab.List className="flex gap-3 about-tab mb-7">
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          "focus:outline-none transition-transform transform hover:scale-105",
                          selected ? "font-medium border-2 border-primary rounded-md" : ""
                        )
                      }>
                        <Image
                      width={154}
                      height={42}
                      src={"/img/imgDescription1.png"}
                      alt="image"
                      className=""
                    />
                    </Tab>{""}
                   
                    <Tab
                      className={({ selected }) =>
                          classNames(
                            "focus:outline-none transition-transform transform hover:scale-105",
                            selected ? "font-medium border-2 border-primary rounded-md" : ""
                          )
                        }>                  
                      <Image
                      width={154}
                      height={42}
                      src="/img/imgDescription2.png"
                      alt="image"
                      className=""
                    />
                    </Tab>{" "}
                                   
                  </Tab.List>
                  <Tab.Panels className="tab-content">
                    <Tab.Panel>
                    <div className="flex flex-wrap border items-center rounded-md ">
                  <div className="rounded-md p-2">
                    <Image
                      width={200}
                      height={260}
                      src={img}
                      alt="image"
                      className=" w-full rounded-md" 
                    />
                  </div>
                  <div className="p-3 overflow-hidden flex-grow">
                    <div className="property-card__body">
                      <div className="grid grid-cols-12 gap-4 lg:gap-6 justify-between">
                        <div className="col-span-12 xl:col-span-8">
                          <div className="flex gap-6 mb-2">
                            <p
                            
                              className="text-[var(--neutral-700) font-semibold text-xl ">
                              {title}
                            </p>
                          </div>
                          <ul className="columns-1 lg:columns-2 ml-4 list-disc flex-wrap gap-3 md:ps-2">
                            <li className="py-2"> Cancel anytime </li>
                            <li className="py-2"> Discount Price </li>
                            <li className="py-2"> Confirmation </li>
                            <li className="py-2"> Liability Insured </li>
                          </ul>
                        </div>
                    
                      </div>
                      <ul className="flex divide-x divide-dashed mt-8 bg-[#F5FCF8] overflow-x-auto">
                        <li className="p-6 m-0 text-center flex-grow">
                          <i className="las text-[#279155] la-user-friends text-[32px] inline-block mb-1"></i>
                          <span className="block text-sm max-width mx-auto">
                            {pass} Pass
                          </span>
                        </li>
                        <li className="p-6 m-0 text-center flex-grow">
                          <i className="las text-[#279155] la-shopping-bag text-[32px] inline-block mb-1"></i>
                          <span className="block text-sm max-width mx-auto">
                            {" "}
                            {bag} Bags{" "}
                          </span>
                        </li>
                        <li className="p-6 m-0 text-center flex-grow">
                          <i className="las text-[#279155] la-tachometer-alt text-[32px] inline-block mb-1"></i>
                          <span className="block text-sm max-width mx-auto">
                            {" "}
                            {maxDistance} km{" "}
                          </span>
                        </li>
                            <li className="p-6 m-0 text-center flex-grow">
                              <i className="las text-[#279155] la-gas-pump text-[32px] inline-block mb-1"></i>
                          <span className="block text-sm max-width mx-auto">
                          {fuelType}
                          </span>
                        </li>
                        <li className="p-6 m-0 text-center flex-grow">
                          <i className="las text-[#279155] la-cog text-[32px] inline-block mb-1"></i>
                          <span className="block text-sm max-width mx-auto">
                            {" "}
                            {boxType}{" "}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                    </Tab.Panel>
                    <Tab.Panel>
                    <div className=" border items-center rounded-md ">
                    <div className=" rounded-md p-2 ">
                <div className="w-32 h-32 border ovenflow-hidden border-[var(--primary)] rounded-full bg-white p-4 grid place-content-center relative mx-auto mb-8">
                <Image
                  width={130}
                  height={130}
                  src={driverPicture}
                  //TODO: decommenter la ligne de img lorsque le connexion au back du driver service sera fonctionnelle
                  //src={`${DRIVER_SERVICE_URL}/uploads/${driverData.driverPicture}`}
                  alt="image"
                  className="rounded-full w-full h-full"
                />
              </div>
                <h4 className="text-center text-2xl font-semibold mb-8">
                  {" "}
                  {driverName}{" "}
                </h4>
                <h4 className="text-center text-lg mb-8">
                  {" "}
                  Contact: <span className='text-blue-700'>{driverNumber} | {driverLocation}{" "}</span>
                </h4>
                <h4 className="text-center text-lg mb-8">
                  {" "}
                  Mail: <span className='text-blue-700'>{driverMail}{" "}</span>
                </h4>
                <ul className="flex items-center gap-20 justify-center flex-wrap mb-8">
                <li>
                  <div className="flex gap-1 items-center">
                      <StarIcon className="w-5 h-5 text-[var(--tertiary)] " />
                      <p className="mb-0"> {star} </p>
                    </div>
                  </li>
                <li>
                  <div className="flex gap-1 items-center">
                      <HeartIcon className="w-5 h-5 text-red-500" />
                      <p className="mb-0"> {star} </p>
                    </div>
                  </li>
                  <li>
                  <div className="flex gap-1 items-center">
                      <HandThumbUpIcon className="w-5 h-5 text-blue-500" />
                      <p className="mb-0"> {star} </p>
                    </div>
                  </li>
                  <li>
                  <div className="flex gap-1 items-center">
                      <HandThumbDownIcon className="w-5 h-5 text-gray-900" />
                      <p className="mb-0"> {star} </p>
                    </div>
                  </li>
                  
                </ul>
                <div className="text-center pt-4">
                  <Link href="/pagePresentationConducteur" className="btn-outline rounded-md font-semibold">
                    See Host Profile
                  </Link>
                </div>
                </div>
                </div>              
                      
                    </Tab.Panel>


                  </Tab.Panels>
                </Tab.Group>
              </div>

            

              
              <div className="p-3 sm:p-4 lg:p-6 bg-white rounded-md mb-10">
                <h4 className="mb-5 text-2xl font-semibold">
                  {" "}
                  Inclusion & Exclusion{" "}
                </h4>
                <div className="mb-10">
                  <div className="grid grid-cols-12 gap-4 lg:gap-6">
                    <div className="col-span-12 md:col-span-4 lg:col-span-3">
                      <ul className="flex flex-col gap-4">
                        <li>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[var(--primary-light)]">
                              <i className="las la-check text-lg text-primary"></i>
                            </div>
                            <span className="inline-block"> State tax </span>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[var(--primary-light)]">
                              <i className="las la-check text-lg text-primary"></i>
                            </div>
                            <span className="inline-block">
                              Driver Allowance
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="col-span-12 md:col-span-4 lg:col-span-3">
                      <ul className="flex flex-col gap-4">
                        <li>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[var(--primary-light)]">
                              <i className="las la-check text-lg text-primary"></i>
                            </div>
                            <span className="inline-block">Toll charge</span>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[var(--primary-light)]">
                              <i className="las la-check text-lg text-primary"></i>
                            </div>
                            <span className="inline-block">
                              Pickup and drop
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="col-span-12 md:col-span-4 lg:col-span-3">
                      <ul className="flex flex-col gap-4">
                        <li>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[var(--primary-light)]">
                              <i className="las la-check text-lg text-primary"></i>
                            </div>
                            <span className="inline-block"> Internet </span>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[var(--primary-light)]">
                              <i className="las la-check text-lg text-primary"></i>
                            </div>
                            <span className="inline-block">Car Parking</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="col-span-12 md:col-span-4 lg:col-span-3">
                      <ul className="flex flex-col gap-4">
                        <li>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[#FFF9ED]">
                              <i className="las la-times text-lg text-[#9C742B]"></i>
                            </div>
                            <span className="inline-block"> Alarm </span>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[#FFF9ED]">
                              <i className="las la-times text-lg text-[#9C742B]"></i>
                            </div>
                            <span className="inline-block"> Pets Allow </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              

              <div className="p-3 sm:p-4 lg:p-6 bg-white rounded-md mb-10">
                  <h4 className="mb-5 text-2xl font-semibold">
                    {" "}
                    Safety Guidelines{" "}
                  </h4>
                  <ul className="flex flex-col gap-4 mb-5">
                    <li>
                      <div className="flex gap-4">
                        <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[var(--primary-light)]">
                          <i className="las la-check text-lg text-primary"></i>
                        </div>
                        <span className="inline-block">
                          Verify your ride: Before entering a cab, verify that
                          the car and driver match the details of your ride
                          booking. Check the license plate number and driver
                          photo on the app and match it with the car and driver
                          in front of you.
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="flex gap-4">
                        <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[var(--primary-light)]">
                          <i className="las la-check text-lg text-primary"></i>
                        </div>
                        <span className="inline-block">
                          Sit in the back seat: Always sit in the back seat of
                          the cab. This will give you more personal space and
                          distance from the driver.
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="flex gap-4">
                        <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[var(--primary-light)]">
                          <i className="las la-check text-lg text-primary"></i>
                        </div>
                        <span className="inline-block">
                          Wear your seatbelt: Always wear your seatbelt during
                          the ride. This is not only required by law in most
                          places, but it is also an important safety measure in
                          case of an accident.
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="flex gap-4">
                        <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[var(--primary-light)]">
                          <i className="las la-check text-lg text-primary"></i>
                        </div>
                        <span className="inline-block">
                          Avoid distractions: Avoid using your phone or other
                          electronic devices during the ride. This will help you
                          stay alert and aware of your surroundings.
                        </span>
                      </div>
                    </li>
                  </ul>
                 
                </div>

            </div>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <div id='chatBox' className={`fixed z-[4] h-[100%] max-h-[100vh] w-[34%] bg-white rounded-md border shadow-lg ${
              isChat ? 'block top-[10px]' : 'hidden'
              }`}
            >
              <div className="flex items-center gap-4 mb-4 p-2">
                <div className="w-10 h-10 relative z-[1] rounded-full shrink-0">
                  <Image
                    width={30}
                    height={30}
                    src='/public/img/user-1.PNG'
                    alt="image"
                    className="w-full h-full object-fit-cover overflow-hidden rounded-full"
                  />
                  <span className="inline-block w-4 h-4 rounded-full bg-[#37D27A] absolute end-0 bottom-0 z-[1]"></span>
                </div>
                <h5 className="mb-2 flex-grow clr-neutral-500 text-sl font-medium">{driverName}</h5>
                <Link
                  href="#"
                  className="link inline-block shrink-0 text-[var(--neutral-700)] hover:text-primary">
                  <VideoCameraIcon className="w-8 h-8 text-[var(--neutral-700)] hover:text-primary hover:fill-primary transition-colors duration-300 ease-in-out" />
                </Link>
                <button onClick={handleChatClick} className="close-button  hover:text-primary" style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '32px',
                  height: '32px',
                  border: 'none',
                  cursor: 'pointer',
                }}
                >
                  <XMarkIcon className="close-icon hover:text-primary w-8 h-8 text-[var(--neutral-700)] hover:text-primary hover:fill-primary transition-colors duration-300 ease-in-out" style={{
                    width: '24px',
                    height: '24px',
                    color: '#4b5563', // Gray-600
                  }}/>
                </button>
              </div>
              <div className="h-[100%] max-h-[79vh] scrollbar-hide bg-[#EAEBFD] overflow-y-auto p-4"
                style={{ overflowY: "auto" }}
                ref={scrollRef}>
                <ul className="flex flex-col gap-4">
                  <li>
                    <div className="flex flex-col items-start">
                      <div className="w-12 h-12 rounded-full overflow-hidden mb-4">
                        <Image
                          width={48}
                          height={48}
                          src="/img/user-5.jpg"
                          alt="image"
                          className="w-full h-full object-fit-cover"
                        />
                      </div>
                      <div className="bg-white rounded-lg py-3 px-5 md:max-w-[45%] relative after:absolute after:top-[-12px] after:left-4 after:border-l-[12px] after:border-l-transparent after:border-r-[12px] after:border-r-transparent after:border-b-[12px] after:border-b-white">
                        <p className="inline-block mb-0 clr-neutral-500 text-sl">
                          Lorem Ipsum is simply dummy text of the printing
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex flex-col items-end">
                      <div className="bg-white rounded-lg py-3 px-5 md:max-w-[45%]  relative after:absolute after:bottom-[-12px] after:right-4 after:border-l-[12px] after:border-l-transparent after:border-r-[12px] after:border-r-transparent after:border-t-[12px] after:border-t-white">
                        <p className="inline-block mb-0 clr-neutral-500">
                          I play Stronghold Kingdoms
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full overflow-hidden mt-4">
                        <Image
                          width={48}
                          height={48}
                          src="/img/user-2.jpg"
                          alt="image"
                          className="w-full h-full object-fit-cover"
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex flex-col items-end">
                      <div className="bg-white rounded-lg py-3 px-5 md:max-w-[45%]  relative after:absolute after:bottom-[-12px] after:right-4 after:border-l-[12px] after:border-l-transparent after:border-r-[12px] after:border-r-transparent after:border-t-[12px] after:border-t-white">
                        <p className="inline-block mb-0 clr-neutral-500">
                          I play Stronghold Kingdoms
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full overflow-hidden mt-4">
                        <Image
                          width={48}
                          height={48}
                          src="/img/user-2.jpg"
                          alt="image"
                          className="w-full h-full object-fit-cover"
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex flex-col items-end">
                      <div className="bg-white rounded-lg py-3 px-5 md:max-w-[45%]  relative after:absolute after:bottom-[-12px] after:right-4 after:border-l-[12px] after:border-l-transparent after:border-r-[12px] after:border-r-transparent after:border-t-[12px] after:border-t-white">
                        <p className="inline-block mb-0 clr-neutral-500">
                          I play Stronghold Kingdoms
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full overflow-hidden mt-4">
                        <Image
                          width={48}
                          height={48}
                          src="/img/user-2.jpg"
                          alt="image"
                          className="w-full h-full object-fit-cover"
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex justify-content-flex shrink-0 w-full h-14 mt-2">
                <button type="button" className="ml-2 mr-2 hover:text-primary">
                  <DocumentIcon className="h-6 w-6 text-gray-500  hover:text-primary" />
                </button>
                <button type="button" className='mr-1 hover:text-primary'>
                  <PaperClipIcon className="h-6 w-6 text-gray-500  hover:text-primary" />
                </button>
                <button
                  type="button"
                  // onClick={startAudioRecording}
                  className="link inline-block clr-neutral-500text-[var(--neutral-700)] hover:text-primary hover:fill-primary transition-colors duration-300 ease-in-out"
                >
                  <MicrophoneIcon className="w-8 h-8" />
                </button>
                <InputEmoji
                  className=' hover:text-primary'
                  value={text}
                  onChange={setText}
                  cleanOnEnter
                  shouldReturn
                  shouldConvertEmojiToImage={false}
                  placeholder="Type a message"
                  // onKeyDown={(e) => {
                  //   if (e.key === "Enter") {
                  //     handleSendMessage();
                  //   }
                  // }}
                />
              </div>
            </div>
            <div className="bg-white rounded-md p-3 sm:p-4 lg:p-6 border">
              <h4 className="mb-0 text-2xl font-semibold">Trip Details</h4>
              <div className="border border-dashed my-8"></div>
              <ul className="gap-4">
                <li className="flex items-center justify-between flex-wrap">
                  <p className="mb-0"><b>Departure Date</b></p>
                  <p className="mb-0 font-medium"><b>{departureCity}</b></p>
                </li>
                <li className="flex items-center justify-between flex-wrap">
                  <p className="mb-0">{departureDay}</p>
                  <p className="mb-0 font-medium">{departureHour}</p>
                </li>
                <div className="border border-dashed my-8"></div>
                <li className="flex items-center justify-between flex-wrap">
                  <p className="mb-0"><b>Arrival Date</b></p>
                  <p className="mb-0 font-medium"><b>{arrivalCity}</b></p>
                </li>
                <li className="flex items-center justify-between flex-wrap">
                  <p className="mb-0">{arrivalDay}</p>
                  <p className="mb-0 font-medium">{arrivalHour}</p>
                </li>
              </ul>
              
            </div>

            <div className="border border-dashed my-0"></div>
            <div className="bg-white rounded-md p-3 sm:p-4 lg:p-6 border">
            <h4 className="mb-0 text-2xl font-semibold">Pricing Details</h4>
            <div className="border border-dashed my-8"></div>
            <ul className="space-y-2">
              <li className="flex items-center justify-between flex-wrap">
                <p className="mb-0">Unit Price</p>
                <p className="mb-0 font-medium">{price} FCFA</p>
              </li>
              <li className="flex items-center justify-between flex-wrap">
                <p className="mb-0">Normal Seat(s)</p>
                <div className="flex items-center">
                  <button
                    className="px-[11px] py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    onClick={increment}
                  >
                    +
                  </button>
                  <span className="px-[14px]">{count}</span>
                  <button
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    onClick={decrement}
                  >
                    -
                  </button>
                  
                  
                </div>       
              </li>
              <li className="flex items-center justify-between flex-wrap">
              <p className="mb-0">Child Seat(s)</p>
                      <div className="flex items-center gap-8">
                        <button
                          className={`px-2 py-1 rounded-md ${hasChildSeats ? 'bg-green-100 ' : 'bg-gray-100 '} hover:bg-green-300`}
                          onClick={() => setHasChildSeats(true)}
                        >
                          <i className="las la-check text-lg text-green-600"></i>
                        </button>
                        <button
                          className={`px-2 py-1 rounded-md ${!hasChildSeats ? 'bg-orange-100' : 'bg-gray-100'} hover:bg-orange-300`}
                          onClick={() => {
                            setHasChildSeats(false);
                            setChildSeats(0);
                          }}
                        >
                          <i className="las la-times text-lg text-red-500"></i>
                        </button>
                      </div>
                      </li>
                      {hasChildSeats && (
                        
                        <li className="flex items-center justify-between flex-wrap">
                        <input
                          type="number"
                          className="w-16 p-1 border rounded-md"
                          value={childSeats}
                          onChange={handleChildSeatChange}
                          min={0}
                          max={maxSeats - count - handicapSeats}
                        />
                      
                      <p className="mb-0 font-medium">{childSeatsTotal} FCFA</p>
                      </li>
                      )}
                    
                    
                  <li className="flex items-center justify-between flex-wrap">
                  <p className="mb-0">Handicap Seat(s)</p>
                  <div className="flex items-center gap-8">
                    <button
                      className={`px-2 py-1 rounded-md ${hasHandicapSeats ? 'bg-green-100 ' : 'bg-gray-100 '} hover:bg-green-300`}
                      onClick={() => setHasHandicapSeats(true)}
                    >
                      <i className="las la-check text-lg text-green-600"></i>
                    </button>
                    <button
                      className={`px-2 py-1 rounded-md ${!hasHandicapSeats ? 'bg-orange-100' : 'bg-gray-100'} hover:bg-orange-300`}
                      onClick={() => {
                        setHasHandicapSeats(false);
                        setHandicapSeats(0);
                      }}
                    >
                      <i className="las la-times text-lg text-red-500"></i>
                    </button>
                  </div>
                </li>
                {hasHandicapSeats && (
                  <li className="flex items-center justify-between flex-wrap">
                    <input
                      type="number"
                      className="w-16 p-1 border rounded-md"
                      value={handicapSeats}
                      onChange={handleHandicapSeatChange}
                      min={0}
                      max={maxSeats - count - childSeats}
                    />
                    <p className="mb-0 font-medium">{handicapSeatsTotal} FCFA</p>
                  </li>
                )}
                <li className="flex items-center justify-between flex-wrap">
                  <p className="mb-0">Tax</p>
                  <p className="mb-0 font-medium">0%</p>
                </li>
                <li className="flex items-center justify-between flex-wrap">
                  <p className="mb-0">Total price</p>
                  <p className="mb-0 font-medium">{totalPrice} FCFA</p>
                </li>
              </ul>
              <div className="border border-dashed my-8"></div>
              <div className="flex items-center justify-between flex-wrap mb-6">
                <p className="mb-0">Payable Now</p>
                <p className="mb-0 font-medium">{price * count + additionalSeatsTotal} FCFA</p>
              </div>
            </div>
            <Link
              href={
                (() => {
                  const data = { 
                    id, 
                    img, 
                    price, 
                    title, 
                    driverName, 
                    pass,
                    childSeats,
                    handicapSeats, 
                    bag, 
                    maxDistance, 
                    fuelType, 
                    boxType, 
                    star, 
                    departureCity, 
                    arrivalCity, 
                    departureDay, 
                    arrivalDay, 
                    departureHour, 
                    arrivalHour, 
                    travelClass,
                    totalPrice,
                    count //Nombre de places choisies
                  };
                  const queryString = new URLSearchParams(
                    Object.entries(data).map(([key, value]) => [key, String(value)])
                  ).toString();
                  return `reservationHilary3?${queryString}`;
                })()
              }
              className="link inline-flex items-center gap-2 lg:mt-8 py-3 px-6 rounded-md bg-primary text-white hover:bg-blue-700 font-semibold w-full text-xl justify-center "> 
              <span className="inline-block"> Proceed Booking </span>
            </Link>                
          </div>
        </div>
      </div>
    </div>
</>
);
};
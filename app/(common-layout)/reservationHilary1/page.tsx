"use client"
import { carlistings } from "@/public/data/carlisting";
import { SearchIcon } from "@/public/data/icons";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type RadioOptionCategory = "allCategory" | "Economic" | "Classic" | "VIP";
type RadioOptionCity = "allCity" | "Bafoussam" | "Bamenda" | "Bertoua" | "Buea" | "Douala" | "Ebolowa" | "Garoua" | "Kribi" | "Limbe" | "Maroua" | "Ngaoundere" | "Yaounde";


const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [optionCategory, setOptionCategory] = useState<RadioOptionCategory>("allCategory");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [optionDepartureCity, setOptionDepartureCity] = useState<RadioOptionCity>("allCity");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [optionArrivalCity, setOptionArrivalCity] = useState<RadioOptionCity>("allCity");

  const handleOptionCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOptionCategory(event.target.value as RadioOptionCategory);
  };

  const handleOptionDepartureCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOptionDepartureCity(event.target.value as RadioOptionCity);
  };

  const handleOptionArrivalCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOptionArrivalCity(event.target.value as RadioOptionCity);
  };

  const resetFilters = () => {
    setOptionCategory("allCategory");
    setOptionDepartureCity("allCity");
    setOptionArrivalCity("allCity");
  };

  const filteredCarListings = carlistings.filter((car) => {
    const matchesCategory = optionCategory === "allCategory" || car.travelClass === optionCategory;
    const matchesDepartureCity = optionDepartureCity === "allCity" || car.departureCity === optionDepartureCity;
    const matchesArrivalCity = optionArrivalCity === "allCity" || car.arrivalCity === optionArrivalCity;
    return matchesCategory && matchesDepartureCity && matchesArrivalCity;
  });

  const numberOfListings = filteredCarListings.length;

  return (
    <>
      <div className="py-[30px] lg:py-[60px] bg-[var(--bg-2)] px-3">
        <div className="container">
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            <div className="col-span-12 lg:col-span-4 order-2 lg:order-1">
              <div className="p-4 lg:py-6 lg:px-20 bg-white rounded-2xl shadow-lg xl:fixed">
                <h4 className="mb-0 text-2xl font-semibold">Filter</h4>
                <div className="border-t border-dashed my-6"></div>
                <p className="mb-4 text-gray-600 text-xl font-bold">{/* Category */}</p>
                <select
                  className="w-full py-2 px-3 border border-gray-300 rounded-md text-xl font-normal"
                  value={optionCategory}
                  onChange={handleOptionCategoryChange}
                >
                  <option value="allCategory">Category</option>
                  <option value="Economic">Economic</option>
                  <option value="Classic">Classic</option>
                  <option value="VIP">VIP</option>
                </select>

                <div className="border-t border-dashed my-6"></div>
                <p className="mb-4 text-[var(--neutral-700)] text-gray-600 text-xl font-semibold">{/* Departure City */}</p>
                <select
                  className="w-full py-2 px-3 border border-gray-300 rounded-md text-xl font-normal"
                  value={optionDepartureCity}
                  onChange={handleOptionDepartureCityChange}
                >
                  <option value="allCity">Departure City</option>
                  <option value="Bafoussam">Bafoussam</option>
                  <option value="Bamenda">Bamenda</option>
                  <option value="Bertoua">Bertoua</option>
                  <option value="Buea">Buea</option>
                  <option value="Douala">Douala</option>
                  <option value="Ebolowa">Ebolowa</option>
                  <option value="Garoua">Garoua</option>
                  <option value="Kribi">Kribi</option>
                  <option value="Limbe">Limbe</option>
                  <option value="Maroua">Maroua</option>
                  <option value="Ngaoundere">Ngaoundere</option>
                  <option value="Yaounde">Yaounde</option>
                </select>

                <div className="border-t border-dashed my-6"></div>
                <p className="mb-4 text-[var(--neutral-700)] text-gray-600 text-xl font-semibold">{/* Arrival City */}</p>
                <select
                  className="w-full py-2 px-3 border border-gray-300 rounded-md text-xl font-normal"
                  value={optionArrivalCity}
                  onChange={handleOptionArrivalCityChange}
                >
                  <option value="allCity">Arrival City</option>
                  <option value="Bafoussam">Bafoussam</option>
                  <option value="Bamenda">Bamenda</option>
                  <option value="Bertoua">Bertoua</option>
                  <option value="Buea">Buea</option>
                  <option value="Douala">Douala</option>
                  <option value="Ebolowa">Ebolowa</option>
                  <option value="Garoua">Garoua</option>
                  <option value="Kribi">Kribi</option>
                  <option value="Limbe">Limbe</option>
                  <option value="Maroua">Maroua</option>
                  <option value="Ngaoundere">Ngaoundere</option>
                  <option value="Yaounde">Yaounde</option>
                </select>

                
                <div className="border-t border-dashed my-6"></div>
                <button
                  className="outline w-full py-2 px-4 text-primary hover:bg-primary hover:text-white  font-semibold rounded-md"
                  onClick={resetFilters}
                >
                  Reset Filter
                </button>

                </div>
              </div>


              <div className="col-span-12 lg:col-span-8 order-1 lg:order-2">
                <div className="grid grid-cols-12 gap-4 lg:gap-6">
                  <div className="col-span-12">
                    <div className="bg-white rounded-lg py-2 px-6 shadow-lg">
                      <ul className="flex justify-between items-center flex-wrap gap-3 ">
                        <li className="">
                          <p className="mb-0 clr-neutral-100 text-lg font-medium">
                            Voyages disponibles
                          </p>
                        </li>
                        <li className="flex items-center font-medium text-xl text-primary">
                          {numberOfListings}
                        </li>

                        {/* <li className="hidden lg:flex items-center">
                          <p className="mb-0 clr-neutral-500 flex-grow whitespace-nowrap">
                            Sort By :
                          </p>
                          <select className="w-full bg-transparent px-5 py-2 focus:outline-none border-0">
                            <option>latest</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </li> */}
                      </ul>
                    </div>
                  </div>


                  {filteredCarListings.map(({  id, img, price, title, driverPicture, driverName, driverNumber, driverLocation, driverMail, pass, bag, maxDistance, fuelType, boxType, star, departureCity, arrivalCity, departureDay, arrivalDay, departureHour, arrivalHour, travelClass  }) => (
          <div key={id} className="col-span-12">
            <div className="flex flex-col md:flex-row rounded-2xl p-2 bg-white">
              <div className="bg-[#F5F6FF] rounded-xl shrink">
                <Image
                  width={200}
                  height={260}
                  src={img}
                  alt={title}
                  className="rounded-2xl w-full h-auto"
                />
              </div>
              <div className="p-3 overflow-hidden flex-grow">
                <div className="property-card__body">
                  <div className="grid grid-cols-12 gap-4 lg:gap-6 justify-between">
                    <div className="col-span-12 xl:col-span-8">
                      <div className="flex gap-8 xl:gap-16 mb-2">
                        <p
                          className="pl-0 lg:pl-2 text-[var(--neutral-700)] text-xl font-semibold">
                          {driverName}
                        </p>
                        <div className="pl-0 lg:pl-6 flex items-center shrink-0">
                          <StarIcon className="w-5 h-5 text-[var(--tertiary)]" />
                          <span className="block text-[var(--neutral-700)] pr-12">
                          {star}
                          </span>
                          <span className="block text-[var(--neutral-700)] font-semibold">
                          {travelClass}
                          </span>
                        </div>
                        
                      </div>
                      <ul className="columns-1 lg:columns-2 flex-wrap gap-3 md:ps-2 font-medium ">
                        <li className="py-2">From: <span className="font-semibold">{departureCity}</span> </li>
                        <li className="py-2">{departureDay} </li>
                        <li className="py-2">{departureHour}</li>
                        <li className="py-2">To: <span className="font-semibold">{arrivalCity}</span></li>
                        <li className="py-2">{arrivalDay} </li>
                        <li className="py-2">{arrivalHour}</li>
                      </ul>
                    </div>
                    <div className="col-span-12 xl:col-span-4 xl:text-end">
                      <span className="block mb-4">
                      <span className="text-gray-700 font-semibold text-xl">
                          {price} FCFA
                        </span>{" "}        
                      </span>

                      <span className="block mb-8">
                        <span className="text-gray-700 font-medium text-xl">                     
                        </span>{" "}
                        <span className="text-gray-400"></span>
                      </span>

                      <Link
                          href={
                            (() => {
                              const data = { 
                                id, 
                                img, 
                                price, 
                                title, 
                                driverPicture,
                                driverName,
                                driverLocation,
                                driverNumber,
                                driverMail, 
                                pass, 
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
                                travelClass
                              };
                              const queryString = new URLSearchParams(
                                Object.entries(data).map(([key, value]) => [key, String(value)])
                              ).toString();
                              return `reservationHilary2?${queryString}`;
                            })()
                        }
                        className="btn-primary hover:bg-blue-700 hover:text-white rounded-md font-semibold">
                        Book Now
                      </Link>

                    </div>
                  </div>
                  <ul className="flex divide-x divide-dashed mt-8 bg-[#F5FCF8] overflow-x-auto">
                    <li className="p-6 m-0 text-center flex-grow">
                      <i className="las text-[#279155] la-user-friends text-[32px] inline-block mb-1"></i>
                      <span className="block text-sm max-width mx-auto">
                      {pass} pass
                      </span>
                    </li>
                    <li className="p-6 m-0 text-center flex-grow">
                      <i className="las text-[#279155] la-shopping-bag text-[32px] inline-block mb-1"></i>
                      <span className="block text-sm max-width mx-auto">
                        {" "}
                        {bag} bags{" "}
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
          </div>
        ))}

                </div>
              </div>
            </div>
          </div>
        </div>

      {/* <CardPagination /> */}
    
    
    
    </>

  );
};

export default page;

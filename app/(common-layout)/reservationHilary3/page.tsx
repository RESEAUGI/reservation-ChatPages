"use client"
import { Tab } from "@headlessui/react";
import Image from "next/image";
import {redirect} from "next/navigation";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import axios from 'axios';

import Link from "next/link";

  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
  }

//TODO: remplacer par des variables globales à importer
let RESERVATION_SERVICE_URL = "http://192.168.3.166:8080"
let ENDPOINTS = {
  createReservation: "/api/create-reservation",
}


//En dessous ca marche
 
const PayementStripeForm=()=> {
  const router = useRouter();
  const searchParams = useSearchParams()
  const {id, img, price, title, driverName, pass, childSeats, handicapSeats, bag, maxDistance, fuelType, boxType, star, departureCity, arrivalCity, departureDay, arrivalDay, departureHour, arrivalHour, travelClass, totalPrice, count}
  = Object.fromEntries(searchParams);

  async function createInvoice(formData: FormData) {
    let url: string =''
    const rawFormData = {
      reservationId: formData.get('reservationId'),
      price: formData.get('price'),
      description: formData.get('description'),
    };

    console.log(rawFormData);
    console.log("================================")
      // ENREGISTREMENT DE LA RESERVATION EN BD : SERVICE DE RESERVATION
      let reservationDto = {
        "userId": "550e8400-e29b-41d4-a716-446655440000", // TODO: remplacer par l'ID de l'utilisateur courant
        "driverId": "123e4567-e89b-12d3-a456-426614174000", // TODO: remplacer par l'ID du chauffeur (recuperable à partir de l'ID du planing)
        "planningId": id,
      }
      axios.post(RESERVATION_SERVICE_URL+ENDPOINTS.createReservation, reservationDto)
      .then(response =>{
        console.log(response)
        alert(response.data)
      }).catch(error => {
        console.log(error)
        alert(error)
      })

    try {
      const response = await fetch('http://localhost:8080/api/links_pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rawFormData),
      });

      // Handle response if necessary
      const data = await response.json()
      console.log(data)
      if(data.status == 'success'){
        url = data.payment_url;
        console.log(url)

        
      } 
      // ...
    } catch (error) {
      // Handle error if necessary
      console.error(error)
    }
    //TODO: commenter la ligne if(url !== "")redirect(url) pour tester le service de reservation
    if(url !== "")redirect(url)
  }


    return (
        <form action='#' onSubmit={e => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          createInvoice(formData);
        }} >            
            <div hidden>
              <label
                  htmlFor="reservationId"
                  className="text-xl font-medium block mx-2">
                  Reservation Id
                  </label>
                  <input
                  type="text"
                  className="w-full bg-[var(--bg-1)] border border-neutral-40 rounded-md py-3 px-5 focus:outline-none"
                  placeholder=""
                  id="reservationId"
                  name="reservationId"
                  value={id}
                  
                      />
            </div>

            <div >
              <label
                  htmlFor="price"
                  className="text-xl font-medium block mx-2">
                  Transaction Amount
                  </label>
                  <input
                  type="numeric"
                  className="w-full bg-[var(--bg-1)] border border-neutral-40 rounded-md py-3 px-5 focus:outline-none"
                  placeholder=""
                  id="price"
                  name="price"
                  value={totalPrice}
                  readOnly 
                      />
            </div>

            <div>
                <label
                    htmlFor="transaction_currency"
                    className="text-xl font-medium block mb-0">
                    Transaction Currency
                    </label>
                    <input
                    type="numeric"
                    className="w-full bg-[var(--bg-1)] border border-neutral-40 rounded-md py-3 px-5 focus:outline-none"
                    value="XAF"
                        />
            </div>

            <div >
              <label
                  htmlFor="descriptionr"
                  className="text-xl font-medium block mx-2">
                  Transaction Reason
                  </label>
                  <textarea
                      className="w-full h-40 bg-[var(--bg-1)] font-medium text-l g border border-neutral-40 rounded-md py-3 px-4 focus:outline-none"
                      id="description"
                      name="description"
                      value={`Reservation of ${count} normal seat(s), ${childSeats} child seat(s) and ${handicapSeats} handicap seat(s) for the trip on ${departureDay} from ${departureCity} at ${departureHour} to ${arrivalCity}. Driver:  : ${driverName}`}
                      readOnly 
                    />
            </div>

                <button type="submit" className=" inline-flex items-center gap-2 mt-6 lg:mt-8 py-3 px-6 rounded-md bg-primary text-white hover:bg-blue-700 font-semibold text-xl w-full justify-center mb-6 ">
                    Complete payement
                </button>
        </form>            
      )

}
 


const PayementCoolPayForm =()=> {

  const searchParams = useSearchParams()
  const {id, img, price, title, driverName, pass, childSeats, handicapSeats, bag, maxDistance, fuelType, boxType, star, departureCity, arrivalCity, departureDay, arrivalDay, departureHour, arrivalHour, travelClass, totalPrice, count}
  = Object.fromEntries(searchParams);


    async function createInvoice(formData: FormData) {
      /* 'use server' */
      let url: string = ''
      const rawFormData = {
        transaction_amount: formData.get('transaction_amount'),
        transaction_currency: formData.get('transaction_currency'),
        transaction_reason: formData.get('transaction_reason'),
        customer_phone_number: formData.get('customer_phone_number'),
        customer_name: formData.get('customer_name'),
        customer_email: formData.get('customer_email'),
        customer_lang: formData.get('customer_lang:'),
      }
  
      
      console.log(rawFormData)
      console.log("================================")
      // ENREGISTREMENT DE LA RESERVATION EN BD : SERVICE DE RESERVATION
      let reservationDto = {
        "userId": "550e8400-e29b-41d4-a716-446655440000", // TODO: remplacer par l'ID de l'utilisateur courant
        "driverId": "123e4567-e89b-12d3-a456-426614174000", // TODO: remplacer par l'ID du chauffeur (recuperable à partir de l'ID du planing)
        "planningId": id,
      }
      axios.post(RESERVATION_SERVICE_URL+ENDPOINTS.createReservation, reservationDto)
      .then(response =>{
        console.log(response)
        alert(response.data)
      }).catch(error => {
        console.log(error)
        alert(error)
      })
   
      try {
        const response = await fetch('https://my-coolpay.com/api/5a219fd9-b249-4a58-b362-1448584ffb42/paylink', {
          method: 'POST',
          body: JSON.stringify(rawFormData),
        })
   
        // Handle response if necessary
        const data = await response.json()
        console.log(data)
        if(data.status == 'success'){
          url = data.payment_url;
          console.log(url)

          
        } 
        // ...
      } catch (error) {
        // Handle error if necessary
        console.error(error)
      }
      //TODO: commenter la ligne if(url !== "")redirect(url) pour tester le service de reservation
      if(url !== "")redirect(url)
    }
  

    return (
        <form action={createInvoice} >
            <div>
                <label
                    htmlFor="transaction_amount"
                    className="text-xl font-medium block mb-0">
                    Transaction Amount 
                    </label>
                    <input
                    type="numeric"
                    className="w-full bg-[var(--bg-1)] border border-neutral-40 rounded-md py-3 px-5 focus:outline-none"
                    id="transaction_amount"
                    name="transaction_amount"
                    value={totalPrice}
                        />
            </div>

            <div>
                <label
                    htmlFor="transaction_currency"
                    className="text-xl font-medium block mb-0">
                    Transaction Currency
                    </label>
                    <input
                    type="numeric"
                    className="w-full bg-[var(--bg-1)] border border-neutral-40 rounded-md py-3 px-5 focus:outline-none"
                    id="transaction_currency"
                    name="transaction_amount"
                    value="XAF"
                        />
            </div>

            <div>
                <label
                    htmlFor="transaction_reason"
                    className="text-xl font-medium block mb-0">
                    Transaction Reason
                    </label>
                    <textarea
                      className="w-full h-40 bg-[var(--bg-1)] font-medium text-lg border border-neutral-40 rounded-md py-3 px-4 focus:outline-none"
                      id="transaction_reason"
                      name="transaction_reason"
                      value={`Reservation of ${count} normal seat(s), ${childSeats} child seat(s) and ${handicapSeats} handicap seat(s) for the trip on ${departureDay} from ${departureCity} at ${departureHour} to ${arrivalCity}. Driver:  : ${driverName}`}
                      readOnly // Facultatif : si le champ est en lecture seule
                    />
            </div>

            <div>
                <label
                    htmlFor="customer_phone_number"
                    className="text-xl font-medium block mb-2">
                    Phone Number
                    </label>
                    <input
                    type="text"
                    className="w-full bg-[var(--bg-1)] border border-neutral-40 rounded-md py-3 px-5 focus:outline-none"
                    id="customer_phone_number"
                    name="customer_phone_number"
                        />
            </div>

            <div>
                <label
                    htmlFor="customer_name"
                    className="text-xl font-medium block mb-0">
                    Name
                    </label>
                    <input
                    type="text"
                    className="w-full bg-[var(--bg-1)] border border-neutral-40 rounded-md py-3 px-5 focus:outline-none"
                    id="customer_name"
                    name="customer_name"
                        />
            </div>

            <div>
                <label
                    htmlFor="customer_email"
                    className="text-xl font-medium block mb-0"
                    >
                    Email
                    </label>
                    <input
                    type="text"
                    className="w-full bg-[var(--bg-1)] border border-neutral-40 rounded-md py-3 px-5 focus:outline-none"
                    id="customer_email"
                    name="customer_email"
                        />
            </div>

            <div>
                <label
                    htmlFor="customer_lang"
                    className="text-xl font-medium block mb-0">
                    Language
                    </label>
                    <select
                    className="w-full bg-[var(--bg-1)] border border-neutral-40 rounded-md py-3 px-5 focus:outline-none"
                    id="customer_lang"
                    name="customer_lang"
                    >
                    <option value="fr">FR</option>
                    <option value="en">EN</option>
                  </select>

            </div>
            <button type="submit" className=" inline-flex items-center gap-2 mt-6 lg:mt-8 py-3 px-6 rounded-md bg-primary text-white hover:bg-blue-700 font-semibold text-xl w-full justify-center mb-6 ">
                Complete payement
            </button>
        </form>            
      )
    
    }



const Page = () => {



  return (
    <main>
      <div className="py-[10px] lg:py-[40px] bg-[var(--bg-2)] overflow-hidden px-3">
        <div className="container flex items-center justify-center ">

        <div className="bg-white p-4 col-span-8 xl:col-span-2 w-[420px] xl:w-[50%] md:w-[60%]">
            <div className="section-space--sm relative">  

              <div>
                <p className=" mb-8 text-2xl font-bold flex justify-center"> Payement Methods </p>
                
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
                      width={174}
                      height={62}
                      src="/img/CardLogo.png"
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
                      width={183}
                      height={61}
                      src="/img/PaypalLogo.png"
                      alt="image"
                      className=""
                    />
                    </Tab>{" "}
                   
                    <Tab
                      className={({ selected }) =>
                          classNames(
                            "focus:outline-none transition-transform transform hover:scale-105",
                            selected ? "font-medium border-2 border-primary rounded-md" : ""
                          )
                      }>
                      
                      <Image
                      width={250}
                      height={64}
                      src="/img/MomoLogo.png"
                      alt="image"
                      className=""
                    />
                    </Tab>{" "}
                   
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          "focus:outline-none transition-transform transform hover:scale-105",
                          selected ? "font-medium border-2 border-primary rounded-md" : ""
                        )
                      }>

                      <Image
                      width={274}
                      height={64}
                      src="/img/OMLogo.png"
                      alt="image"
                      className=""
                    />

                    </Tab> 
                  </Tab.List>
                  <Tab.Panels className="tab-content">
                    <Tab.Panel>
                        <div className="flex flex-col gap-4">
                            <PayementStripeForm/>
                        </div>

                    </Tab.Panel>

                    <Tab.Panel>
                        <div className="flex flex-col gap-4">
                            <PayementStripeForm/>
                        </div>
                    </Tab.Panel>

                    <Tab.Panel>
                        <div className="flex flex-col gap-5">
                            <PayementCoolPayForm/>
                        </div>
                    </Tab.Panel>

                    <Tab.Panel>
                    <div className="flex flex-col gap-5">
                        <PayementCoolPayForm/>
                    </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>

              </div>
            </div>   
          </div>
        </div>
      </div>   
    </main>
  );
};

export default Page;

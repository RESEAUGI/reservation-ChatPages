
import {redirect} from "next/navigation"

import Link from "next/link";
import { useState } from "react";


interface PayementStripeFormProps{
    onSubmitStripe:(payement:PayementStripeData) => void;
}

interface PayementStripeData{
    reservationId:string;
    price:string;
    description:string;

}


  
  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
  }



const PayementStripeForm: React.FC<PayementStripeFormProps>=({onSubmitStripe})=> {
    const [reservationId, setReservationId]=useState('');
    const [price, setPrice]=useState('');
    const [description, setDescription]=useState('');

    const handleSubmitStripe= (e:React.FormEvent) => {
        e.preventDefault();
        const payementData: PayementStripeData={reservationId, price, description};
        onSubmitStripe(payementData);
        //Effacer les donnees
        setReservationId('');
        setPrice('');
        setDescription('');
    }

    async function createInvoice(formData: FormData) {
      'use server'
      let url: string = ''
      const rawFormData = {
        reservationId: formData.get('reservationId'),
        price: formData.get('price'),
        Description: formData.get('description'),
      }
  
      
      console.log(rawFormData)
   
      try {
        const response = await fetch('http://localhost:8080/api/links_pay', {
          method: 'POST',
          body: JSON.stringify(rawFormData),
      
        });
    
        // Gérer la réponse si nécessaire
        const data = await response.json();
        console.log(data);
        url = data.url;
        console.log(url);
      } catch (error) {
        // Gérer l'erreur si nécessaire
        console.error(error);
      }
      if (url !== '') redirect(url);
    }
  


    return (
        <form action={createInvoice} onSubmit={handleSubmitStripe} >            
            <div>
              <label
                  htmlFor="review-phoneNumber"
                  className="text-xl font-medium block mx-2">
                  Reservation Id
                  </label>
                  <input
                  type="text"
                  className="w-full bg-[var(--bg-1)] border border-neutral-40 rounded-md py-3 px-5 focus:outline-none"
                  placeholder=""
                  id="reservationId"
                  name="reservationId"
                      />
            </div>

            <div >
              <label
                  htmlFor="review-phoneNumber"
                  className="text-xl font-medium block mx-2">
                  Montant
                  </label>
                  <input
                  type="text"
                  className="w-full bg-[var(--bg-1)] border border-neutral-40 rounded-md py-3 px-5 focus:outline-none"
                  placeholder=""
                  id="price"
                  name="price"
                      />
            </div>

            <div >
              <label
                  htmlFor="review-phoneNumber"
                  className="text-xl font-medium block mx-2">
                  Description
                  </label>
                  <input
                  type="text"
                  className="w-full bg-[var(--bg-1)] border border-neutral-40 rounded-md py-3 px-5 focus:outline-none"
                  placeholder=""
                  id="description"
                  name="description"
                      />
            </div>

                <button type="submit" className=" inline-flex items-center gap-2 mt-6 lg:mt-8 py-3 px-6 rounded-md bg-primary text-white hover:bg-blue-700 font-semibold text-xl w-full justify-center mb-6 ">
                    Complete payement
                </button>
        </form>            
      )

}

export default PayementStripeForm
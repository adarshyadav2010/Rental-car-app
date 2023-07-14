import React, { createContext, useEffect, useState } from "react"



export const StateContextsData = createContext();


export default function StateContexts({ children }) {

    const [car, setCar] = useState([])
    const [edit, setEdit] = useState({});

    const [headerData, setheaderData] = useState({});
    const [CarData, setCarData] = useState({});
    const [bookingDetails, setBookingDetails] = useState([]);
    const [Bookdata, setBookData] = useState([])
    const [traveldata, setTravelData] = useState({
        origin: "",
        destination: "",
        startDate: "",
        endDate: "",
        distance: "",
        MapImg: ""
    });

    const [data, setData] = useState({
        name: "",
        type: "",
        model: "",
        milage: "",
        image: "",
        availableFrom: "",
        availableTill: "",
        perKm: "",
        description: "",
        carDetails: "",
        Details: "",
    });

    const [EditPaymentDetails , setEditPaymentDetails] = useState({})


    return <>

        <StateContextsData.Provider value={{car, setCar,data,setData,edit,setEdit,headerData,setheaderData, CarData, setCarData, bookingDetails, setBookingDetails,Bookdata,setBookData,EditPaymentDetails , setEditPaymentDetails,traveldata,setTravelData}}>
            {children}
        </StateContextsData.Provider>
    </>
}
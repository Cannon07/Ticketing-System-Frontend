"use client";
import locationData from "../../data/places.json";
import { useEffect, useState } from 'react';
import { useGlobalContext } from "@/app/context/globalContext";

interface LocationResultProps {
  searchString: string;
  handleLength: any

}
const LocationResult = ({
  searchString, handleLength

}: LocationResultProps) => {


  const [selectedCity, setSelectedCity] = useState('');
  const {setSelectCity} = useGlobalContext();


  const locationModal = document.getElementById("locationModal");
  useEffect(() => {

    if (selectedCity !== '') {
      locationModal!.classList.remove("show");
      setSelectedCity('');
    }

  })

  const allCities = locationData.indianCities

  var popular_cities: any[] = [];

  allCities.map((city) => {
    if (city.popular) {
      popular_cities.push(city)
    }
  })
  var other_cities: any[] = [];

  allCities.map((city) => {
    if (!city.popular) {
      other_cities.push(city)
    }
  })


  function searchCities() {
    const searchResult = allCities.filter(city => city.name.toLowerCase().includes(searchString.toLowerCase()));
    return searchResult;
  }

  handleLength(searchCities().length);


  const handleSelectCity = (city: string) => {
    setSelectedCity(city);
    setSelectCity(city); 
    localStorage.setItem('city',city);
  }



  return (
    <div className="search-wrapper-body flex gap-4 text-center justify-center">

      {
        searchString ? <div>
          {
            (searchCities().length !== 0) ? searchCities().map(city => (
              <button className="p-2 hover:font-semibold" onClick={() => handleSelectCity(city.name)} key={city.id}>
                {city.name}
              </button>
            )) : <p className="mt-4">
              No results for &quot;<strong>{searchString}</strong>&quot;
            </p>
          }
        </div> :

          <div>
            <h3>Popular Cities</h3>

            {popular_cities.map(city => (
              <button className="p-2 hover:font-semibold" key={city.id} onClick={() => handleSelectCity(city.name)}>{city.name}</button>
            ))}

            <h3>Other Cities</h3>

            {other_cities.map(city => (
              <button className="p-2 hover:font-semibold" key={city.id} onClick={() => handleSelectCity(city.name)}>{city.name}</button>
            ))}

          </div>
      }
    </div>
  );
};



export default LocationResult;

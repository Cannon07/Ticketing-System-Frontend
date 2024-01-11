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
  const [showAllCities, setShowAllCities] = useState(false);
  const { setSelectCity } = useGlobalContext();


  const locationModal = document.getElementById("locationModal");
  useEffect(() => {
      if (selectedCity !== '') {
        locationModal!.classList.remove("show");
        setShowAllCities(false)
        setSelectedCity('');
      }
  })


  const allCities = locationData.indianCities

  var popular_cities: any[] = [];

  allCities.map((city) => {
    if (city.popular == true) {
      popular_cities.push(city)
    }
  })

  var other_cities: any[] = [];
  var top6: any[] = [];
  let cnt = 0;

  allCities.map((city) => {
    if (city.popular === false) {
      other_cities.push(city)
    }
    if (cnt !== 6 && city.popular === false) {
      top6.push(city)
      cnt++;
    }
  })


  const toggleShowAllCities = () => {
    setShowAllCities(!showAllCities);
  };

  function searchCities() {
    const searchResult = allCities.filter(city => city.name.toLowerCase().includes(searchString.toLowerCase()));
    return searchResult;
  }

  handleLength(searchCities().length);

  const handleSelectCity = (city: string) => {
    setSelectedCity(city);
    setSelectCity(city);
    localStorage.setItem('city', city);
  }


  return (
    <div className="search-wrapper-body flex gap-4 text-center justify-center">

      {
        searchString !== "" ? <div>
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
            <div>
              <h3>Popular Cities</h3>

              {popular_cities.map(city => (
                <button className="p-2 hover:font-semibold text-lg" key={city.id} onClick={() => handleSelectCity(city.name)}>{city.name}</button>
              ))}

              <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-900"/>


                <h4>Other Cities</h4>

                {showAllCities ?

                  other_cities.map(city => (
                    <button className="p-2 hover:font-semibold" key={city.id} onClick={() => handleSelectCity(city.name)}>{city.name}</button>
                  )) :

                  top6.map(city => (
                    <button className="p-2 hover:font-semibold" key={city.id} onClick={() => handleSelectCity(city.name)}>{city.name}</button>
                  ))
                }

            </div>
            <button className="font-semibold" onClick={toggleShowAllCities}>{showAllCities ? 'Hide All Cities' : 'View All Cities'}</button>
          </div>

      }
    </div>
  );
};



export default LocationResult;

"use client";
import locationData from '.json/places.json'
import { useState } from 'react';


const LocationResult = ({
  searchString,
}: {
  searchString: string;
}) => {


  const [selectedCity,setSelectedCity] = useState('');


  const allCities = locationData.countries
    .flatMap((country) => [...(country.states || []).flatMap((state) => state.cities || [])])
    .filter(Boolean);

  function searchCities() {
    const searchResult = allCities.filter(city => city.toLowerCase().includes(searchString.toLowerCase()));
    return searchResult;
  }

  console.log(searchCities());



  return (
    <div className="search-wrapper-body flex gap-4 text-center justify-center">

      {
        searchString ? <div>
      
              {
                (searchCities().length !== 0) ? searchCities().map(city => (
                  <div key={city}>
                 {city}
                  </div>
                )) : 'No cities found'
              }
        </div> :

          locationData.countries.map(country => (
            <div key={country.name}>
              <div className="text-lg underline font-bold">{country.name}</div>
              <div className="font-semibold">popular cities</div>
              <div>{country.popular_cities.map(popular_city => (
                <div key={popular_city}>
                  <p className="text-sm">{popular_city}</p>
                </div>
              ))}</div>

              <div>{country?.states?.map(state => (
                <div key={state.name}>
                  <p className="font-semibold">{state.name}</p>
                  <p className="text-sm">{state.cities?.map(city => (
                    <div key={city}>
                      {city}
                    </div>
                  ))}
                  </p>
                </div>
              ))}
              </div>
            </div>
          ))
      }
    </div>
  );
};



export default LocationResult;

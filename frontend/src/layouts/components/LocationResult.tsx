"use client";
import locationData from '.json/places.json'


const LocationResult = ({
  searchString,
}: {
  searchString: string;
}) => {


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
                  <div>
                 { city}
                  </div>
                )) : 'No cities found'
              }
        </div> :

          locationData.countries.map(country => (
            <div>
              <div className="text-lg underline font-bold">{country.name}</div>
              <div className="font-semibold">popular cities</div>
              <div>{country.popular_cities.map(popular_city => (
                <div>
                  <p className="text-sm">{popular_city}</p>
                </div>
              ))}</div>

              <div>{country?.states?.map(state => (
                <div>
                  <p className="font-semibold">{state.name}</p>
                  <p className="text-sm">{state.cities?.map(city => (
                    <div>
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

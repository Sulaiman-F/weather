import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { iconMapDay, iconMapNight } from "../utils/weatherCode";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { formatDateToWeekday } from "../utils/Date";
import { convertToFahrenheit } from "../utils/convertUint";
import { isDay } from "../utils/currentTime";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { FiWind } from "react-icons/fi";
import { WiCloudyWindy } from "react-icons/wi";
import { FaLocationDot } from "react-icons/fa6";

function Home() {
  const [city, setCity] = useState({});
  const [searchCity, setSearchCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [temperatureUnit, setTemperatureUnit] = useState("C");
  const fetchCity = async (cityName) => {
    try {
      if (cityName === "") {
        toast.error("Please enter a city name", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          duration: 3000,
        });
        return;
      }
      const response = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
      );
      setCity(response.data.results[0]);
      if (response.status === 429) {
        toast.error("Rate limit exceeded", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error("Failed to fetch city data", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        duration: 3000,
      });
    }
  };
  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
      );
      setWeatherData(response.data);
      if (response.status === 429) {
        toast.error("Rate limit exceeded", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error("Failed to fetch weather data", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
          setCity({ name: "Current Location" });
        },
        (error) => {
          toast.error("Failed to get current location", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
            duration: 3000,
          });
        }
      );
    }
  };
  useEffect(() => {
    // console.log("City state updated:", city);
    if (city && city.latitude && city.longitude) {
      fetchWeather(city.latitude, city.longitude);
    }
  }, [city]);

  useEffect(() => {
    // console.log("Weather data:", weatherData);
  }, [weatherData]);

  return (
    <div className="md:min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#1a1b1f] p-4 gap-5">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col items-center w-full lg:w-1/3 bg-gradient-to-tl  from-[#232327] via-[#232327] to-[#26272b] p-5 gap-5 md:gap-10  rounded-2xl shadow-xl lg:h-[94vh] xl:h-full">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search city temperature ..."
          className="px-4 py-2 h-12 bg-[#e6e6e6] rounded-2xl outline-none w-full"
          onChange={(e) => setSearchCity(e.target.value)}
          value={searchCity}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              fetchCity(searchCity.trim());
              setSearchCity("");
            }
          }}
        />
        {weatherData.current ? (
          <div className="flex flex-col items-center gap-5 md:gap-10 w-full h-full">
            <h1 className="text-2xl lg:text-3xl 2xl:text-4xl text-white">
              {city.name}
            </h1>
            <div className="h-25 w-25 md:h-40 md:w-40 2xl:w-50 2xl:h-50">
              {isDay(weatherData.current?.time)
                ? iconMapDay[weatherData.current?.weather_code]
                : iconMapNight[weatherData.current?.weather_code]}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl 2xl:text-8xl font-bold text-white">
              {temperatureUnit === "C"
                ? weatherData.current?.temperature_2m
                : convertToFahrenheit(weatherData.current?.temperature_2m)}
              °{temperatureUnit}
            </h1>
            <h1 className="text-2xl md:text-3xl 2xl:text-4xl text-white border-b-1 pb-5 w-full md:w-4/5 text-center ">
              {formatDateToWeekday(weatherData.daily?.time[0])}
            </h1>
            <div className="flex bg-[#191819] w-full md:w-4/5 justify-center p-4 rounded-2xl gap-5 shadow-md">
              <div className="flex gap-1 items-center text-base 2xl:text-lg">
                <WiCloudyWindy className="text-6xl 2xl:text-7xl text-white" />
                <div className="flex flex-col">
                  <span className="text-white">
                    {weatherData.current?.relative_humidity_2m}%
                  </span>
                  <span className="text-white">Humidity</span>
                </div>
              </div>
              <div className="flex gap-1.5 items-center">
                <FiWind className="text-5xl 2xl:text-6xl text-white" />
                <div className="flex flex-col text-base  2xl:text-lg">
                  <span className="text-white">
                    {weatherData.current?.wind_speed_10m} km/h
                  </span>
                  <span className="text-white">Wind Speed</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-white  w-full min-h-100 flex items-center justify-center text-2xl md:text-3xl">
            No city selected
          </div>
        )}
      </div>
      <div className="flex flex-col items-center w-full lg:w-2/3 bg-gradient-to-tl  from-[#232327] via-[#232327] to-[#26272b] p-5 gap-10  rounded-2xl shadow-xl lg:h-[94vh] xl:h-full">
        <div className=" w-full border-b-1 border-white pb-5 flex items-center justify-between px-2">
          <h2 className="text-2xl md:text-3xl 2xl:text-4xl text-white">
            Weekly Forecast
          </h2>
          <button
            onClick={() =>
              setTemperatureUnit(temperatureUnit === "C" ? "F" : "C")
            }
            className="flex justify-between  items-center bg-[#1d1b1d] rounded-xl w-25 2xl:w-30 cursor-pointer"
          >
            <div
              className={`w-1/2 p-2 rounded-xl text-base md:text-lg lg:text-xl 2xl:text-2xl font-semibold transition-all duration-200  ${
                temperatureUnit === "C" ? "bg-white text-black" : "text-white"
              }`}
            >
              °C
            </div>
            <div
              className={`w-1/2 p-2 rounded-xl text-base md:text-lg lg:text-xl 2xl:text-2xl font-semibold transition-all duration-200  ${
                temperatureUnit === "F" ? "bg-white text-black " : "text-white"
              }`}
            >
              °F
            </div>
          </button>
        </div>
        <div className="flex flex-nowrap md:grid md:grid-cols-3 gap-4 w-full scrollbar-hide overflow-x-scroll md:overflow-hidden h-full md:p-2">
          {(() => {
            const daily = weatherData.daily || {};
            const times = daily.time || [];
            const codes = daily.weather_code || [];
            const mins = daily.temperature_2m_min || [];
            const maxs = daily.temperature_2m_max || [];
            if (loading) {
              return Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex flex-col bg-[#191819] justify-center p-4 rounded-2xl gap-5 shadow-md items-center md:w-full hover:scale-103 transition-all duration-300"
                >
                  <Skeleton width={80} baseColor="gray" />
                  <div className="w-20 h-20 flex justify-center items-center 2xl:w-30 2xl:h-30">
                    <Skeleton
                      circle={true}
                      height={80}
                      width={80}
                      baseColor="gray"
                    />
                  </div>
                  <h1 className="text-white w-fit text-nowrap">
                    <Skeleton width={120} baseColor="gray" />
                  </h1>
                </div>
              ));
            }
            return times.slice(1, 7).map((date, idx) => {
              const i = idx + 1;
              return (
                <div
                  key={date}
                  className="flex flex-col bg-[#191819] justify-center p-4 rounded-2xl gap-2 md:gap-5 shadow-md items-center  md:w-full hover:scale-103 transition-all duration-300 "
                >
                  <span className="text-white text-base md:text-lg 2xl:text-xl">
                    {" "}
                    {formatDateToWeekday(date)}
                  </span>
                  <div className="w-20 h-20 flex justify-center items-center 2xl:w-30 2xl:h-30">
                    {iconMapDay[codes[i]]}
                  </div>
                  <h1 className="text-white w-30 text-center md:w-fit text-nowrap text-base md:text-lg 2xl:text-xl">
                    {temperatureUnit === "C"
                      ? mins[i]
                      : convertToFahrenheit(mins[i])}
                    °{temperatureUnit} /{" "}
                    {temperatureUnit === "C"
                      ? maxs[i]
                      : convertToFahrenheit(maxs[i])}
                    °{temperatureUnit}
                  </h1>
                </div>
              );
            });
          })()}
        </div>
        <div className="flex justify-center items-end h-fit w-full">
          <button
            className="flex justify-center items-center gap-3 bg-[#191819] text-2xl md:text-3xl 2xl:text-4xl text-white py-4 px-5 lg:py-5 lg:px-6 rounded-2xl cursor-pointer hover:scale-103 transition-all duration-300"
            onClick={getCurrentLocation}
          >
            <FaLocationDot className="" />
            Get current location
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;

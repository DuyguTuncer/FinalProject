import { useState } from "react";
const api = {
    key: "0a6d55ac2535e1537e34490c1762a750",
    base: "http://api.openweathermap.org/data/2.5/",
};

//api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}
//api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}
//      fetch(`${api.base}forecast?id=524901&appid=${api.key}`)
// fetch(`${api.base}weather?q={query}&units=metric&APPID=${api.key}`);

export default function Weather() {
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});

    const search = (evt) => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
                .then((res) => res.json())
                .then((result) => {
                    setWeather(result);
                    setQuery("");
                    console.log("weather", result);
                    console.log("query is: ", query);
                });
        }
    };

    const dateBuilder = (d) => {
        let months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    };

    return (
        <div
            className={
                (typeof weather.main != "undefined")
                    ? ((weather.main.temp < 16)
                        ? "weatherContainer warm"
                        : "weatherContainer")
                    : "weatherContainer"
                
            }
        >
            <main className="weatherMain">
                <div className="searchBox">
                    <input
                        type="text"
                        className="searchBar"
                        placeholder="Search..."
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    ></input>
                </div>
                {typeof weather.main != "undefined" ? (
                    <div>
                        <div className="locationBox">
                            <div className="location">
                                {weather.name}, {weather.sys.country}
                            </div>
                            <div className="date">
                                {dateBuilder(new Date())}
                            </div>
                        </div>
                        <div className="weatherBox">
                            <div className="temp">
                                {Math.round(weather.main.temp) - 273}℃
                            </div>
                            <div className="weather">
                                {weather.weather[0].main}
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </main>
        </div>
    );
}

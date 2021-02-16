import React, {useState, useEffect} from "react"
import "./App.css"

import SolCalendar from "./SolCalendar"
import MainSol from "./MainSol"

function App() {
  const [apiData, setApiData] = useState([])

  const [sensorData, setSensorData] = useState([])
  const [objectDisplay, setObjectDisplay] = useState(true)
  const [solKey, setSolKey] = useState(null)
  const [solIndex, setSolIndex] = useState(null)

  //Fetching API data first time when the webpage is running
  useEffect(() => {
      fetch("https://api.nasa.gov/insight_weather/?api_key=ENTER_YOUR_API_KEY_HERE&feedtype=json&ver=1.0")
      .then(response => response.json())
      .then(response => {
        setApiData(response)
      })
  }, [])

  //When the data is retrieved from the api, and put in the apiData state, the data gets mapped into a new array to create a managable dataset to use in the interface.
  //The datastructure isn't always the same, sometimes certain chunks of data from mars doesn't return. To prevent the application from crashing, the data gets checked if it exists. If it doesn't,
  //it will return a string with "No data".
  useEffect(() => {
    if(apiData.length === 0) {
      console.log("loading API data...")
    } else {
      setSensorData(apiData.sol_keys.map(solKey => {
        return {
          sol: solKey ? solKey : "Inactive",
          firstUTC: apiData[solKey].First_UTC ? apiData[solKey].First_UTC : "No data",
          lastUTC: apiData[solKey].Last_UTC ? apiData[solKey].Last_UTC : "No data",
          maxTemp: apiData[solKey].AT ? apiData[solKey].AT.mx : "No data",
          minTemp: apiData[solKey].AT ? apiData[solKey].AT.mn : "No data",
          avTemp: apiData[solKey].AT ? apiData[solKey].AT.av : "No data",
          ctTemp: apiData[solKey].AT ? apiData[solKey].AT.ct : "No data",
          maxWind: apiData[solKey].HWS ? apiData[solKey].HWS.mx : "No data",
          minWind: apiData[solKey].HWS ? apiData[solKey].HWS.mn : "No data",
          avWind: apiData[solKey].HWS ? apiData[solKey].HWS.av : "No data",
          ctWind: apiData[solKey].HWS ? apiData[solKey].HWS.ct : "No data",
          maxPressure: apiData[solKey].PRE ? apiData[solKey].PRE.mx : "No data",
          minPressure: apiData[solKey].PRE ? apiData[solKey].PRE.mn : "No data",
          avPressure: apiData[solKey].PRE ? apiData[solKey].PRE.av : "No data",
          ctPressure: apiData[solKey].PRE ? apiData[solKey].PRE.ct : "No data",
          compassDegrees: apiData[solKey].WD[0] ? apiData[solKey].WD[0].compass_degrees : "No data",
          compassPoint: apiData[solKey].WD[0] ? apiData[solKey].WD[0].compass_point : "No data",
          compassRight: apiData[solKey].WD[0] ? apiData[solKey].WD[0].compass_right : "No data",
          compassUp: apiData[solKey].WD[0] ? apiData[solKey].WD[0].compass_up : "No data",
          ctCompass: apiData[solKey].WD[0] ? apiData[solKey].WD[0].ct : "No data",
          season: apiData[solKey].Season ? apiData[solKey].Season : "No data"
        }
      }))
      console.log("API data retrieved!")
    }
  }, [apiData])

  useEffect(() => {
    if(objectDisplay === false) {
      document.getElementsByClassName("solDetails")[0].style.display = "none"
    } else {
      document.getElementsByClassName("solDetails")[0].style.display = "block"
    }
  }, [objectDisplay])

  useEffect(() => {
    let solArray = sensorData.map(data => data.sol)

    function searchSolIndex(sol) {
      return sol >= solKey;
    }

    if(sensorData.length > 0) {
      setSolIndex(solArray.findIndex(searchSolIndex))
    }
  }, [solKey, sensorData])

  return (
    <div>
      <h1 className="pageTitle">
        Mars Weather
      </h1>
      <SolCalendar
        solData={sensorData}
        objectDisplay={objectDisplay}
        setObjectDisplay={setObjectDisplay}
        solKey={solKey}
        setSolKey={setSolKey}
      />
      <MainSol
        solData={sensorData}
        objectDisplay={objectDisplay}
        setObjectDisplay={setObjectDisplay}
        solKey={solKey}
        solIndex={solIndex}
      />
    </div>
  )
}

export default App

import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function MainSol(props) {

const faTimesIcon = <FontAwesomeIcon icon={faTimes} />

let mainSolObject = props.solData.map(data => { return (
    <div style={{"height" : "100%", "overflow-y" : "scroll"}}>
        <div className="closeItem" onClick={() => props.setObjectDisplay(false)}>
          {faTimesIcon}
        </div>
        <h1><b>SOL { props.solData ? data.sol : "Loading..." }</b></h1>
        <h3><b>{props.solData ? data.lastUTC.split("T")[0] : "Loading..." }</b></h3>
        <div className="arrangeClimateData">
          <div className="climateData">
            <h2>Temperature</h2>
            <p>Min: <b>{ props.solData ? data.minTemp : "Loading..." }</b></p>
            <p>Max: <b>{ props.solData ? data.maxTemp : "Loading..." }</b></p>
            <p>Average: <b>{ props.solData ? data.avTemp : "Loading..." }</b></p>
          </div>
          <div className="climateData">
            <h2>Wind Speed</h2>
            <p>Min: <b>{ props.solData ? data.minWind : "Loading..." }</b></p>
            <p>Max: <b>{ props.solData ? data.maxWind : "Loading..." }</b></p>
            <p>Average: <b>{ props.solData ? data.avWind : "Loading..." }</b></p>
          </div>
          <div className="climateData">
            <h2>Atm. Pressure</h2>
            <p>Min: <b>{ props.solData ? data.minPressure : "Loading..." }</b></p>
            <p>Max: <b>{ props.solData ? data.maxPressure : "Loading..." }</b></p>
            <p>Average: <b>{ props.solData ? data.avPressure : "Loading..." }</b></p>
          </div>
        </div>
        <div className="climateData">
          <h2>Season: <b>{ props.solData ? data.season : "Loading..." }</b></h2>
        </div>
    </div>
)})

  return (
    <div className="solDetails">
      {mainSolObject[props.solIndex]}
    </div>
  )
}

export default MainSol

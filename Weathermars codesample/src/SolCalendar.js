import React from "react"

function SolCalendar(props) {
  let calendar = props.solData.map(data => { return (
    <div className="solBlock" key={data.sol} onClick={() => { return (
      props.setObjectDisplay(true),
      props.setSolKey(data.sol)
    )}}>
      <div className="solTitle">
        <center>
          <h2>SOL {props.solData ? data.sol : "Loading..." }</h2>
          <p><b>{props.solData ? data.lastUTC.split("T")[0] : "Loading..." }</b></p>
        </center>
      </div>
      <div className="solSensor">
        <p>Average Temperature: <b>{props.solData ? data.avTemp : "Loading..." }</b></p>
        <p>Average Wind Speed: <b>{props.solData ? data.avWind : "Loading..." }</b></p>
        <p>Average Atm. Pressure: <b>{props.solData ? data.avPressure : "Loading..." }</b></p>
        <p>Season: <b>{props.solData ? data.season : "Loading..." }</b></p>
      </div>
    </div>
  )})

  return (
    <div className="solContainer">
      {calendar.reverse()}
    </div>
  )
}

export default SolCalendar

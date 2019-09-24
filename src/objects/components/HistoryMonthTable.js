import React, { useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { renderFlag } from "../../app/helpers";
import { useObjectsState } from "../objects-context";
import { toolTip, shortenAddressToolTip, toolTipCopy } from "../../app/helpers";
import TablePaginator from "../../app/components/TablePaginator";

export default function HistoryMonthTable({ monthName, monthData }) {
  const { objectOrigin } = useObjectsState();
  const [range, setRange] = useState({ start: 0, end: 10 });

  const renderDayRows = () => {
    const { start, end } = range;

    const rangeData = monthData.slice(start, end);

    return rangeData.map(day => {
      return day.observation.map(observation => (
        <tr
          key={day.observation.indexOf(observation)}
          className="table__body-row"
        >
          <td className="table__table-data">{day.date}</td>
          <td className="table__table-data app__hide-on-mobile">
            {renderFlag(objectOrigin)}
          </td>
          <td className="table__table-data">
            {observation.user_location
              ? observation.user_location
              : "undisclosed"}
          </td>
          <td className="table__table-data app__hide-on-mobile">
            <NavLink
              className="app__nav-link"
              to={`/profile/${observation.user_address}`}
            >
              {observation.username
                ? toolTip(observation.username, observation.user_address)
                : shortenAddressToolTip(observation.user_address)}
            </NavLink>
          </td>
          <td className="table__table-data">
            {observation.observation_quality}
          </td>
          <td className="table__table-data">
            {observation.observation_time_difference}
          </td>
          <td className="table__weight-data">
            {observation.observation_weight}%
          </td>
        </tr>
      ));
    });
  };

  return monthData.length !== 0 ? (
    <Fragment>
      <table className="table history-month-table">
        <thead className="table__header">
          <tr className="table__header-row">
            <th className="table__month-text">
              {monthName.substring(0, 3).toUpperCase()}
            </th>
            <th className="app__hide-on-mobile"></th>
            <th className="table__header-text">
              {toolTip("LOCATION", toolTipCopy.location)}
            </th>
            <th className="table__header-text app__hide-on-mobile">
              {toolTip("USER", toolTipCopy.user)}
            </th>
            <th className="table__header-text">
              {toolTip("QUALITY", toolTipCopy.quality)}
            </th>
            <th className="table__header-text">
              <p className="app__hide-on-mobile">
                {toolTip("TIME DIFF", toolTipCopy.time_diff)}
              </p>
              <p className="app__hide-on-desktop">DIFF..</p>
            </th>
            <th className="table__header-weight-text">
              <p className="app__hide-on-mobile">
                {toolTip("WEIGHT", toolTipCopy.weight)}
              </p>
              <p className="app__hide-on-desktop">WT.</p>
            </th>
          </tr>
        </thead>
        <tbody>{renderDayRows()}</tbody>
      </table>
      {/* TODO - set tableDataLength to the observation count */}
      {monthData.length > 10 ? (
        <TablePaginator
          tableDataLength={monthData.length}
          range={range}
          setRange={setRange}
        />
      ) : null}
    </Fragment>
  ) : null;
}

// const object_month_history = [
// for any given year and month, front end will receive an array of objects
// each object will contain a key of date - which represents the day date in the form of a number
// and a key of observations - which is an array of objects, one for each individual observation
//   {
//     date: 18,
//     observations: [
//       {
//         observation_time: "1550398277",
//         username: "Leo Barhorst",
//         user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//         user_location: "Brooklyn, USA",
//         observation_quality: "34",
//         observation_time_difference: "1.42", // this will be a positive or negative number in seconds
//         observation_weight: "33" // a percentage value- observations from a time further back will in theory have a much lower observation_weight
//       },
//       {
//         observation_time: "1550398277",
//         username: "Jim Smith",
//         user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//         user_location: "Los Angeles, USA",
//         observation_quality: "34",
//         observation_time_difference: "1.42",
//         observation_weight: "33"
//       }
//     ]
//   },
//   {
//     date: 15,
//     observations: [
//       {
//         observation_time: "1550398277",
//         username: "Joe Bloggs",
//         user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//         user_location: "Princeton, USA",
//         observation_quality: "10",
//         observation_time_difference: "1.42", // this will be a positive or negative number in seconds
//         observation_weight: "7" // a percentage value- observations from a time further back will in theory have a much lower observation_weight
//       },
//       {
//         observation_time: "1550398277",
//         username: "Bill Quinn",
//         user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//         user_location: "Belfast, UK",
//         observation_quality: "34",
//         observation_time_difference: "1.42",
//         observation_weight: "6"
//       }
//     ]
//   },
//   {
//     date: 5,
//     observations: [
//       {
//         observation_time: "1550398277",
//         username: "Leo Barhorst",
//         user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//         user_location: "Brooklyn, USA",
//         observation_quality: "34",
//         observation_time_difference: "1.42", // this will be a positive or negative number in seconds
//         observation_weight: "1" // a percentage value- observations from a time further back will in theory have a much lower observation_weight
//       },
//       {
//         observation_time: "1550398277",
//         username: "Jim Smith",
//         user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//         user_location: "Los Angeles, USA",
//         observation_quality: "34",
//         observation_time_difference: "1.42",
//         observation_weight: "1"
//       }
//     ]
//   }
// ];

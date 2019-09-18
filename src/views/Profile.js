import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileHeader from "../profile/components/ProfileHeader";
import ObjectsCollectedTable from "../profile/components/ObjectsCollectedTable";
import ObservationsTable from "../profile/components/ObservationsTable";

import Spinner from "../app/components/Spinner";
import { useAuthState } from "../auth/auth-context";
import { useProfileDispatch } from "../profile/profile-context";
import { useUserState } from "../user/user-context";

export default function Profile({ match }) {
  const addressFromRoute = match.params.address;
  const { jwt, userAddress } = useAuthState();
  const { userData } = useUserState();
  const profileDispatch = useProfileDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log(`fetching profile data`);

      setIsLoading(true);
      await axios
        .post(
          `https://api.consensys.space:8080/profile`,
          JSON.stringify({
            jwt: jwt,
            address: addressFromRoute
            // leo's address for testing
            // address: "0x5C760Ba09C12E4fd33be49f1B05E6E1e648EB312"
          })
        )
        .then(result => {
          profileDispatch({ type: "SET_PROFILE_DATA", payload: result.data });
          setIsLoading(false);
        })
        .catch(err => console.log(err));
    };
    // TO DO - work out how to view profile pages when not logged in
    // For now the request is only made when the jwt value of "none" comes through from authState

    // when jwt value comes in,
    // and userAddress doesn't match the address in the route, fetchData
    if (jwt && userAddress !== addressFromRoute) {
      fetchData();
      // otherwise display the userData of logged in user
      // as the userAddress and addressFromRoute will match
    } else if (userData) {
      profileDispatch({ type: "SET_PROFILE_DATA", payload: userData });
    }
  }, [
    addressFromRoute,
    jwt,
    userAddress,
    userData,
    profileDispatch,
    setIsLoading
  ]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="profile__wrapper">
      <ProfileHeader />
      <ObjectsCollectedTable />
      <ObservationsTable />
    </div>
  );
}

// POST request
// /profile
// receives JWT and returns object
// This query is unique to an individual user
// const data = {
//   user_name: "Scott Tilley",
//   user_image:
//     "https://i.amz.mshcdn.com/KCJWkZNiwPyNXPcV0CN7yeL8G0A=/fit-in/1200x9600/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F784551%2F0e3defde-7d59-4d94-b094-51d187f930da.jpg",
//   user_location: "Brixton, UK",
//   user_email: "scott@space-cadet.com", // not used in render but will be passed to the "settings" component to save us another query
//   observation_count: "59000",
//   number_objects_tracked: "403",
//   average_observation_quality: "65", // a percentage value
//   user_bio: "yada yada bio here...",
//   // objects they have tracked after we processes their observations (IODs submitted)
//   // maybe confirmed_observations is a better name?
//   // sorted by most recent
//   objects_observed: [
//     {
//       object_norad_number: "12345", // used to for routing to the object page for this given object
//       object_name: "SL-27 R/B",
//       object_origin: "france",
//       object_type: "satelitte",
//       object_primary_purpose: "military",
//       object_secondary_purpose: "communications",
//       observation_quality: "50", // the quality of this individual observation
//       time_last_tracked: "1550398277",
//       address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//       username_last_tracked: "username"
//     },
//     {
//       object_norad_number: "12345",
//       object_name: "SL-27 R/B",
//       object_origin: "france",
//       object_type: "satelitte",
//       object_primary_purpose: "military",
//       object_secondary_purpose: "communications",
//       observation_quality: "50",
//       time_last_tracked: "1550398277",
//       address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//       username_last_tracked: "username"
//     },
//     {
//       object_norad_number: "12345",
//       object_name: "SL-27 R/B",
//       object_origin: "france",
//       object_type: "satelitte",
//       object_primary_purpose: "military",
//       object_secondary_purpose: "communications",
//       observation_quality: "50",
//       time_last_tracked: "1550398277",
//       address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//       username_last_tracked: "username"
//     }
//   ],
//   // essentially a full history of their IOD submissions
//   // sorted by most recent
//   // limit to 500 observations
//   observation_history: [
//     {
//       observation_time: "1550398277", // timestamp will be used to populate the date AND time fields in UI
//       object_name: "SL-27 R/B",
//       object_norad_number: "12345", // again, not used for rendering, placing here to aid with routing to object info page
//       observation_quality: "34",
//       observation_time_difference: "1.42", // seconds - will be a plus or minus value
//       observation_weight: "30", // a percentage value
//       observation_iod:
//         "28537 05 004A   4353 G 20190324193958688 56 75 0850592+471197 16 S"
//     },
//     {
//       observation_time: "1550398277",
//       object_name: "SL-27 R/B",
//       object_norad_number: "12345",
//       observation_quality: "34",
//       observation_time_difference: "1.42",
//       observation_weight: "30",
//       observation_iod:
//         "28537 05 004A   4353 G 20190324193958688 56 75 0850592+471197 16 S"
//     },
//     {
//       observation_time: "1550398277",
//       object_name: "SL-27 R/B",
//       object_norad_number: "12345",
//       observation_quality: "34",
//       observation_time_difference: "1.42",
//       observation_weight: "30",
//       observation_iod:
//         "28537 05 004A   4353 G 20190324193958688 56 75 0850592+471197 16 S"
//     }
//   ]
// };

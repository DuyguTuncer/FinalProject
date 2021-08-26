import axios from "axios";
import { useState, useRef, useEffect } from "react";
import * as trails from "../../trails.json";

export default function TopThree() {
    const [topThree, setTopThree] = useState([]);

    useEffect(() => {
        (async () => {
            console.log("I am in topthree query");
            const { data } = await axios.get(`/api/topThree/`);
            console.log("data in top three", data);
            setTopThree(data);
            console.log("gettting topthree trail id", data[0]);
        })();
    }, []);

    console.log("trails features ", trails.features);
    return (
        <div className="topThree">
            <h4 className="topThreeHeader">Here are the top three trails that liked the most</h4>
            {topThree.map((trail) => {
                const thisTrailFromTrailData = trails.features.find(
                    (thisTrail) => {
                        // console.log("This trail ", thisTrail);
                        // should I reassign it?
                        return thisTrail.properties.id == trail.trail_id;
                    }
                );
                // console.log("thisTrailFromTrailData ", thisTrailFromTrailData);
                return (
                    <div className="topThreeChild" key={trail.trail_id}>
                        <p>
                            <h3>
                                Address:{" "}
                                {thisTrailFromTrailData.properties.description}
                            </h3>
                            <p>
                                Name: {thisTrailFromTrailData.properties.title}{" "}
                            </p>
                            <img
                                className="trailImg"
                                src={thisTrailFromTrailData.properties.imageurl}
                                alt={thisTrailFromTrailData.properties.address}
                            />
                            <p className="likes"> get {trail.count} likes</p>
                            {/* <p>trail {trail.trail_id}</p> */}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

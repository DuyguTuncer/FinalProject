export default function Presentational({ first, last, imageUrl, age }) {
    // console.log("props - info passed down from parent (App) --> ", props);
    imageUrl = imageUrl || "default.png";
    return (
        <div>
            <h2>
                This is a presentational component! Im in charge of rendering
                something!
            </h2>
            <h3>
                Hi my name is {first} {last} and Im {age} years old!
            </h3>
            <img className="profile-pic" src={imageUrl} alt="Layla Arias" />
        </div>
    );
}

// Approach #2 - Using object notation
export default function Presentational(props) {
    // console.log("props - info passed down from parent (App) --> ", props);
    return (
        <div>
            <h2>
                This is a presentational component! Im in charge of rendering
                something!
            </h2>
            <h3>
                Hi my name is {props.first} {props.last} and Im {props.age}{" "}
                years old!
            </h3>
            <img
                className="profile-pic"
                src={props.imageUrl}
                alt="Layla Arias"
            />
        </div>
    );
}

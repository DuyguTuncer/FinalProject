import BioEditor from "./bioeditor";
import ProfilePic from "./profilepic";

export default function Profile({
    first,
    last,
    imageUrl,
    bio,
    updateBioInApp,
}) {
    console.log("bio info in profile.js", bio);
    return (
        <div className ="bioBox">
            <div className="helloText">
                <h3>
                    Hello {first} {last}
                </h3>
            </div>
            <div className="generalContainer">
                {/* <h3>
                Hello {first} {last}
            </h3> */}
                <ProfilePic className="biggerProfilePic" imageUrl={imageUrl} />
                <BioEditor bio={bio} updateBioInApp={updateBioInApp} />
            </div>
        </div>
    );
}

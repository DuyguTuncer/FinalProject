import BioEditor from "./bioeditor";
import ProfilePic from "./profilepic";

export default function Profile({ first, last, imageUrl, bio, updateBioInApp }) {
    console.log("bio info in profile.js", bio);
    return (
        <div>
            <h1>USER PROFILE COMPONENT</h1>
            {/* Place the profile picture here with the imageUrl after dealing with the server */}
            <h3>
                Hello my name is {first} {last}
            </h3>
            <ProfilePic imageUrl={imageUrl} />
            <BioEditor bio={bio} updateBioInApp={updateBioInApp} />
        </div>
    );
}

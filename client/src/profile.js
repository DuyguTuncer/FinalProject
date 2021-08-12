import BioEditor from "./bioeditor";
import ProfilePic from "./profilepic";

export default function Profile({ first, last, imageUrl }) {
    return (
        <div>
            <h1>USER PROFILE COMPONENT</h1>
            {/* Place the profile picture here with the imageUrl after dealing with the server */}
            <h3>
                Hello my name is {first} {last}
            </h3>
            <ProfilePic imageUrl="https://arugulafiles.typepad.com/.a/6a00e55091ba2f8833017c33715b59970b-600wi" />
            <BioEditor />
        </div>
    );
}

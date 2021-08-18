import { useState, useEffect } from "react";
import axios from "axios";

export function FriendButton(props) {
    console.log("props in FriendBtn:", props);
    // you need to have access to the id of the otheruser! (the user that we want to befriend/cancel/end friendship)
    // the other user's id lives inside OtherProfile and should be passed down as a prop
    // this.props.match.params.id - part of browser router functionality.

    // when the component mounts, in useffect, we'll want to make a request to the server to find out our relationship status with the user whose page we're looking at.
    // after we know the relationship status, we'll need to set the button text accordingly
    // ex: if there is NO relationship, then the btn should say SEND FRIEND REQUEST/ MAKE FRIEND REQUEST
    // if they're already friends, then the btn should say UNFRIEND

    // when user click on the button, we want to send THAT button text to the server and update our database!!
    // once the db has been updated, then we want to change the button text AGAIN to reflect their new status.

    return (
        <div>
            <button className="btn">OUR BUTTON TEXT</button>
        </div>
    );
}

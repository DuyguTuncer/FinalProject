import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
    receiveFriendsAndWannabees,
    acceptFriendRequest,
    unfriend,
} from "./redux/friends/slice.js";

// 1)Dispatch an action when the component mounts to populate 
// the global state with data about the current friends and wannabees

// 2)Dispatch actions when the friendship buttons are clicked. 
// (don't reuse the button from Part 8 here, it is probably not suited for this situation)

export default function Friends() {
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/api/friends").catch((err) => {
                console.log("Errororo in friends, axios /friendships", err);
            });
            console.log(
                "receiveFriendsAndWannabees(data)",
                receiveFriendsAndWannabees(data)
            );
            dispatch(receiveFriendsAndWannabees(data));
        })();
    }, []);

    const friends = useSelector((state) => {
        return (
            state.friends &&
            state.friendsAndWannabes.filter(({ accepted }) => accepted)
        );
    });
    const wannabees = useSelector((state) => {
        return (
            state.friends &&
            state.friendsAndWannabes.filter(({ accepted }) => !accepted)
        );
    });
    console.log("friends in friends.js: ", friends);
    console.log("wannabes in friends.js: ", wannabees);

    return (
        <div>
            <h1>Friends</h1>
            <h1>Wannabees</h1>
        </div>
    );
}

import { useState, useEffect } from "react";
import axios from "axios";

export default function FriendButton({ friendsId }) {
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        (async () => {
            const { data } = await axios
                .get(`/checkFriendship/${friendsId}`)
                .catch((err) => {
                    console.log(
                        "Erroror in friendButton, /checkFriendship/:friendsId",
                        err
                    );
                });

            if (data.length == 0) {
                console.log("data in if statement", data);
                setButtonText("Send a Friend Request");
            } else {
                if (!data[0].accepted) {
                    if (data[0].recipient_id == friendsId) {
                        setButtonText("Cancel Friend Request");
                    } else {
                        setButtonText("Accept Friend Request");
                    }
                } else {
                    setButtonText("Unfriend / End Friendship");
                }
            }
            console.log(friendsId);
        })();
    }, []);

    const handleSubmit = async () => {
        console.log("button text");
        const { data } = await axios
            .post("/checkFriendship", {
                buttonText: buttonText,
                friendsId: friendsId,
            })
            .catch((err) => {
                console.log(
                    "Erroror in friendButton, /checkFriendship/:friendsId",
                    err
                );
            });

        console.log("data in the frontend ", data);
        setButtonText(data);
    };

    return (
        <div>
            <button className="friendButton" onClick={handleSubmit}>
                {buttonText}
            </button>
        </div>
    );
}

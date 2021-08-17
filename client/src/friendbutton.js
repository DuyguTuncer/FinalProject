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
                setButtonText("Send a Friend Request");
            } else {
                setButtonText("Something else");
            }
            console.log(friendsId);
        })();
    }, []);

    return (
        <div>
            <button>{buttonText}</button>
        </div>
    );
}

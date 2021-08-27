import axios from "axios";
import { useState, useEffect } from "react";

export default function TrailComments({ trailId }) {
    const [comment, setComment] = useState("");
    const [textRendered, setTextRendered] = useState([]);

    useEffect(() => {
        (async () => {
            console.log("I am in api/comment/${trailId} get request");
            const { data } = await axios.get(`/api/comment/${trailId}`);
            console.log("data in get api/comment/${trailId}", data);
            setTextRendered(data);
        })();
    }, [trailId]);

    return (
        <div>
            <div className="commentContainer">
                <div className="trailComments">
                    <input
                        type="text"
                        name="comment"
                        id="comment"
                        className="commentInput"
                        placeholder="Make a comment"
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                <button
                    className="commentButton"
                    onClick={(e) => {
                        e.preventDefault();
                        axios
                            .post(`/api/comment/`, {
                                trailId,
                                comment,
                            })
                            .then(({ data }) => {
                                console.log(" /api/comment", data);
                                setTextRendered(data);
                            })
                            .catch((err) => {
                                console.log("error in /api/comment", err);
                            });
                    }}
                >
                    Send!
                </button>
            </div>
            <div className="commentBoxContainer">
                <div className="commentBox">
                    <h3>Comments: </h3>
                    {textRendered.map((each) => (
                        <div className="commentBoxInner" key={each.trail_id}>
                            <em className="hey">
                                {each.first} {each.last}:
                            </em>
                            <p className="comment">{each.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

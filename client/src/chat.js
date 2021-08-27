import { useDispatch, useSelector } from "react-redux";
import chatMessagesReducer, { newMessage } from "./redux/messages/slice";
import { socket } from "./socket";

export default function Chat() {
    const chatMessages = useSelector((state) => state.chatMessages);
    const dispatch = useDispatch();

    console.log("chatMessages in Chat: ", chatMessages);

    const sendMessage = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("new-message", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div className="chat">
            <div className="chatLayout">
                {/* <div className="chatContainer"> */}
                <h1 className="chatHeader">Let's Chat</h1>
                <div className="chat-box">
                    {chatMessages &&
                        chatMessages.map((message) => (
                            <div className="chatMessage" key={message.id}>
                                <img
                                    className="messageProfilePic"
                                    src={message.imageurl}
                                    alt=""
                                />
                                <div>
                                    <h5>
                                        <em>
                                            {message.first} {message.last} said:
                                        </em>
                                    </h5>
                                    <p>{message.text}</p>
                                </div>
                            </div>
                        ))}
                </div>

                <div className="chatinputContainer">
                    <textarea
                        name="chat-input"
                        className="chat-input"
                        placeholder={"Write your message..."}
                        onKeyPress={sendMessage}
                    ></textarea>
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
}

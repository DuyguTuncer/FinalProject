import { useState, useEffect } from "react";
import axios from "axios";

export default function FindPeople() {

    const [users, setUsers] = useState([]);
    console.log("my users in FindPeople component: ", users);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/api/findpeople");
            console.log("data in useEffect: ", data);
            setUsers(data);
        })();
    }, []);

    return (
        <div>
            <h3>Find People</h3>
            <div>
                {users.map((user) => {
                    <div key={user.id}>
                        {user.first} {user.last}
                    </div>;
                })}
            </div>
        </div>
    );
}

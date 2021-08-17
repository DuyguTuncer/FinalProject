import { useState, useEffect } from "react";
import axios from "axios";

export default function FindPeople() {
    const [users, setUsers] = useState([]);
    console.log("my users in FindPeople component: ", users);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/api/findpeople");
            console.log("data in useEffect: ", data);
            setUsers(data);
        })();
    }, []);

    useEffect(() => {
        console.log("my users in FindPeopleWithSearchTerm: ", users);
        (async () => {
            const { data } = await axios.get(`/api/findpeople/${searchTerm}`);
            setUsers(data);
        })();
    }, [searchTerm]);

    return (
        <div>
            <h3>Find People</h3>
            <div>
                <div>
                    {users.map((user) => {
                        <div key={user.id}>
                            {user.first} {user.last}
                            <img
                                src={user.imageurl}
                                alt={`${user.first} ${user.last}`}
                            />
                        </div>;
                    })}
                </div>
            </div>
            <div className="searchUsers">
                <label>Are you looking for someone in particular?</label>
                <input
                    type="text"
                    name="searchUser"
                    id="searchUser"
                    placeholder="Enter name"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {users.map((user) => (
                    <div className="recentUsers" key={user.id}>
                        <img
                            src={user.imageurl}
                            alt={`${user.first} ${user.last}`}
                        />
                        <p>
                            {user.first} {user.last}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
            <div className="searchUsers">
                <h3>Are you looking for someone in particular?</h3>
                <input
                    type="text"
                    name="searchUser"
                    id="searchUser"
                    placeholder="Enter name"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <h3>Find People</h3>

                {/* <div>
                    <div>
                        {users.map((user) => {
                            <div key={user.id}>
                                {user.first} {user.last}
                                <Link to={"/user/" + user.id}>
                                    <img
                                        className="findPeopleImg"
                                        // src={user.imageurl}
                                        alt={`${user.first} ${user.last}`}
                                        src={
                                            user.imageurl ||
                                            "/default-profilepic.jpg"
                                        }
                                    />
                                </Link>
                            </div>;
                        })}
                    </div>
                </div> */}

                {users.map((user) => (
                    <div className="recentUsers" key={user.id}>
                        <Link to={"/user/" + user.id}>
                            <img
                                className="findPeopleImg"
                                src={user.imageurl}
                                alt={`${user.first} ${user.last}`}
                            />
                        </Link>
                        <p className="findPeopleUsers">
                            {user.first} {user.last}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

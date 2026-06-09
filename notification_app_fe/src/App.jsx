import { useEffect, useState } from "react";
import axios from "axios";

function App() {

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const [notifications, setNotifications] =
    useState([]);

    // FETCH NOTIFICATIONS
    const fetchNotifications = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/notifications"
            );

            setNotifications(
                response.data.notifications
            );

        }
        catch (error) {

            console.log(error);

        }
    };

    // CREATE NOTIFICATION
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:5000/api/notifications",
                {
                    title,
                    message
                }
            );

            setTitle("");
            setMessage("");

            fetchNotifications();

        }
        catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {

        fetchNotifications();

    }, []);

    return (

        <div
            style={{
                padding: "40px",
                fontFamily: "Arial"
            }}
        >

            <h1>
                Notification System
            </h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    style={{
                        display: "block",
                        marginBottom: "10px",
                        padding: "10px",
                        width: "300px"
                    }}
                />

                <textarea
                    placeholder="Enter message"
                    value={message}
                    onChange={(e) =>
                        setMessage(e.target.value)
                    }
                    style={{
                        display: "block",
                        marginBottom: "10px",
                        padding: "10px",
                        width: "300px",
                        height: "100px"
                    }}
                />

                <button
                    type="submit"
                    style={{
                        padding: "10px 20px"
                    }}
                >
                    Create Notification
                </button>

            </form>

            <hr />

            <h2>
                Notifications
            </h2>

            {
                notifications.map((item) => (

                    <div
                        key={item._id}
                        style={{
                            border: "1px solid gray",
                            padding: "10px",
                            marginBottom: "10px",
                            width: "400px"
                        }}
                    >

                        <h3>
                            {item.title}
                        </h3>

                        <p>
                            {item.message}
                        </p>

                    </div>

                ))
            }

        </div>

    );
}

export default App;
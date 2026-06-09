import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const Log = async (
    stack,
    level,
    packageName,
    message
) => {

    try {

        const response = await axios.post(
            "http://4.224.186.213/evaluation-service/logs",
            {
                stack,
                level,
                package: packageName,
                message
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${process.env.ACCESS_TOKEN}`
                }
            }
        );

        console.log("Log sent");

    }
    catch (error) {

        console.log("Logging failed");

    }
};
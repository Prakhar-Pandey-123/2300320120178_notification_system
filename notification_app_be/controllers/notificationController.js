import Notification
from "../models/Notification.js";

import { Log }
from "../logging_middleware/logger.js";

export const createNotification =
async (req, res) => {

    try {

        const { title, message } = req.body;

        const notification =
        await Notification.create({
            title,
            message
        });

        await Log(
            "full",
            "info",
            "controller",
            "Notification created"
        );

        res.status(201).json({
            success: true,
            notification
        });

    }
    catch (error) {

        await Log(
            "backend",
            "error",
            "controller",
            error.message
        );

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const getNotifications =
async (req, res) => {

    try {

        const notifications =
        await Notification.find();
          await Log(
            "backend",
            "info",
            "controller",
            "Notifications fetched"
        );

        res.status(200).json({
            success: true,
            notifications
        });

    }
    catch (error) {
          await Log(
            "backend",
            "info",
            "controller",
            "Notifications fetched"
        );

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
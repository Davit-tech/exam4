import {Events, Users} from "../models/index.js";
import mail from "../services/mail.js";
import Socket from '../services/socket.js';

export default {

    async createEvent(req, res) {
        try {
            const userId = req.userId;
            const file = req.file;

            if (!file) {
                return res.status(400).json({
                    success: false,
                    fields: {
                        image: "Please upload an event image.",
                    }
                });
            }
            const image = file.path.replace("public/uploads", "");
            const {title, description, date, location} = req.body;

            const users = await Users.findAll({attributes: ["email"]});
            const emailList = users.map(user => user.email);

            const event = await Events.create({title, description, date, location, userId, image});

            await mail(
                emailList,
                `"Event System" <${process.env.MAIL_USER}>`,
                "New Event!",
                "new-event",
                {
                    event: {title, description, date, location}
                }
            );
            Socket.emit("new_event", {
                title,
                description,
                date,
                location
            });
            res.status(201).json({event, success: true});
        } catch (error) {
            console.error("Error sending event email:", error);
            res.status(500).json({success: false, message: "Server error"});
        }
    },

    async getAllEvents(req, res) {
        try {
            const {page = 1, limit = 10} = req.query;

            const offset = (page - 1) * limit;

            const {rows, count} = await Events.findAndCountAll({
                include: [
                    {
                        model: Users,
                        as: "creator",
                        attributes: ["id", "userName", "email"],
                    }
                ],
                order: [["date", "ASC"]],
                limit,
                offset
            });

            const totalPages = Math.ceil(count / limit);

            res.status(200).json({
                success: true,
                events: rows,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalCount: count,
                    perPage: limit
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({success: false, message: "Server error"});
        }
    },

    async getMyEvents(req, res) {
        const userId = req.userId;
        const {page = 1, limit = 10} = req.query;

        const offset = (page - 1) * limit;

        try {
            const {rows, count} = await Events.findAndCountAll({
                where: {userId},
                order: [["date", "ASC"]],
                limit,
                offset
            });

            const totalPages = Math.ceil(count / limit);

            res.status(200).json({
                success: true,
                events: rows,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalCount: count,
                    perPage: limit
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({success: false, message: "Server error"});
        }
    },

    async updateEvent(req, res) {
        const {eventId} = req.params;
        const {title, description, date, location} = req.body;
        const userId = req.userId;

        try {
            const event = await Events.findOne({where: {id: eventId, userId}});

            if (!event) {
                return res.status(404).json({success: false, message: "Event not found or you are not the creator."});
            }

            event.title = title;
            event.description = description;
            event.date = date;
            event.location = location;

            await event.save();

            res.status(200).json({success: true, event});
        } catch (error) {
            console.error(error);
            res.status(500).json({success: false, message: "Server error"});
        }
    }
}

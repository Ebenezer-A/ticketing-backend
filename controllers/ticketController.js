import Ticket from "../models/ticket/index.js";

export const addTicket = (req, res, next) => {
  const { title, description } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized, user not found" });
  }

  const { _id } = req.user;

  try {
    const newTicket = new Ticket({
      title,
      description,
      status: "Open",
      user: _id,
    });

    newTicket.save();
    res.status(200).json({ message: "Ticket created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTicket = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = status;
    await ticket.save();

    res.status(200).json({ message: "Ticket status updated" });
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTickets = async (req, res, next) => {
  try {
    if (req.user.role === "Admin") {
      const tickets = await Ticket.find();
      const formattedTickets = tickets.map((ticket) => ({
        id: ticket._id,
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
      }));
      return res.status(200).json({ tickets: formattedTickets });
    }

    const tickets = await Ticket.find({ user: req.user._id });
    return res.status(200).json({ tickets });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTicket = async (req, res, next) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findById(id);
    return res.status(200).json({
      id: ticket._id,
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

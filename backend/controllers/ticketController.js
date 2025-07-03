const Ticket = require('../models/Ticket');

exports.createTicket = async (req, res) => {
  try {
    const {
      ticketNo,
      date,
      name,
      department,
      subject,
      category,
      description,
      type,
      priority
    } = req.body;

    const newTicket = await Ticket.create({
      ticketNo,
      date,
      name,
      department,
      subject,
      category,
      description,
      type,
      priority,
      createdBy: req.user.id
    });

    res.status(201).json(newTicket);
  } catch (err) {
    console.error('Error creating ticket:', err.message);
    res.status(500).json({ message: 'Failed to create ticket' });
  }
};


exports.getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    console.error("🔥 Error fetching tickets:", err.message);
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
};


// 🛠️ Get all Operational Team tickets
exports.getOperationalTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ category: 'Operational Team' });
    res.status(200).json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// 🧑‍💻 Get all Technical Support tickets
exports.getTechnicalTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ category: 'Technical Support' });
    res.status(200).json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


// PUT /api/tickets/:id/status
exports.updateTicketStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const ticket = await Ticket.findByIdAndUpdate(id, { status }, { new: true });
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (err) {
    console.error('Error updating ticket status:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// PUT /api/tickets/:id/assign
exports.assignTicketPerson = async (req, res) => {
  const { id } = req.params;
  const { assignedTo } = req.body;

  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      { assignedTo },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.json(updatedTicket);
  } catch (err) {
    console.error('Error assigning person:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// GET /api/tickets - Fetch all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    console.error('🔥 Error fetching all tickets:', err.message);
    res.status(500).json({ message: 'Failed to fetch tickets' });
  }
};


// Get tickets awaiting approval
exports.getTicketsAwaitingApproval = async (req, res) => {
  try {
    const tickets = await Ticket.find({ status: 'Awaiting Approval' });
    res.status(200).json(tickets);
  } catch (err) {
    console.error('Error fetching approval tickets:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};




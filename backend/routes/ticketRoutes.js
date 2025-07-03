const express = require('express');
const router = express.Router();
const { createTicket , getUserTickets ,updateTicketStatus} = require('../controllers/ticketController');
const ticketController = require('../controllers/ticketController');
const protect = require('../middlewares/authMiddleware');

router.post('/new', protect, createTicket);
router.get('/my-tickets', protect, getUserTickets);
// Route: GET /api/tickets/operational
router.get('/operational', protect, ticketController.getOperationalTickets);

// Route: GET /api/tickets/technical
router.get('/technical', protect, ticketController.getTechnicalTickets);

//  Status update route
router.put('/:id/status', protect, updateTicketStatus);

// Assign person to ticket
router.put('/:id/assign', protect, ticketController.assignTicketPerson);

// Route: GET /api/tickets
router.get('/', protect, ticketController.getAllTickets);

router.get('/approvals', protect, ticketController.getTicketsAwaitingApproval);


module.exports = router;

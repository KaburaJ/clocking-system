const express = require("express");
const router = express.Router();
const cardService = require("../services/clocking.service");


//dbcbhcdhcvdch
// Get all cards
router.get("/", async (req, res) => {
  try {
    const cards = await cardService.getAllCards();
    res.json(cards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

// Toggle clocked-in status of a card by Card UUID
router.get("/:uuid/toggle-clock", async (req, res) => {
  try {
    const { uuid } = req.params;
    const result = await cardService.toggleClockedIn(uuid);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

// Register a new card
router.post("/register", async (req, res) => {
  try {
    const createdCard = await cardService.createCard(req.body);
    res.status(201).json(createdCard);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

// Get card by Id
router.get("/:uuid", async (req, res) => {
  try {

    const exists = await cardService.checkUUIDExists(req.params.uuid);
    console.log("exists: ", exists);
    if (!exists) {
      return res.status(404).json({ statusCode: 404, error: "Card not found" });
    }
    return res.json({"message" : exists});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

// Update card by Id
router.put("/update/:id", async (req, res) => {
  try {
    await cardService.updateCard({ ...req.body, Id: req.params.id });
    return res.json({ statusCode: 200, message: "Card updated successfully" });
  } catch (error) {
    return res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

// Delete card by Id
router.delete("/delete/:id", async (req, res) => {
  try {
    await cardService.deleteCard(req.params.id);
    return res.json({ statusCode: 200, message: "Card deleted successfully" });
  } catch (error) {
    return res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

module.exports = router;

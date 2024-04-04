const { DataTypes, Sequelize } = require("sequelize");
const db = require("../config/db");
const Card = require("../models/clocking.model");
const Log = require("../models/clocking.model")


const toggleClockedIn = async (Card_UUID) => {
  const card = await Card.findOne({ where: { Card_UUID } });
  if (!card) {
    throw new Error("Card not found");
  }

  const isClockedIn = !card.isClockedIn;

  if (isClockedIn) {
    await Log.create({ CardId: card.Id, clockIn: new Date() });
  } else {
    const log = await Log.findOne({ where: { CardId: card.Id, clockOut: null } });
    if (log) {
      log.clockOut = new Date();
      await log.save();
    }
  }

  // Update card's isClockedIn status only
  await Card.update({ isClockedIn }, { where: { Card_UUID } });

  return { isClockedIn };
};

const checkUUIDExists = async (Card_UUID) => {
  const card = await Card.findOne({ where: { Card_UUID } });
  return !!card;
};

const createCard = async ({ Card_UUID, First_Name, Middle_Name, Last_Name, Reg_No, Department }) => {
  const isUUIDExists = await checkUUIDExists(Card_UUID);
  if (isUUIDExists) {
    throw new Error("Card with provided UUID already exists.");
  }

  const newCard = await Card.create({ Card_UUID, First_Name, Middle_Name, Last_Name, Reg_No, Department });
  return newCard;
};

const deleteCard = async (Card_UUID) => {
  const deletedCount = await Card.destroy({ where: { Card_UUID } });
  if (deletedCount === 0) {
    throw new Error("No records were deleted. Record with provided Id not found.");
  }
};

const updateCard = async ({ Card_UUID, First_Name, Middle_Name, Last_Name, Reg_No, Department }) => {
  const [updatedCount] = await Card.update(
    { Card_UUID, First_Name, Middle_Name, Last_Name, Reg_No, Department },
    { where: { Card_UUID } }
  );
  if (updatedCount === 0) {
    throw new Error("No records were updated. Record with provided Id not found.");
  }
};

const getAllCards = async () => {
  return await Card.findAll();
};

module.exports = {
  checkUUIDExists,
  createCard,
  deleteCard,
  updateCard,
  getAllCards,
  toggleClockedIn
};

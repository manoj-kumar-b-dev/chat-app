const express = require("express");
const router = express.Router();
const HealthData = require("../models/HealthData.js");
const authMiddleWare = require("../middleware/authMiddleware.js")
router.post("/health", authMiddleWare, async (req, res) => {
  try {
    const { userId, temperature, heartRate, spo2 } = req.body
    const newData = new HealthData({
      userId,
      temperature,
      heartRate,
      spo2
    })

    await newData.save();
    res.status(200).json({
      message: "health data stored succesfully",
      data: newData
    }
    )
  }
  catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

router.get("/health/latest", authMiddleWare, async (req, res) => {
  try {
    const latestData = await HealthData
      .findOne()
      .sort({ timestamp: -1 });
    res.json(latestData)
  }

  catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}
)

router.get("/health/history", authMiddleWare, async (req, res) => {
  try {
    const healthHistory = await HealthData.find().sort({ timestamp: -1 })
    res.json(healthHistory)
  }
  catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}
)

module.exports = router;



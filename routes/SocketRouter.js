const express = require("express");

function SocketRouter(io) {
  const router = express.Router();

  router.post("/pfp-outfit", (req, res) => {
    const body = req.body;

    console.log(req);

    console.log({ body });

    io.emit("pfp-outfit", JSON.stringify(body));
    res.json({
      message: "data delivered",
    });
  });

  return router;
}

module.exports = SocketRouter;

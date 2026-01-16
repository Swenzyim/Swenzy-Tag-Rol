const client = require("../index"); // Swenzy ❤️

client.on("ready", () => {
    console.log(`${client.user.tag} ile giriş yapıldı!`)
  client.user.setStatus("idle")
client.user.setActivity("Development By ExCODE", { type: "STREAMING" })
});

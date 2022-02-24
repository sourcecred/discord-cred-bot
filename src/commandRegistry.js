module.exports = {
    commands: [
        ...require("./handlers/setAddress"),
        ...require("./handlers/activate-deactivate")
    ]
}
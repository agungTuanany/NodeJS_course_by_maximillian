const path = require("path");
const fs = require("fs");

// Helper function
const clearImage = filePath => {

    filePath = path.join(__dirname, "..", filePath);

    fs.unlink(filePath, error => {

        // @TODO: Handle the error correctly
        console.log("clearImage error:", error);
    });
};

module.exports = {
    clearImage
}

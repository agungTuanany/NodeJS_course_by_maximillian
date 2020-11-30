// Core Dependencies
const fs =  require("fs");

const deleteFile = (filePath) => {

    fs.unlink(filePath, (err) => {

        if (err) {
            console.log("==> deleteFile helper error:", err);
            throw (err);
        };
    });
};

module.exports = {
    deleteFile
};

const fs = require("fs");
const path = require("path");
const uploadConfigs = require("../configs/uploads");



class DiskStorage {

    async save(file) {

      await fs.promises.rename(path.resolve(uploadConfigs.TMP_FOLDER, file), path.resolve(uploadConfigs.UPLOADS_FOLDER, file));

      return file;

    }

    async deleteFile(file){

        const fileName = path.resolve(uploadConfigs.UPLOADS_FOLDER, file);

        try {

            await fs.promises.stat(fileName);

        } catch {

            return

        }

        await fs.promises.unlink(fileName);



    }
}

module.exports = DiskStorage

import Database from "../../database/database";

class LabelManager {
    public getLabels = async () => {
        try {
            const sql = "SELECT * FROM label";
            const labels = await Database.query(sql);
            return labels;
        } catch (err) {
            console.log("Error getting labels:", err);
            throw err;
        }
    }

    public addLabel = async (input: { [key: string]: any }) => {
        try {
            const labelName = input.labelName;
            const description = input.description;

            const insertLabelSql = `
                INSERT INTO label (name, description)
                VALUES (?, ?);
            `;
            await Database.query(insertLabelSql, [labelName, description]);
            return { message: "Add label successfully" };
        } catch (err) {
            console.log("Error adding label:", err);
            throw {
                message: "Error adding label",
                error: err,
            };
        }
    };

    public updateLabel = async (input: { [key: string]: any }) => {
        try {
            const labelName = input.labelName;
            const newLabelName = input.newLabelName;
            const newDescription = input.newDescription;

            const updateLabelSql = `
                UPDATE label
                SET name = ?, description = ?
                WHERE name = ?;
            `;
            await Database.query(updateLabelSql, [newLabelName, newDescription, labelName]);
            return { message: "Update label successfully" };
        } catch (err) {
            console.log("Error updating label:", err);
            throw {
                message: "Error updating label",
                error: err,
            };
        }
    };

    public deleteLabel = async (labelName: string) => {
        try {
            const deleteLabelSql = `
                DELETE FROM label
                WHERE name = ?;
            `;
            await Database.query(deleteLabelSql, [labelName]);
            return { message: "Delete label successfully" };
        } catch (err) {
            console.log("Error deleting label:", err);
            throw {
                message: "Error deleting label",
                error: err,
            };
        }
    };
}

export default new LabelManager();  
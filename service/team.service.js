const db = require('../models');
const Team=db.team;
const teamValidationSchema = require('../validation/joi.validate'); // Import the Joi validation schema

module.exports = {
    addNewTeamService: async (data) => {
        try {
            
            // Validate incoming data against the Joi validation schema
            const { error, value } = teamValidationSchema.validate(data);

            if (error) {
                // Handle validation error
                
                console.error("Validation error:", error.details);
                // Return an appropriate response indicating validation failure
                return { success: false, error: "Validation error", details: error.details };
            } else {
                // Validation passed, proceed with saving data to the database
                // value contains the validated data

                // Save the team to the database
                const addTeam = await Team.create(value);

                // Check if team is successfully added to the database
                if (addTeam) {
                    return { success: true, message: "Team added successfully" };
                } else {
                    throw new Error("Failed to add team to the database");
                }
            }
        } catch (error) {
            // Handle any errors that occur during the process
            console.error("Error:", error);
            return { success: false, error: "Internal Server Error" };
        }
    }
};

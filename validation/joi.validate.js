const Joi = require('joi');

const teamSchema = Joi.object({
    teamName: Joi.string().required(),
    players: Joi.array().items(Joi.object({
        id: Joi.string().required(),
        role: Joi.string().valid('BATTER', 'ALL-ROUNDER', 'BOWLER', 'WICKETKEEPER').required()
    })).required().min(11) // Enforce exactly 11 items in the array
      .custom((value, helpers) => {
        // Count the number of players in each role
        const rolesCount = value.reduce((acc, player) => {
          acc[player.role] = (acc[player.role] || 0) + 1;
          return acc;
        }, {});
        
        // Check if each role has at least one player and at most eight players
        const roles = ['BATTER', 'ALL-ROUNDER', 'BOWLER', 'WICKETKEEPER'];
        const invalidRoles = roles.filter(role => {
          const count = rolesCount[role] || 0;
          return count < 1 || count > 8;
        });

        if (invalidRoles.length === 0) {
          return value;
        } else {
          const roleErrors = invalidRoles.map(role => `${role} must have between 1 and 8 players`);
          return helpers.error('any.invalid', { message: roleErrors.join('; ') });
        }
    }),
    captain: Joi.string(),
    viceCaptain: Joi.string()
});

module.exports = teamSchema;

const mongoose = require('mongoose');

module.exports = mongoose => {
    const matchDetailsSchema = mongoose.Schema(
        {
            innings: { type: String },
            overs: { type: String },
            ballnumber: { type: String },
            batter: { type: String },
            bowler: { type: String },
            extra_type: { type: String },
            batsman_run: { type: String },
            extras_run: { type: String },
            total_run: { type: String },
            non_boundary: { type: String },
            isWicketDelivery: { type: String },
            player_out: { type: String },
            kind: { type: String },
            fielders_involved: { type: String },
            BattingTeam: { type: String },
        },
        { collection: 'matchDetails' } 
    );

    const matchDetails = mongoose.model('matchDetails', matchDetailsSchema);
    return matchDetails;
};

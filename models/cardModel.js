const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    freelancerID: {
        type: String,
        required: [true, 'Freelancer ID is required']
    },
    strategyAndVision: {
        card1: {img: {type:String, default: "img.png"}, heading: {type:String, default: "Muneland Workshop"}, status: {type: String, default: "Not used"}, zonetext1: {type: String, default: ""}, zonetext2: {type: String, default: ""}, zonetext3: {type: String, default: ""}, zonetext4: {type: String, default: ""}},
        card2: {img: {type:String, default: "img.png"}, heading: {type:String, default: "Ongoing Research Pod"}, status: {type: String, default: "Not used"}, zonetext1: {type: String, default: ""}, zonetext2: {type: String, default: ""}, zonetext3: {type: String, default: ""}, zonetext4: {type: String, default: ""}},
        card3: {img: {type:String, default: "img.png"}, heading: {type:String, default: "Enterprise Metaverse Strategy"}, status: {type: String, default: "Not used"}, zonetext1: {type: String, default: ""}, zonetext2: {type: String, default: ""}, zonetext3: {type: String, default: ""}, zonetext4: {type: String, default: ""}},
        card4: {img: {type:String, default: "img.png"}, heading: {type:String, default: " Metaverse Measurement/KPI Strategy"}, status: {type: String, default: "Not used"}, zonetext1: {type: String, default: ""}, zonetext2: {type: String, default: ""}, zonetext3: {type: String, default: ""}, zonetext4: {type: String, default: ""}},
        card5: {img: {type:String, default: "img.png"}, heading: {type:String, default: "Future Experience and Audience Strategy"}, status: {type: String, default: "Not used"}, zonetext1: {type: String, default: ""}, zonetext2: {type: String, default: ""}, zonetext3: {type: String, default: ""}, zonetext4: {type: String, default: ""}},
        card6: {img: {type:String, default: "img.png"}, heading: {type:String, default: "GTM Startegy & Assessment"}, status: {type: String, default: "Not used"}, zonetext1: {type: String, default: ""}, zonetext2: {type: String, default: ""}, zonetext3: {type: String, default: ""}, zonetext4: {type: String, default: ""}},
        card7: {img: {type:String, default: "img.png"}, heading: {type:String, default: "Roadmap incl. Proof-of-Strategy plan"}, status: {type: String, default: "Not used"}, zonetext1: {type: String, default: ""}, zonetext2: {type: String, default: ""}, zonetext3: {type: String, default: ""}, zonetext4: {type: String, default: ""}},
        card8: {img: {type:String, default: "img.png"}, heading: {type:String, default: "Metaverse Business Case"}, status: {type: String, default: "Not used"}, zonetext1: {type: String, default: ""}, zonetext2: {type: String, default: ""}, zonetext3: {type: String, default: ""}, zonetext4: {type: String, default: ""}},

    },
    entSolutionPlaybook: {
        card1: {img: {type:String, default: "img.png"}, heading: {type:String, default: "Capability Assessment & Requirements"}, status: {type: String, default: "Not used"}, zonetext1: {type: String, default: ""}, zonetext2: {type: String, default: ""}, zonetext3: {type: String, default: ""}, zonetext4: {type: String, default: ""}},
        card2: {img: {type:String, default: "img.png"}, heading: {type:String, default: " Co-Op & Market Analysis"}, status: {type: String, default: "Not used"}, zonetext1: {type: String, default: ""}, zonetext2: {type: String, default: ""}, zonetext3: {type: String, default: ""}, zonetext4: {type: String, default: ""}},
        card3: {img: {type:String, default: "img.png"}, heading: {type:String, default: "Tech., Ecosystem, & V/A Requirements"}, status: {type: String, default: "Not used"}, zonetext1: {type: String, default: ""}, zonetext2: {type: String, default: ""}, zonetext3: {type: String, default: ""}, zonetext4: {type: String, default: ""}},
        card4: {img: {type:String, default: "img.png"}, heading: {type:String, default: "Funding Model Process & Governance"}, status: {type: String, default: "Not used"}, zonetext1: {type: String, default: ""}, zonetext2: {type: String, default: ""}, zonetext3: {type: String, default: ""}, zonetext4: {type: String, default: ""}},
    },
    leadershipAndSocialization: {
        card1: {img: {type:String, default: "img.png"}, heading: {type:String, default: "Enterprise Stakeholder Socialization Strategy"}, status: {type: String, default: "Not used"}, zonetext1: {type: String, default: ""}, zonetext2: {type: String, default: ""}, zonetext3: {type: String, default: ""}, zonetext4: {type: String, default: ""}},
        card2: {img: {type:String, default: "img.png"}, heading: {type:String, default: "Board Meeting Presentation"}, status: {type: String, default: "Not used"}, zonetext1: {type: String, default: ""}, zonetext2: {type: String, default: ""}, zonetext3: {type: String, default: ""}, zonetext4: {type: String, default: ""}},
        card3: {img: {type:String, default: "img.png"}, heading: {type:String, default: "Internal Communications Plan & Execution"}, status: {type: String, default: "Not used"}, zonetext1: {type: String, default: ""}, zonetext2: {type: String, default: ""}, zonetext3: {type: String, default: ""}, zonetext4: {type: String, default: ""}},
        card4: {img: {type:String, default: "img.png"}, heading: {type:String, default: "Partnership Term Sheet"}, status: {type: String, default: "Not used"}, zonetext1: {type: String, default: ""}, zonetext2: {type: String, default: ""}, zonetext3: {type: String, default: ""}, zonetext4: {type: String, default: ""}},
    }
},
{
    timestamps: true
})

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');


const membershipSchema = new Schema({
    name: {
        type: String
    },
    type: {
        type: String
    },
    // description: {
    //     type: String
    // },
    cost: {
        type: String
    },
    features: {
        type: Array,
        default: []
    },
    deliverables: {
        type: Array,
        default: []
    }
}

);

const Membership = mongoose.model('Membership', membershipSchema);
module.exports = Membership;



/*



StrategyAndVision: {
    StartingVision: {
        Q1: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q2: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q3: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q4: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q5: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q6: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q7: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q8: {Outcomes, Why, MetaverseRoles, Video, Tips}
    },
    OngoingResearch: {
        Q1: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q2: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q3: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q4: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q5: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q6: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q7: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q8: {Outcomes, Why, MetaverseRoles, Video, Tips}
    },
    EnterpriseMetaverseStrategy: {
        Q1: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q2: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q3: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q4: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q5: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q6: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q7: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q8: {Outcomes, Why, MetaverseRoles, Video, Tips}
    },
    MetaverseMeasurement: {
        Q1: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q2: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q3: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q4: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q5: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q6: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q7: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q8: {Outcomes, Why, MetaverseRoles, Video, Tips}
    },
    FutureExperienceAndAudienceStrategy: {
        Q1: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q2: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q3: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q4: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q5: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q6: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q7: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q8: {Outcomes, Why, MetaverseRoles, Video, Tips}
    },
    GTMStrategyAndAssessment: {
        Q1: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q2: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q3: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q4: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q5: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q6: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q7: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q8: {Outcomes, Why, MetaverseRoles, Video, Tips}
    },
    ProofOfStrategyPlan: {
        Q1: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q2: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q3: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q4: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q5: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q6: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q7: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q8: {Outcomes, Why, MetaverseRoles, Video, Tips}
    },
    GTMStrategy: {
        Q1: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q2: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q3: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q4: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q5: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q6: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q7: {Outcomes, Why, MetaverseRoles, Video, Tips},
        Q8: {Outcomes, Why, MetaverseRoles, Video, Tips}
    }
}

*/
import mongoose from 'mongoose';
const technologySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    tag: {
        type: String,
        required: true,
    },
    projects: [{
        type: mongoose.Types.ObjectId,
        ref: "Project",
    }]
},{timestamps: true, versionKey: false})

export default mongoose.model('Technology', technologySchema);
import { array } from 'joi';
import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    description: String,
    link: {
        type: String,
        default: ""
    },
    linkGithub: {
        type: String,
        default: ""
    },
    technologyId: [{
        type: mongoose.Types.ObjectId,
        ref: "Technology"
    }],
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
},{timestamps: true, versionKey: false})

projectSchema.plugin(mongooseDelete, {
    deletedAt: true,
    // overrideMethods: 'all'
})

export default mongoose.model('Project', projectSchema);
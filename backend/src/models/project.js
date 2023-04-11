import { array } from 'joi';
import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
// import slugify from 'slugify';
import slug from 'mongoose-slug-generator';

// projectSchema.plugin(slug);
mongoose.plugin(slug);

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        // required: true,
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
    slug: { 
        type: String, 
        slug: "name",
        unique: true 
    },
},{timestamps: true, versionKey: false})

projectSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})


// projectSchema.pre("save", function(next) {
//     this.slug = slugify(this.name, {
//         lower: true,
//         strinct: true,
//     });
//     next();
// })

export default mongoose.model('Project', projectSchema);
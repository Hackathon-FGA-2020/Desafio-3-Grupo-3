import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var ProductSchema = new Schema ({
        name: {
            type: String,
            unique: true,
            required: true
        },
        image: {
            type: String,
            unique: true,
            required: false
        },
        synonyms: {
            type: [String],
            unique: false,
            required: false
        }
    },
    { timestamps: true }    // data e horario
);

export default mongoose.model('Product', ProductSchema); // Aqui vai o foregin key
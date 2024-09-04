import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    image: { 
        type: String, 
        required: true 
    },
    subImages: [{ 
        type: String ,
        required:true
    }],
    title: { 
        type: String, 
        required: true 
    },
    frameType: { 
        type: String, 
        required: true 
    },
    frameShape: { 
        type: String, 
        required: true 
    },
    frameColor: { 
        type: String, 
        required: true 
    },
    frameSize: { 
        type: String, 
        required: true 
    },
    framePower: { 
        type: String, 
        required: true 
    },
    gender: { 
        type: String, 
        enum: ["Male", "Female", "Unisex", "Kids"], 
        required: true 
    },
    brand: { 
        type: String, 
        required: true 
    },
    choice: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    }
},{
    versionKey:false
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;


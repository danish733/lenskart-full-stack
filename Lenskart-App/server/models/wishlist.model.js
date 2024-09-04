import mongoose from 'mongoose';

const wishlistSchema = mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    products: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product' 
        }
    ],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const WishlistModel = mongoose.model('Wishlist', wishlistSchema);

export default WishlistModel;

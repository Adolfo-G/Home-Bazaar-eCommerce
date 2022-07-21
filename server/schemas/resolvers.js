const { AuthenticationError } = require('apollo-server-express');
const { User, Listing } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            const users= await User.find({isListingPublic:true});
            return users;
        },
        user: async (parent, { email }) => {
            const user = await User.findOne({ email });
            return user;
        },
        listedUser: async (parent, { id }) => {
            const listedUser= await User.findOne({ _id: id });
            return listedUser;
        },
        listings: async (parent, { username }) => {
            const params = username ? { username } : {};
            const allListings = await Listing.find(params).sort({ createdAt: -1 });
            return allListings
        },
        listing: async (parent, { username }) => {
            const listing = await Listing.find({ username});
            return listing;
        },
        item: async (parent,{id})=>{
            const item = await Listing.findOne({_id:id});
            return item;
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('thoughts');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }

            throw new AuthenticationError('Not logged in');
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },

        addListItem: async (parent, {
            username,
            imageRef,
            item,
            description,
            stock,
            price,
            }, context) => {
            if (context.user) {
                const listItem = await Listing.create({
                    username,
                    imageRef,
                    item,
                    description,
                    stock,
                    price,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { listings: listItem._id } }
                );

                return listItem;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        editListItem: async (parent, {
            itemId,
            username,
            imageRef,
            item,
            description,
            stock,
            price,
            }, context) => {
            if (context.user) {
                const editlistItem = await Listing.findByIdAndUpdate(
                    {_id: itemId},
                    {
                        username,
                        imageRef,
                        item,
                        description,
                        stock,
                        price, 
                    },
                    {new:true}
                );
                return editlistItem;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        deleteItem: async (parent, { itemId }, context) => {
            if (context.user) {
              const item = await Listing.findOneAndDelete({
                _id: itemId,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { listings: itemId } }
              );
      
              return item;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          editUserListingStatus: async (parent, {isListingPublic}, context) => {
            if (context.user) {
                const editListingStatus = await User.findOneAndUpdate(
                    {email: context.user.email},
                    {
                        isListingPublic:isListingPublic,
                    },
                    {new:true}
                );
                return editListingStatus;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addToCart: async(parent, {itemId, stock, price, cartTotal},context)=>{
            await User.findOneAndUpdate(
                { _id: context.user._id },
                { $push: { cart: itemId } }
            );

            await User.findOneAndUpdate(
                { _id: context.user._id },
                { $set: { cartTotal: cartTotal + parseInt(price) } }
            );

            await Listing.findOneAndUpdate(
                { _id: itemId },
                {$set:{stock:stock-1}}
            )

        }
    }

}

module.exports = resolvers;

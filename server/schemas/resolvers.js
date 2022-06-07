const { AuthenticationError } = require('apollo-server-express');
const { User, Listing } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (parent, { email }) => {
            return User.findOne({ email });
        },
        listings: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Listing.find(params).sort({ createdAt: -1 });
        },
        listing: async (parent, { username }) => {
            return Listing.find({ username});
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
    }

}

module.exports = resolvers;

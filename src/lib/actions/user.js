import User from '../models/user.model';
import { connect } from '../mongodb/mongoose';

export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username
) => {
  try {
    await connect();

    console.log("🔍 createOrUpdateUser inputs:", {
      id,
      first_name,
      last_name,
      image_url,
      email: email_addresses?.[0]?.email_address,
      username
    });

    if (!email_addresses?.[0]?.email_address) {
      throw new Error('Missing email address from Clerk');
    }

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          avatar: image_url,
          email: email_addresses[0].email_address,
          username,
        },
      },
      { new: true, upsert: true }
    );

    if (!user) {
      throw new Error('findOneAndUpdate returned null');
    }

    console.log("✅ Mongo user created/updated:", user);
    return user;
  } catch (error) {
    console.error('❌ Error creating or updating user:', error);
    throw error;
  }
};


// export const deleteUser = async (id) => {
//     try {
//         await connect();
//         await User.findOneAndDelete({ clerkId: id });
//     } catch (error) {
//         console.log('Error deleting user:', error);
//     }
// };
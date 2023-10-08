import { Publication } from '../db/publicationModel.js';
import { User } from '../db/userModel.js';

export const home = async(req, res) => {
    const { user } = req;

    const idUser = await User.findOne({ email: user }, { _id: 1, friends: 1 });

    const publications = await Publication.find({ idUser }, { __v: 0 });
    
    const publicationsFriends = await Publication.find({ idUser: { $in: idUser.friends } }, { __v: 0 });

    console.log(publicationsFriends);

    // const allPublications = [...publications, ...publicationsFriends];

    // allPublications.sort((a, b) => {
    //     return new Date(b.date) - new Date(a.date);
    // });

    res.response(publications, 'Access granted', 200);
}
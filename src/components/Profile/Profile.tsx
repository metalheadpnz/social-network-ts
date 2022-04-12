import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {storeType} from "../../redux/store";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


// type propsType = {
//     store: storeType
// }

const Profile: React.FC = (props) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    );
};

export default Profile;
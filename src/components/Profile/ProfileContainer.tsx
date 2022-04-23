import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from 'react-redux';
import {AppStateType} from "../../redux/store";
import {profileType, setUserProfileAC} from "../../redux/profile-reducer";
import {setFetching} from "../../redux/users-reducer";
import Preloader from "../common/Preloader";
import {useParams} from "react-router-dom";


type mapDispatchToPropsType = {
    setUserProfileAC: (profile: profileType) => void,
    setFetching: (set: boolean) => void
}

type mapStateToPropsType = {
    isFetching: boolean
}

type paramsType = { params: string | undefined }


class ProfileContainer extends React.Component <mapDispatchToPropsType & mapStateToPropsType & paramsType> {

    componentDidMount(): void {
        const params = this.props.params
        this.props.setFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${params ? params : '2'}`)
            .then(response => {
                this.props.setUserProfileAC(response.data)
                this.props.setFetching(false)
            })
    }

    render() {
        return (
            <>
                {this.props.isFetching
                    ? <Preloader/>
                    : <Profile/>}
            </>

        );
    }
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => (
    {
        isFetching: state.usersPage.isFetching,

    })

const mapDispatchToProps: mapDispatchToPropsType = {
    setUserProfileAC,
    setFetching
}


const ProfileFuncContainer = () => {
    const params = useParams()
    return <ConnectContainer params={params.userID}/>
}

const ConnectContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)

export default ProfileFuncContainer
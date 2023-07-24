import {atom} from 'recoil'
import { UserData } from '../userpage/UserHome'

interface MessagingState {
    myFriends: UserData[]
    currentFriend?: UserData
    friendsFetched: boolean
}

const defaultMessagingState: MessagingState = {
    myFriends: [],
    friendsFetched: false,
}

export const messagingState = atom<MessagingState>({
    key:'messageState',
    default:defaultMessagingState
})
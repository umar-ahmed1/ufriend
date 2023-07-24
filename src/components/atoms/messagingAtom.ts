import {atom} from 'recoil'
import { Message } from '../messaging/MessageBox'
import { UserData } from '../userpage/UserHome'

interface MessagingState {
    myFriends: UserData[]
    currentFriend?: UserData
    friendsFetched: boolean
    currentMessages: Message[]
}

const defaultMessagingState: MessagingState = {
    myFriends: [],
    currentMessages: [],
    friendsFetched: false,
}

export const messagingState = atom<MessagingState>({
    key:'messageState',
    default:defaultMessagingState
})
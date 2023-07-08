import {atom} from 'recoil'

export interface authModalState{
    open:boolean;
    view: 'login' | 'signup' | 'create account'
}

const defaultModalState: authModalState = {
    open:false,
    view:'login',
}

export const authModalState=atom<authModalState>({
    key:'authModalState',
    default:defaultModalState
})
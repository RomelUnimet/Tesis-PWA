import { types } from '../types/types'

export const storeCardTabScroll = (scroll) => {
    return {
        type: types.storeMemoScrollCardTab,
        payload: scroll
    }
}
export const storeProfileScroll = (scroll) => {
    return {
        type: types.storeMemoScrollProfile,
        payload: scroll
    }
}
export const storeCardMemoScroll = (card) => {
    return {
        type: types.storeCardMemo,
        payload: card
    }
}

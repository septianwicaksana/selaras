import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: true,
  asideShow: false,
  theme: 'dark',
}

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    changeState: (state = initialState, { type, ...rest }) => {
      switch (type) {
        case 'set':
          return { ...state, ...rest }
        default:
          return state
      }
    },
    changeSideBarShow: (state, action) => {
      state.sidebarShow = action.payload
    },
    changeAsideShow: (state, action) => {
      console.log(action.payload)
      state.asideShow = action.payload
    },
    changeThemeToLight: (state) => {
      state.theme = 'light'
    },
    changeThemeToDark: (state) => {
      state.theme = 'dark'
    },
  },
})

export const {
  changeState,
  changeSideBarShow,
  changeAsideShow,
  changeTheme,
  changeThemeToLight,
  changeThemeToDark,
} = tabsSlice.actions

export default tabsSlice.reducer

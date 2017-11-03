import * as types from '../mutation-types'

const state = {
  user: {},
  isAdmin: true
};

const getters = {
  userName: (state) => {
    return state.user.userName;
  },
  groupId: (state) => {
    return state.user.groupId
  },
  UUID: (state) => {
    return state.user.uuid
    // return 'TXL00000001'
  },
  userInfo: (state) => {
    return state.user
  }
};

const actions = {
  saveUserData({ commit, state }, userInfo) {
    localStorage.setItem('USER_DATA', JSON.stringify(userInfo));
    commit(types.USER_INIT_DATA, userInfo);
  },
  logout({ commit, state }) {
    localStorage.removeItem('USER_DATA');
    commit(types.USER_INIT_DATA, {});
  }
};

const mutations = {
  [types.USER_INIT_DATA](state, userInfo) {
    let role = userInfo.role;
    state.isAdmin = role == 1 ? true : false;
    state.user = userInfo
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

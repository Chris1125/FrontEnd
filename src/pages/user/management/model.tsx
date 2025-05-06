import { pageList } from './service';

export default {
  namespace: 'order',
  state: {
    list: [],
    pagination: {},
  },
  effects: {
    *pageList({ payload }, { call, put }) {
      const response = yield call(pageList, payload);
      console.log('111' + response);
      yield put({
        type: 'updateState',
        payload: {
          list: {
            data: response.datas,
          },
        },
      });
    },
  },
  reducers: {
    updateState(state, action) {
      const context = action.payload.restContext;
      return {
        ...state,
        data: {
          list: context.records,
          pagination: {
            total: context.total,
            pageSize: context.size,
            current: parseInt(`${context.current}`, 10) || 1,
          },
        },
      };
    },
  },
};

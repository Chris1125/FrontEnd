import { pageList } from './service';

export default {
  namespace: 'order',
  state: {
    list: [],
    pagination: {},
  },
  effects: {
    *pageList({ payload }: { payload: any }, { call, put }: { call: any, put: any }): Generator<any, void, any> {
      const response: any = yield call(pageList, payload);
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
    updateState(state: any, action: { payload: { restContext: any; }; }) {
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

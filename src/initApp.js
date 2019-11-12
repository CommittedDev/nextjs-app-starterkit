import {
  setApiInstance, setDispatch, setDefaultIdKey, setErrorHandler, setDefaultUpdateMethod,
} from 'net-provider';
import ApiService from 'src/services/api';
import { setDispatch as setNotificationDispatch } from 'src/services/notification/notification';
import logger from 'src/services/logger';

export default (props) => {
  setDefaultUpdateMethod('patch');
  setDefaultIdKey('_id');
  setErrorHandler((err) => logger.error(err));
  setDispatch(props.store.dispatch);
  setApiInstance(ApiService.getAxios());
  setNotificationDispatch(props.store.dispatch);
};

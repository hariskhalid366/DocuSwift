import {
  createNavigationContainerRef,
  CommonActions,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<any>();

let isReady = false;
const pendingActions: (() => void)[] = [];

export const setNavigationReady = () => {
  isReady = true;
  pendingActions.forEach(cb => cb());
  pendingActions.length = 0;
};

const run = (action: () => void) => {
  if (isReady && navigationRef.isReady()) {
    action();
  } else {
    pendingActions.push(action);
  }
};

export const navigate = (name: string, params?: object) =>
  run(() => navigationRef.dispatch(CommonActions.navigate(name, params)));

export const replace = (name: string, params?: object) =>
  run(() => navigationRef.dispatch(StackActions.replace(name, params)));

export const resetAndNavigate = (name: string) =>
  run(() =>
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name }],
      }),
    ),
  );

export const push = (name: string, params?: object) =>
  run(() => navigationRef.dispatch(StackActions.push(name, params)));

export const goBack = () =>
  run(() => {
    if (navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  });

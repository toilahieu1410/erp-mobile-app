import { CommonActions, NavigationContainerRef, ParamListBase } from '@react-navigation/native';
import React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef<ParamListBase>>();

export function navigate(name: string, params?: object) {
  navigationRef.current?.navigate(name, params);
}

export function resetNavigation(name: string, params?: object) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name, params }],
    })
  );
}
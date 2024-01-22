interface headerStyleProps {
  fontWeight:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  fontSize: number;
}

interface APPHEADER_Props {
  headerShown: boolean;
  headerStyle: headerStyleProps;
}
export const APPHEADER: APPHEADER_Props = {
  headerShown: true,
  headerStyle: {
    fontWeight: '400',
    fontSize: 18,
  },
};
//= ======================================================================

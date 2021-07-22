import styled from 'styled-components';
import {
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colorTextPrimary, colorPrimary, colorGrayLight } from '@colors';

const { OS } = Platform;

export const Container = styled(SafeAreaView)`
  background-color: ${(props) => props.bgColor || 'white'};
  display: flex;
  flex: 1;
`;

export const Wrapper = styled(View)`
  margin-bottom: 24px;
  margin-top: ${OS === 'android' ? 16 : 0}px;
  padding-horizontal: 16px;
`;

export const BrandLogo = styled(Image)`
  height: 200px;
  width: 200px;
  resize-mode: contain;
  align-self: center;
`;

export const SidebarLogo = styled(Image)`
  height: 200px;
  width: 200px;
  resize-mode: contain;
  align-self: center;
`;

export const GooleLogo = styled(Image)`
  height: 28px;
  width: 28px;
  resize-mode: contain;
`;

export const ImagePattern = styled(Image)`
  height: 300px;
  width: 80%;
  resize-mode: contain;
  margin-top: -120px;
  margin-left: -80px;
  transform: rotate(-12deg);
`;

export const EmptyImageContainer = styled(Image)`
  height: 64px;
  width: 64px;
  resize-mode: contain;
`;

export const NavHeader = styled(View)`
  display: flex;
  height: ${OS === 'android' ? 64 : 82}px;
  background-color: white;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  padding-top: ${OS === 'android' ? 16 : 34}px;
  shadow-color: black;
  shadow-opacity: 0.25;
  shadow-radius: 3px;
  elevation: ${(props) => props.shadow || 0};
`;

export const HeaderProfileImage = styled(Image)`
  height: ${(props) => props.size || 32}px;
  width: ${(props) => props.size || 32}px;
  resize-mode: cover;
  border-radius: ${(props) => props.size || 32}px;
`;

export const TextView = styled(Text)`
  color: ${(props) => props.color || colorTextPrimary};
  font-size: ${(props) => props.fontSize || 14}px;
  background-color: ${(props) => props.bgColor || 'transparent'};
  text-transform: ${(props) => props.textTransform || 'none'};
  text-align: ${(props) => props.textAlign || 'left'};
  font-weight: ${(props) => props.fontWeight || 'normal'};
  text-decoration: ${(props) => props.textDecorations || 'none'};
`;

export const Input = styled(TextInput)`
  height: 48px;
  border-width: 1px;
  border-style: solid;
  border-color: #c1c1c1;
  border-radius: 4px;
  padding-left: 16px;
  padding-right: 16px;
  font-size: 16px;
`;

export const PickerWrapper = styled(View)`
  height: 50px;
  background-color: #f8f8f8;
  border-width: 1px;
  border-style: solid;
  border-color: #c1c1c1;
  border-radius: 4px;
  padding-left: 8px;
  padding-right: 8px;
  font-size: 16px;
`;

export const Button = styled(Pressable)`
  height: 48px;
  background-color: ${(props) => props.bgColor || colorPrimary};
  border-radius: ${(props) => props.borderRadius || '4'}px;
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

export const InitialHolder = styled(View)`
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bgColor || colorPrimary};
  height: ${(props) => props.size || '60'}px;
  width: ${(props) => props.size || '60'}px;
  border-radius: ${(props) => props.size || '60'}px;
`;

export const Row = styled(View)`
  flex-direction: row;
  align-items: ${(props) => props.alignItems || 'flex-start'};
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  flex-wrap: wrap;
`;

export const Col = styled(View)`
  flex-direction: column;
`;

export const Divider = styled(View)`
  height: 1px;
  background-color: ${(props) => props.bgColor || colorGrayLight};
  margin-top: ${(props) => props.mt || 16}px;
  margin-bottom: ${(props) => props.mb || 16}px;
`;

export const Card = styled(View)`
  background-color: ${(props) => props.bgColor || 'white'};
  border-width: 0.5px;
  border-style: solid;
  padding: ${(props) => (props.noPadding ? 0 : props.padding || '16px')};
  border-color: ${colorGrayLight};
  border-radius: ${(props) => props.borderRadius || '4'}px;
  margin-bottom: ${(props) => props.marginBottom || '16'}px;
  overflow: hidden;
`;

export const Badge = styled(View)`
  padding-horizontal: ${(props) => props.px || 8}px;
  padding-vertical: ${(props) => props.py || 4}px;
  border-radius: ${(props) => props.rounded || 4}px;
  background-color: ${(props) => props.bgColor || colorPrimary};
  color: ${(props) => props.color || colorTextPrimary};
  align-items: center;
`;

export const VisibilityIcon = styled(TouchableOpacity)`
  position: absolute;
  right: 12px;
  top: 12px;
`;

export const DatesFilterContainer = styled(View)`
  padding: 32px;
`;

export const Utils = {
  m: (val) => ({ marign: val }),
  mt: (val) => ({ marginTop: val }),
  mb: (val) => ({ marginBottom: val }),
  ml: (val) => ({ marginLeft: val }),
  mr: (val) => ({ marginRight: val }),
  mx: (val) => ({ marginRight: val, marginLeft: val }),
  my: (val) => ({ marginTop: val, marginBottom: val }),
  p: (val) => ({ padding: val }),
  pt: (val) => ({ paddingTop: val }),
  pb: (val) => ({ paddingBottom: val }),
  pl: (val) => ({ paddingLeft: val }),
  pr: (val) => ({ paddingRight: val }),
  px: (val) => ({ paddingLeft: val, paddingRight: val }),
  py: (val) => ({ paddingTop: val, paddingBottom: val }),
  flex: (val) => ({ flex: val }),
  flexGrow: (val) => ({ flexGrow: val }),
  textAlign: (val) => ({ textAlign: val }),
  rounded: (val) => ({ borderRadius: val }),
  color: (val) => ({ color: val }),
  justifyContent: (val) => ({ justifyContent: val }),
  alignItems: (val) => ({ alignItems: val }),
  flexWrap: (val) => ({ flexWrap: val }),
  backgroundColor: (val) => ({ backgroundColor: val }),
  fontSize: (val) => ({ fontSize: val }),
  borderRadius: (val) => ({ borderRadius: val }),
  borderColor: (val) => ({ borderColor: val }),
  borderWidth: (val) => ({ borderWidth: val }),
  width: (val) => ({ width: val }),
  height: (val) => ({ height: val }),
  zIndex: (val) => ({ zIndex: val }),
};

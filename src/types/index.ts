import { TextStyle, ViewProps } from "react-native";

interface RecoverData extends User { }

interface SignInData extends User {
  password: string,
}

interface SignUpData extends User {
  password: string,
  confirmPass: string,
}

interface SessionButton {
  _id: string,
  icon: string,
  color: string,
  title: string,
  levels?: Level[],
  description: string,
}

interface Level {
  _id: string,
  _idSession: string,
  questions: Question[],
  level: "EASY" | "NORMAL" | "HARD",
}

interface Question {
  _id: string,
  options?: [],
  description: string,
  multipleOptions: boolean,
  type: "SUBJECTIVE" | "OBJECTIVE",
}

interface User {
  id: string,
  name: string,
  phone: string,
  email: string,
  picture: string,
  nickname: string,
  birthDate: string,
  accountStatus: string,

  collection: FigureProps[],
  achievements: AchievementProps[],

  wisdomLevel: number,
  experienceLevel: number,
  professionalismLevel: number,

  [key: string]: unknown,
}

interface TimelineItem {
  _id: string,
  year: number,
  data: TimelinePeriod[],
}

interface TimelinePeriod {
  _id: string,
  body: string,
  title: string,
  gallery?: AnyObjectWithPropImage[],
  when: { day: number, month: string },
}

interface AchievementBase {
  size?: number,
  achievement: AchievementProps,
}

interface Banner {
  thumb: string,
  action: () => void,
}

interface BannersProps {
  style?: ViewProps,
  banners: Banner[],
}

interface CollectionItemProps {
  size: number,
  image: string,
  onPress?: () => void,
}

interface ExpCardProps {
  icon: string,
  size?: number,
  bgColor: string,
  iconColor: string,
  circleColor: string,

  expType: string,
  expLevel: number,
}

interface HeaderProps {
  title?: string,
  goBack?: () => void,
}

interface HomeButtonProps {
  icon: string,
  color: string,
  label: string,
  height: number,
  horizontal?: boolean,
}

interface TabButtonProps {
  bg: string,
  icon: string,
  label: string,
  color: string,
  focused: boolean,
}

interface TextProps {
  children?: React.ReactNode,

  color?: string,

  fs?: number,
  fontSize?: number,

  lh?: number,
  lineHeight?: number,

  fw?: "LIGHT" | "REGULAR" | "MEDIUM" | "SEMIB" | "BOLD",
  fontWeight?: "LIGHT" | "REGULAR" | "MEDIUM" | "SEMIB" | "BOLD",

  ta?: "center" | "auto" | "left" | "right" | "justify" | undefined,
  textAlign?: "center" | "auto" | "left" | "right" | "justify" | undefined,

  numberOfLines?: number | undefined,

  style?: TextStyle
}

interface TimelineCardProps {
  isLast?: boolean,
  timelinePeriod: TimelinePeriod,
}

interface RenderImagesProps {
  gallery: AnyObjectWithPropImage[],
}

interface AnyObjectWithPropImage {
  image: string,
  [key: string]: unknown,
}

interface RenderGalleryProps {
  initialPage?: number,
  gallery?: Pick<AnyObjectWithPropImage, "image">[],
}

interface ToastProps {
  icon?: string,
  message: string,
  duration?: number,
  type?: "normal" | "success" | "warn" | "error",
}

interface AchievementProps {
  _id: string,
  name: string,
  image: string,
  quantity: number,
  description: string,
}

interface FigureProps {
  code: string,
  name: string,
  image: string,
}


export {
  User,
  Level,
  Banner,
  Question,
  TextProps,
  ToastProps,
  SignUpData,
  SignInData,
  FigureProps,
  RecoverData,
  HeaderProps,
  ExpCardProps,
  BannersProps,
  TimelineItem,
  SessionButton,
  TimelinePeriod,
  TabButtonProps,
  AchievementBase,
  HomeButtonProps,
  AchievementProps,
  TimelineCardProps,
  RenderImagesProps,
  RenderGalleryProps,
  CollectionItemProps,
  AnyObjectWithPropImage,
};
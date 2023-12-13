import { Timestamp } from "firebase/firestore";
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
  options?: string[],
  description: string,
  multipleOptions?: boolean,
  type: "SUBJECTIVE" | "OBJECTIVE",
}

interface Earnings {
  image: string,
  title?: string,
  type: "FIGURE" | "ACHIEVEMENT"
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

  solvedModules: {
    job: number,
    user: number,
    total: number,
    doubts: number,
    carrer: number,
    several: number,
    academic: number,
    evolution: number,
    recommendation: number,
  },

  solvedQuestions: {
    job: number,
    user: number,
    total: number,
    carrer: number,
    doubts: number,
    several: number,
    academic: number,
    evolution: number,
    recommendation: number,
  },

  createdAt: Timestamp,
  updatedAt: Timestamp,

  // [key: string]: unknown,
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
  color?: string,
  goBack?: () => void,
}

interface Section {
  id: string,
  user: string,
  xpType: number,
  experience: number,

  answeredBy?: string[],
  questions?: Question[],

  createdAt: Timestamp,
  updatedAt: Timestamp,

  answers?: string[][],


  level: "EASY" | "NORMAL" | "HARD",
  segment: "carrer" | "job" | "academic" | "evolution" | "doubts" | "user" | "recommendation" | "several",
}

interface SectionResolvingProps {
  icon: string,
  color: string,
  section: string,
}

interface HomeButtonProps {
  icon: string,
  color: string,
  label: string,
  height: number,
  description: string,
  horizontal?: boolean,
  segment: "carrer" | "job" | "academic" | "evolution" | "doubts" | "user" | "recommendation" | "several",
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
  id: string,
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

interface Module {
  id: string,
  icon: string,
  color: string,
  label: string,
  description: string,
  segment: "carrer" | "job" | "academic" | "evolution" | "doubts" | "user" | "recommendation" | "several",
}


export {
  User,
  Level,
  Banner,
  Section,
  Module,
  Earnings,
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
  SectionResolvingProps,
  AnyObjectWithPropImage,
};
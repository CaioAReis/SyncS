import { useState } from "react";
import { View } from "react-native";
import { List, Portal, Snackbar } from "react-native-paper";

import { Text } from "../components";
import { useAppTheme } from "../theme";
import { ToastProps } from "../types";

export function useToast() {
  const { colors } = useAppTheme();
  const [visible, setVisible] = useState(false);
  const [toastContent, setToastContent] = useState<ToastProps | null>(null);

  const onToggleToast = ({ message, type = "normal", duration, icon }: ToastProps) => {
    setVisible(true);
    setToastContent({ message, type, duration, icon });
  };

  const onDismissToast = () => setVisible(false);

  const typeOptions = {
    error: { iconColor: colors.red5, icon: "close-box", bgColor: colors.red1 },
    warn: { iconColor: colors.yellow5, icon: "alert-box", bgColor: colors.yellow1 },
    normal: { iconColor: colors.blue, icon: "information", bgColor: colors.background1 },
    success: { iconColor: colors.green5, icon: "checkbox-marked", bgColor: colors.green1 },
  };

  const Toast = () => (
    <Portal>
      <Snackbar
        visible={visible}
        onDismiss={onDismissToast}
        duration={toastContent?.duration || 4000}
        style={{
          bottom: 10,
          borderWidth: 1.5,
          marginHorizontal: 15,
          borderColor: typeOptions[toastContent?.type || "normal"].iconColor,
          backgroundColor: typeOptions[toastContent?.type || "normal"].bgColor,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {(toastContent?.icon || toastContent?.type) && (
            <List.Icon
              style={{ marginRight: 8 }}
              color={typeOptions[toastContent?.type || "normal"].iconColor}
              icon={toastContent?.icon || typeOptions[toastContent?.type || "normal"].icon}
            />
          )}

          <Text fw="BOLD" fs={14}>{toastContent?.message}</Text>
        </View>
      </Snackbar>
    </Portal>
  );

  return { Toast, onToggleToast };
}
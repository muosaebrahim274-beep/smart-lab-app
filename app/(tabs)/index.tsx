import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View, Text, Pressable } from "react-native";
import { WebView } from "react-native-webview";

import { ScreenContainer } from "@/components/screen-container";

const SMART_LAB_URL = "https://9000-firebase-studio-1772593067175.cluster-lu4mup47g5gm4rtyvhzpwbfadi.cloudworkstations.dev";

export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLoadStart = () => {
    setIsLoading(true);
    setError(null);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    setError(nativeEvent.description || "حدث خطأ في تحميل الصفحة");
    setIsLoading(false);
  };

  const handleReload = () => {
    webViewRef.current?.reload();
  };

  if (error) {
    return (
      <ScreenContainer className="flex items-center justify-center p-6">
        <View className="items-center gap-4">
          <Text className="text-2xl font-bold text-foreground">خطأ في الاتصال</Text>
          <Text className="text-base text-muted text-center">{error}</Text>
          <Pressable
            onPress={handleReload}
            className="bg-primary px-6 py-3 rounded-full"
          >
            <Text className="text-white font-semibold">إعادة محاولة</Text>
          </Pressable>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <View className="flex-1 bg-background">
      {isLoading && (
        <View className="absolute inset-0 flex items-center justify-center bg-background z-50">
          <ActivityIndicator size="large" color="#0a7ea4" />
        </View>
      )}
      <WebView
        ref={webViewRef}
        source={{ uri: SMART_LAB_URL }}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        style={{ flex: 1 }}
      />
    </View>
  );
}

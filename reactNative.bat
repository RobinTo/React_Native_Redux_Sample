@ECHO ON

start cmd /c adb devices

start cmd /c adb reverse tcp:8081 tcp:8081

start cmd /c adb logcat *:S ReactNative:V ReactNativeJS:V

start cmd /c react-native run-android

start cmd /c react-native start


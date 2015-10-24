source ~/.bash_profile
cd ~/Projects/badi-calendar/mobile

# Add key to deploy
  # keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000

# Build the project
  ionic build android --release

# Sign APK
  jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms/android/ant-build/CordovaApp-release-unsigned.apk alias_name

# Zipalign the APK
  ~/Custom\ programs/android-sdk-linux/build-tools/20.0.0/zipalign -v 4 platforms/android/ant-build/CordovaApp-release-unsigned.apk platforms/android/ant-build/BadiCalendar.apk

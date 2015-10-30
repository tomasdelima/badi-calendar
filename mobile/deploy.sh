source ~/.bash_profile
cd ~/Projects/badi-calendar/mobile/platforms/android/build/outputs/apk/

# Add key to deploy
  # keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000

# Build the project
  ionic build android --release

# Sign APK
  jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android-release-unsigned.apk alias_name

# Zipalign the APK
  mv BadiCalendar.apk BadiCalendar-old.apk
  zipalign -v 4 android-release-unsigned.apk BadiCalendar.apk

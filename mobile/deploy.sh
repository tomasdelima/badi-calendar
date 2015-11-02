source ~/.bash_profile

# Add key to deploy
# keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000

# Build the project
cd ~/Projects/badi-calendar/mobile/
ionic build android --release
cd ~/Projects/badi-calendar/mobile/platforms/android/build/outputs/apk/

# Sign APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android-release-unsigned.apk alias_name

# Zipalign the APK
mv BadiCalendar.apk BadiCalendar-old.apk
~/Custom\ programs/android-sdk-linux/build-tools/20.0.0/zipalign -v 4 android-release-unsigned.apk BadiCalendar.apk

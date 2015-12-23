source ~/.bash_profile

# Add key to deploy
# keytool -genkey -v -keystore badi-calendar.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000

# Build the project
cd ~/Projects/badi-calendar/mobile/
ionic build android --release

APK_PATH=~/Projects/badi-calendar/mobile/platforms/android/build/outputs/apk

# Sign APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore badi-calendar.keystore $APK_PATH/android-release-unsigned.apk alias_name

# Zipalign the APK
mv $APK_PATH/BadiCalendar.apk $APK_PATH/BadiCalendar-old.apk 2> /dev/null
zipalign -v 4 $APK_PATH/android-release-unsigned.apk $APK_PATH/BadiCalendar.apk

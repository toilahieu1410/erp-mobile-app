package com.app_hoplonglms

import android.os.Bundle
import android.content.res.Configuration
import java.util.Locale
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import org.devio.rn.splashscreen.SplashScreen

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "App_HopLongLMS"

  override fun createReactActivityDelegate(): ReactActivityDelegate =
    DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    SplashScreen.show(this)


    val currentLocale = resources.configuration.locales.get(0)
    val targetLocale = Locale("en")

    if (currentLocale != targetLocale) {
      Locale.setDefault(targetLocale)
      val config = Configuration()
      config.setLocale(targetLocale)
      resources.updateConfiguration(config, resources.displayMetrics)
    }
  }
}

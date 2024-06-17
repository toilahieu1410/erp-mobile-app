package com.app_hoplonglms


import android.view.View
import android.view.ViewGroup
import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.action.ViewActions.*
import androidx.test.espresso.assertion.ViewAssertions.*
import androidx.test.espresso.matcher.ViewMatchers.*
import androidx.test.ext.junit.rules.ActivityScenarioRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.filters.LargeTest
import org.hamcrest.Description
import org.hamcrest.Matcher
import org.hamcrest.Matchers.allOf
import org.hamcrest.Matchers.`is`
import org.hamcrest.TypeSafeMatcher
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@LargeTest
@RunWith(AndroidJUnit4::class)
class MainActivityTest2 {

    @Rule
    @JvmField
    var mActivityScenarioRule = ActivityScenarioRule(MainActivity::class.java)

    @Test
    fun mainActivityTest2() {
        val reactEditText = onView(
            allOf(
                childAtPosition(
                    childAtPosition(
                        withClassName(`is`("com.facebook.react.views.view.ReactViewGroup")),
                        1
                    ),
                    0
                ),
                isDisplayed()
            )
        )
        reactEditText.perform(click())

        val reactEditText2 = onView(
            allOf(
                childAtPosition(
                    childAtPosition(
                        withClassName(`is`("com.facebook.react.views.view.ReactViewGroup")),
                        1
                    ),
                    0
                ),
                isDisplayed()
            )
        )
        reactEditText2.perform(replaceText("testdata"), closeSoftKeyboard())

        val reactEditText3 = onView(
            allOf(
                childAtPosition(
                    childAtPosition(
                        withClassName(`is`("com.facebook.react.views.view.ReactViewGroup")),
                        1
                    ),
                    0
                ),
                isDisplayed()
            )
        )
        reactEditText3.perform(click())

        val reactEditText4 = onView(
            allOf(
                childAtPosition(
                    childAtPosition(
                        withClassName(`is`("com.facebook.react.views.view.ReactViewGroup")),
                        1
                    ),
                    0
                ),
                isDisplayed()
            )
        )
        reactEditText4.perform(replaceText("1234aA@"), closeSoftKeyboard())
    }

    private fun childAtPosition(
        parentMatcher: Matcher<View>, position: Int
    ): Matcher<View> {

        return object : TypeSafeMatcher<View>() {
            override fun describeTo(description: Description) {
                description.appendText("Child at position $position in parent ")
                parentMatcher.describeTo(description)
            }

            public override fun matchesSafely(view: View): Boolean {
                val parent = view.parent
                return parent is ViewGroup && parentMatcher.matches(parent)
                        && view == parent.getChildAt(position)
            }
        }
    }
}

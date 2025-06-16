import React, { useState } from 'react';
import BackgroundAnimation from '../../common/BackgroundAnimation';
import AuthHeader from '../../common/AuthHeader';
import AuthToogle from './AuthToogle';
import AuthAction from './AuthAction';
import AuthFooter from './AuthFooter';
import SignupFeature from './SignupFeature';
import ComingSoonBanner from '../../common/ComingSoon';

/**
 * AuthPages Component
 * 
 * This component renders a full authentication page layout that includes:
 * - A beautiful animated background
 * - Dynamic header and toggle between Signup and Login
 * - Form handling for Signup/Login with Password or OTP
 * - Additional footer and features for Signup
 * 
 * It uses local state to control:
 * - `currentPage`: whether the user is on 'signup' or 'login'
 * - `loginMethod`: 'password' or 'otp' for login type
 * - `formData`: form field values
 * 
 * Subcomponents:
 * - BackgroundAnimation: for animated background shapes
 * - AuthHeader: displays current page & method info
 * - AuthToogle: allows switching between signup & login
 * - AuthAction: the form and its actions
 * - AuthFooter: shows navigation footer
 * - SignupFeature: shows extra info when signing up
 */

const AuthPages = ({currentPage, loginMethod, setCurrentPage, handleSubmit, formData, setLoginMethod, handleInputChange, isloading, loginaction = 'signup'}) => {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 ">
      {/* Animated moving background elements */}
      <BackgroundAnimation />

      <div className="max-w-md w-full mx-4 relative z-10 my-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
          
          {/* Top header showing title and login method */}
          <AuthHeader currentPage={currentPage} loginMethod={loginMethod} />

          {/* Toggle switch to switch between Signup and Login */}
          <AuthToogle currentPage={currentPage} setCurrentPage={setCurrentPage} />
          
          {/* Main form actions and inputs */}
          <AuthAction
            currentPage={currentPage}
            loginMethod={loginMethod}
            handleSubmit={handleSubmit}
            formData={formData}
            setLoginMethod={setLoginMethod}
            handleInputChange={handleInputChange}
            isloading={isloading}
          />

          {/* Footer with link to switch pages */}
          <AuthFooter currentPage={currentPage} setCurrentPage={setCurrentPage} />

          {/* Extra signup info/features visible only on signup */}
          {currentPage === 'signup' && <SignupFeature />}
        </div>
        {/* Decorative gradient blobs in corners */}
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl opacity-20 animate-pulse -z-10"></div>
        <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-gradient-to-r from-orange-400 to-pink-400 rounded-3xl opacity-20 animate-pulse -z-10"></div>
      
      </div>
        {/* <ComingSoonBanner
          text1={"Welcome back! We’re almost ready to help you manage your shop effortlessly."}
          text2={"Sign in soon and experience a smoother, smarter way to run your business."}
        /> */}

    </section>
  );
};

export default AuthPages;

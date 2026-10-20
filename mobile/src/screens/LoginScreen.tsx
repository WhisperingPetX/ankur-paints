import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { Palette, Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing, Radii, Shadows } from '../constants/spacing';

export const LoginScreen: React.FC = () => {
  const { signInWithPassword, signInWithPhoneOtp, verifyPhoneOtp, isLoading } = useAuth();
  const [authMode, setAuthMode] = useState<'password' | 'otp'>('password');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePasswordLogin = async () => {
    setErrorMessage(null);
    if (!phoneOrEmail.trim() || !password.trim()) {
      setErrorMessage('Please enter both Phone/Email and Password.');
      return;
    }

    const result = await signInWithPassword(phoneOrEmail.trim(), password.trim());
    if (!result.success) {
      setErrorMessage(result.error || 'Invalid credentials.');
    }
  };

  const handleSendOtp = async () => {
    setErrorMessage(null);
    if (!phoneOrEmail.trim()) {
      setErrorMessage('Please enter your 10-digit mobile number.');
      return;
    }

    // Format phone with +91 if 10 digits
    let formattedPhone = phoneOrEmail.trim();
    if (/^\d{10}$/.test(formattedPhone)) {
      formattedPhone = `+91${formattedPhone}`;
    }

    const result = await signInWithPhoneOtp(formattedPhone);
    if (result.success) {
      setIsOtpSent(true);
    } else {
      setErrorMessage(result.error || 'Failed to send OTP.');
    }
  };

  const handleVerifyOtp = async () => {
    setErrorMessage(null);
    if (!otpCode.trim() || otpCode.length < 4) {
      setErrorMessage('Please enter the 6-digit OTP sent to your phone.');
      return;
    }

    let formattedPhone = phoneOrEmail.trim();
    if (/^\d{10}$/.test(formattedPhone)) {
      formattedPhone = `+91${formattedPhone}`;
    }

    const result = await verifyPhoneOtp(formattedPhone, otpCode.trim());
    if (!result.success) {
      setErrorMessage(result.error || 'Invalid OTP. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={Palette.ankurBlueDark} />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Brand Header */}
        <View style={styles.header}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoTextAnkur}>ANKUR</Text>
            <Text style={styles.logoTextPaints}>PAINTS</Text>
          </View>
          <Text style={styles.tagline}>Official Retailer Partner Portal</Text>

          {/* Flipkart-Style Promotional Hook */}
          <View style={styles.promoBanner}>
            <Text style={styles.promoIcon}>🎉</Text>
            <Text style={styles.promoText}>
              <Text style={styles.promoBold}>Diwali Dhamaka Live: </Text>
              Earn up to 15% extra cashback on every bucket scanned!
            </Text>
          </View>
        </View>

        {/* Login Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Retailer Partner Login</Text>
          <Text style={styles.cardSubtitle}>
            Scan stock, log customer sales, and track instant incentives.
          </Text>

          {/* Tab Selector */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, authMode === 'password' && styles.activeTab]}
              onPress={() => {
                setAuthMode('password');
                setErrorMessage(null);
              }}
            >
              <Text style={[styles.tabText, authMode === 'password' && styles.activeTabText]}>
                Password
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, authMode === 'otp' && styles.activeTab]}
              onPress={() => {
                setAuthMode('otp');
                setErrorMessage(null);
              }}
            >
              <Text style={[styles.tabText, authMode === 'otp' && styles.activeTabText]}>
                Quick OTP
              </Text>
            </TouchableOpacity>
          </View>

          {/* Error Alert */}
          {errorMessage && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}

          {/* Input: Phone or Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {authMode === 'password' ? 'Registered Mobile Number or Email' : 'Mobile Number'}
            </Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputPrefix}>+91</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter 10-digit mobile number"
                placeholderTextColor={Palette.textMuted}
                keyboardType="phone-pad"
                value={phoneOrEmail}
                onChangeText={setPhoneOrEmail}
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password Mode */}
          {authMode === 'password' && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.inputSingle}
                placeholder="Enter your account password"
                placeholderTextColor={Palette.textMuted}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          )}

          {/* OTP Mode */}
          {authMode === 'otp' && isOtpSent && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Enter 6-Digit OTP</Text>
              <TextInput
                style={[styles.inputSingle, styles.otpInput]}
                placeholder="••••••"
                placeholderTextColor={Palette.textMuted}
                keyboardType="number-pad"
                maxLength={6}
                value={otpCode}
                onChangeText={setOtpCode}
              />
            </View>
          )}

          {/* Action Button */}
          <TouchableOpacity
            style={styles.submitBtn}
            disabled={isLoading}
            onPress={
              authMode === 'password'
                ? handlePasswordLogin
                : isOtpSent
                ? handleVerifyOtp
                : handleSendOtp
            }
          >
            {isLoading ? (
              <ActivityIndicator color={Palette.white} />
            ) : (
              <Text style={styles.submitBtnText}>
                {authMode === 'password'
                  ? 'Sign In to Store'
                  : isOtpSent
                  ? 'Verify OTP & Enter'
                  : 'Send Login OTP'}
              </Text>
            )}
          </TouchableOpacity>

          {/* Demo Hint */}
          <View style={styles.demoFooter}>
            <Text style={styles.demoHintText}>
              Need retailer account setup? Contact your Ankur Paints Area Sales Manager.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.ankurBlue,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radii.pill,
    marginBottom: Spacing.xs,
    ...Shadows.card,
  },
  logoTextAnkur: {
    ...Typography.h2,
    color: Palette.ankurBlue,
    fontWeight: '900',
    letterSpacing: 2,
  },
  logoTextPaints: {
    ...Typography.h2,
    color: Palette.paintsOrange,
    fontWeight: '900',
    letterSpacing: 2,
    marginLeft: 6,
  },
  tagline: {
    ...Typography.bodySm,
    color: Palette.goldLight,
    fontWeight: '600',
    marginTop: 4,
  },
  promoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(232, 80, 30, 0.25)',
    borderWidth: 1,
    borderColor: Palette.paintsOrangeLight,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    marginTop: Spacing.md,
  },
  promoIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  promoText: {
    ...Typography.caption,
    color: Palette.white,
    flexShrink: 1,
  },
  promoBold: {
    fontWeight: '700',
    color: Palette.goldLight,
  },
  card: {
    backgroundColor: Palette.white,
    borderRadius: Radii.xl,
    padding: Spacing.xl,
    ...Shadows.elevated,
  },
  cardTitle: {
    ...Typography.h2,
    color: Palette.textPrimary,
  },
  cardSubtitle: {
    ...Typography.bodySm,
    color: Palette.textSecondary,
    marginTop: 4,
    marginBottom: Spacing.lg,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Palette.surfaceAlt,
    borderRadius: Radii.md,
    padding: 3,
    marginBottom: Spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: Radii.sm,
  },
  activeTab: {
    backgroundColor: Palette.white,
    ...Shadows.card,
  },
  tabText: {
    ...Typography.caption,
    color: Palette.textSecondary,
    fontWeight: '600',
  },
  activeTabText: {
    color: Palette.ankurBlue,
    fontWeight: '700',
  },
  errorBox: {
    backgroundColor: Palette.errorLight,
    padding: Spacing.sm,
    borderRadius: Radii.sm,
    marginBottom: Spacing.md,
  },
  errorText: {
    ...Typography.caption,
    color: Palette.errorDark,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: Spacing.md,
  },
  inputLabel: {
    ...Typography.caption,
    color: Palette.textPrimary,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Palette.border,
    borderRadius: Radii.md,
    backgroundColor: Palette.surfaceAlt,
  },
  inputPrefix: {
    ...Typography.body,
    fontWeight: '700',
    color: Palette.textPrimary,
    paddingHorizontal: Spacing.md,
    borderRightWidth: 1,
    borderColor: Palette.border,
  },
  input: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    ...Typography.body,
    color: Palette.textPrimary,
  },
  inputSingle: {
    borderWidth: 1.5,
    borderColor: Palette.border,
    borderRadius: Radii.md,
    backgroundColor: Palette.surfaceAlt,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    ...Typography.body,
    color: Palette.textPrimary,
  },
  otpInput: {
    textAlign: 'center',
    letterSpacing: 10,
    fontSize: 22,
    fontWeight: '800',
  },
  submitBtn: {
    backgroundColor: Palette.paintsOrange,
    paddingVertical: Spacing.md,
    borderRadius: Radii.pill,
    alignItems: 'center',
    marginTop: Spacing.md,
    ...Shadows.elevated,
  },
  submitBtnText: {
    ...Typography.button,
    color: Palette.white,
    letterSpacing: 0.5,
  },
  demoFooter: {
    marginTop: Spacing.lg,
    alignItems: 'center',
  },
  demoHintText: {
    ...Typography.caption,
    color: Palette.textMuted,
    textAlign: 'center',
  },
});

// components/ui/AnimatedComponents.tsx
// Komponen animasi yang reusable untuk membuat UI lebih interaktif

import React, { useEffect } from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import Animated, {
    BounceIn,
    Easing,
    FadeIn,
    FadeInDown,
    FadeInLeft,
    FadeInRight,
    FadeInUp,
    FlipInXUp,
    interpolate,
    SlideInDown,
    SlideInUp,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withSpring,
    withTiming,
    ZoomIn
} from 'react-native-reanimated';

// ==================== FADE IN COMPONENT ====================
interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
}

export const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  delay = 0,
  duration = 500,
  style,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration }));
    translateY.value = withDelay(
      delay,
      withSpring(0, { damping: 15, stiffness: 100 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

// ==================== SCALE ON PRESS ====================
interface ScalePressableProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  scaleValue?: number;
  disabled?: boolean;
}

export const ScalePressable: React.FC<ScalePressableProps> = ({
  children,
  onPress,
  style,
  scaleValue = 0.95,
  disabled = false,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(scaleValue, { damping: 15, stiffness: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled}
    >
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </Pressable>
  );
};

// ==================== BOUNCE CARD ====================
interface BounceCardProps {
  children: React.ReactNode;
  delay?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const BounceCard: React.FC<BounceCardProps> = ({
  children,
  delay = 0,
  style,
  onPress,
}) => {
  const scale = useSharedValue(0);
  const pressScale = useSharedValue(1);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withSpring(1, { damping: 12, stiffness: 100 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value * pressScale.value },
    ],
    opacity: interpolate(scale.value, [0, 1], [0, 1]),
  }));

  const handlePressIn = () => {
    pressScale.value = withSpring(0.97, { damping: 15, stiffness: 200 });
  };

  const handlePressOut = () => {
    pressScale.value = withSpring(1, { damping: 15, stiffness: 200 });
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </Pressable>
  );
};

// ==================== ANIMATED PROGRESS BAR ====================
interface AnimatedProgressProps {
  progress: number; // 0-100
  color?: string;
  backgroundColor?: string;
  height?: number;
  delay?: number;
  style?: StyleProp<ViewStyle>;
}

export const AnimatedProgress: React.FC<AnimatedProgressProps> = ({
  progress,
  color = '#3b82f6',
  backgroundColor = 'rgba(59, 130, 246, 0.2)',
  height = 8,
  delay = 0,
  style,
}) => {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withDelay(
      delay,
      withSpring(progress, { damping: 15, stiffness: 50 })
    );
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
    height: '100%',
    backgroundColor: color,
    borderRadius: height / 2,
  }));

  return (
    <Animated.View
      style={[
        {
          height,
          backgroundColor,
          borderRadius: height / 2,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View style={animatedStyle} />
    </Animated.View>
  );
};

// ==================== ANIMATED COUNTER ====================
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: any;
  suffix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1000,
  style,
  textStyle,
  suffix = '',
}) => {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withTiming(value, {
      duration,
      easing: Easing.out(Easing.cubic),
    });
  }, [value]);

  const animatedProps = useAnimatedStyle(() => {
    return {};
  });

  // For counter we'll use a simpler approach with reanimated
  return (
    <Animated.View style={style}>
      <AnimatedCounterText
        value={value}
        duration={duration}
        textStyle={textStyle}
        suffix={suffix}
      />
    </Animated.View>
  );
};

// Helper component for animated counter text
const AnimatedCounterText: React.FC<{
  value: number;
  duration: number;
  textStyle?: any;
  suffix: string;
}> = ({ value, duration, textStyle, suffix }) => {
  const [displayValue, setDisplayValue] = React.useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(easeProgress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [value, duration]);

  return (
    <Animated.Text style={textStyle}>
      {displayValue}
      {suffix}
    </Animated.Text>
  );
};

// ==================== STAGGER CHILDREN ====================
interface StaggerContainerProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  style?: StyleProp<ViewStyle>;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 100,
  style,
}) => {
  return (
    <Animated.View style={style}>
      {React.Children.map(children, (child, index) => (
        <FadeInView delay={index * staggerDelay} key={index}>
          {child}
        </FadeInView>
      ))}
    </Animated.View>
  );
};

// ==================== PULSE ANIMATION ====================
interface PulseViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  pulseScale?: number;
  duration?: number;
}

export const PulseView: React.FC<PulseViewProps> = ({
  children,
  style,
  pulseScale = 1.05,
  duration = 1500,
}) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSequence(
      withTiming(pulseScale, { duration: duration / 2 }),
      withTiming(1, { duration: duration / 2 })
    );

    const interval = setInterval(() => {
      scale.value = withSequence(
        withTiming(pulseScale, { duration: duration / 2 }),
        withTiming(1, { duration: duration / 2 })
      );
    }, duration);

    return () => clearInterval(interval);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

// ==================== SHAKE ANIMATION ====================
interface ShakeViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  trigger?: boolean;
}

export const ShakeView: React.FC<ShakeViewProps> = ({
  children,
  style,
  trigger,
}) => {
  const translateX = useSharedValue(0);

  useEffect(() => {
    if (trigger) {
      translateX.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    }
  }, [trigger]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

// ==================== FLOATING ANIMATION ====================
interface FloatingViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  floatDistance?: number;
  duration?: number;
}

export const FloatingView: React.FC<FloatingViewProps> = ({
  children,
  style,
  floatDistance = 10,
  duration = 2000,
}) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    const animate = () => {
      translateY.value = withSequence(
        withTiming(-floatDistance, { duration: duration / 2, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: duration / 2, easing: Easing.inOut(Easing.ease) })
      );
    };

    animate();
    const interval = setInterval(animate, duration);

    return () => clearInterval(interval);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

// ==================== GLOW EFFECT ====================
interface GlowCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  glowColor?: string;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  style,
  glowColor = '#3b82f6',
}) => {
  const glowOpacity = useSharedValue(0.3);

  useEffect(() => {
    const animate = () => {
      glowOpacity.value = withSequence(
        withTiming(0.6, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      );
    };

    animate();
    const interval = setInterval(animate, 2000);

    return () => clearInterval(interval);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    shadowColor: glowColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: glowOpacity.value,
    shadowRadius: 20,
    elevation: 10,
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

// ==================== SLIDE IN LIST ITEM ====================
interface SlideInItemProps {
  children: React.ReactNode;
  index: number;
  style?: StyleProp<ViewStyle>;
}

export const SlideInItem: React.FC<SlideInItemProps> = ({
  children,
  index,
  style,
}) => {
  const translateX = useSharedValue(100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withDelay(
      index * 80,
      withSpring(0, { damping: 15, stiffness: 100 })
    );
    opacity.value = withDelay(index * 80, withTiming(1, { duration: 300 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

// ==================== ROTATE ON TAP ====================
interface RotateTapProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const RotateTap: React.FC<RotateTapProps> = ({
  children,
  style,
  onPress,
}) => {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));

  const handlePress = () => {
    rotation.value = withSequence(
      withTiming(15, { duration: 100 }),
      withTiming(-15, { duration: 100 }),
      withSpring(0, { damping: 10 })
    );
    onPress?.();
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </Pressable>
  );
};

// Export built-in entering animations for easy use
export const EnteringAnimations = {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  SlideInDown,
  SlideInUp,
  ZoomIn,
  BounceIn,
  FlipInXUp,
};

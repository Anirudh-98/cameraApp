import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { InfraredDetectionScreenProps } from '../types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface BrightSpot {
  x: number;
  y: number;
  intensity: number;
  size: number;
  pattern: string;
}

interface CameraSettings {
  iso: number;
  exposure: number;
  whiteBalance: number;
}

const InfraredDetectionScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [detectedSpots, setDetectedSpots] = useState<BrightSpot[]>([]);
  const [sensitivity, setSensitivity] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);
  const [cameraSettings, setCameraSettings] = useState<CameraSettings>({
    iso: 800,
    exposure: -2,
    whiteBalance: 0,
  });
  const [previousFrame, setPreviousFrame] = useState<string | null>(null);
  const [detectionMode, setDetectionMode] = useState<'ir' | 'motion' | 'pattern'>('ir');
  const [motionThreshold, setMotionThreshold] = useState(0.3);
  const [patternThreshold, setPatternThreshold] = useState(0.6);
  const cameraRef = useRef<any>(null);
  const navigation = useNavigation<InfraredDetectionScreenProps>();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/alert.mp3')
      );
      setSound(sound);
    })();
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const processFrame = async (frame: any) => {
    try {
      let brightSpots: BrightSpot[] = [];

      switch (detectionMode) {
        case 'ir':
          brightSpots = await detectBrightSpots(frame.uri);
          break;
        case 'motion':
          brightSpots = await detectMotion(frame.uri);
          break;
        case 'pattern':
          brightSpots = await detectPatterns(frame.uri);
          break;
      }

      setDetectedSpots(brightSpots);

      if (brightSpots.length > 0) {
        const confidence = calculateConfidence(brightSpots);
        if (confidence > 0.7) {
          Alert.alert(
            'Camera Detected!',
            `Found ${brightSpots.length} potential camera${brightSpots.length > 1 ? 's' : ''} with ${Math.round(confidence * 100)}% confidence.`,
            [{ text: 'OK' }]
          );

          if (sound) {
            await sound.replayAsync();
          }
        }
      }

      setPreviousFrame(frame.uri);
    } catch (error) {
      console.error('Error processing frame:', error);
    }
  };

  const detectBrightSpots = async (imageUri: string): Promise<BrightSpot[]> => {
    const brightSpots: BrightSpot[] = [];
    
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const reader = new FileReader();
      
      reader.onload = () => {
        const base64 = reader.result as string;
        const img = new Image();
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Enhanced IR detection algorithm
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // IR light typically appears as bright red
            const isIR = r > 200 && g < 100 && b < 100;
            const brightness = (r + g + b) / 3;
            
            if ((isIR || brightness > 255 * sensitivity) && isClusterBright(data, i, canvas.width)) {
              const x = (i / 4) % canvas.width;
              const y = Math.floor((i / 4) / canvas.width);
              const size = measureSpotSize(data, i, canvas.width);
              
              brightSpots.push({
                x: x / canvas.width,
                y: y / canvas.height,
                intensity: brightness / 255,
                size,
                pattern: detectPattern(data, i, canvas.width),
              });
            }
          }
        };
        
        img.src = base64;
      };
      
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error processing image:', error);
    }
    
    return brightSpots;
  };

  const detectMotion = async (currentFrame: string): Promise<BrightSpot[]> => {
    if (!previousFrame) return [];
    
    const spots: BrightSpot[] = [];
    // Implement motion detection by comparing current and previous frames
    // This is a simplified version - in a real app, you'd use more sophisticated
    // motion detection algorithms like optical flow
    return spots;
  };

  const detectPatterns = async (imageUri: string): Promise<BrightSpot[]> => {
    const spots: BrightSpot[] = [];
    // Implement pattern recognition to detect common camera patterns
    // This could include lens patterns, IR LED arrays, etc.
    return spots;
  };

  const isClusterBright = (data: Uint8ClampedArray, index: number, width: number): boolean => {
    // Check if the bright pixel is part of a cluster (reduces false positives)
    const clusterSize = 3;
    let brightCount = 0;
    
    for (let i = -clusterSize; i <= clusterSize; i++) {
      for (let j = -clusterSize; j <= clusterSize; j++) {
        const idx = index + (i * width + j) * 4;
        if (idx >= 0 && idx < data.length) {
          const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
          if (brightness > 200) brightCount++;
        }
      }
    }
    
    return brightCount > (clusterSize * 2 + 1) * (clusterSize * 2 + 1) * 0.5;
  };

  const measureSpotSize = (data: Uint8ClampedArray, index: number, width: number): number => {
    // Measure the size of the bright spot
    let size = 0;
    const threshold = 200;
    
    for (let i = -5; i <= 5; i++) {
      for (let j = -5; j <= 5; j++) {
        const idx = index + (i * width + j) * 4;
        if (idx >= 0 && idx < data.length) {
          const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
          if (brightness > threshold) size++;
        }
      }
    }
    
    return size / 121; // Normalize to 0-1
  };

  const detectPattern = (data: Uint8ClampedArray, index: number, width: number): string => {
    // Detect common camera patterns (lens, LED array, etc.)
    // This is a simplified version - in a real app, you'd use more sophisticated
    // pattern recognition algorithms
    return 'unknown';
  };

  const calculateConfidence = (spots: BrightSpot[]): number => {
    // Calculate overall detection confidence based on multiple factors
    let confidence = 0;
    
    spots.forEach(spot => {
      // Consider intensity, size, and pattern
      confidence += (spot.intensity * 0.4 + spot.size * 0.3 + 0.3) / spots.length;
    });
    
    return confidence;
  };

  const startDetection = () => {
    setIsDetecting(true);
    setDetectedSpots([]);
    setPreviousFrame(null);
    
    const interval = setInterval(async () => {
      if (cameraRef.current && isDetecting) {
        try {
          const frame = await cameraRef.current.takePictureAsync({
            quality: 0.5,
            base64: true,
            exif: true,
          });
          await processFrame(frame);
        } catch (error) {
          console.error('Error capturing frame:', error);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  const stopDetection = () => {
    setIsDetecting(false);
  };

  const adjustSensitivity = (increment: number) => {
    setSensitivity(prev => Math.max(0.1, Math.min(0.9, prev + increment)));
  };

  const updateCameraSettings = (setting: keyof CameraSettings, value: number) => {
    setCameraSettings(prev => ({
      ...prev,
      [setting]: value,
    }));
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No access to camera</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Camera.requestCameraPermissionsAsync()}
        >
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* @ts-ignore */}
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={0}
      >
        <View style={styles.overlay}>
          <View style={styles.controls}>
            <TouchableOpacity
              style={[styles.button, styles.sensitivityButton]}
              onPress={() => adjustSensitivity(-0.1)}
            >
              <Ionicons name="remove-circle" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, isDetecting && styles.buttonActive]}
              onPress={isDetecting ? stopDetection : startDetection}
            >
              <Ionicons
                name={isDetecting ? 'stop-circle' : 'scan-circle'}
                size={32}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.sensitivityButton]}
              onPress={() => adjustSensitivity(0.1)}
            >
              <Ionicons name="add-circle" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.modeSelector}>
            <TouchableOpacity
              style={[styles.modeButton, detectionMode === 'ir' && styles.modeButtonActive]}
              onPress={() => setDetectionMode('ir')}
            >
              <Text style={styles.modeButtonText}>IR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeButton, detectionMode === 'motion' && styles.modeButtonActive]}
              onPress={() => setDetectionMode('motion')}
            >
              <Text style={styles.modeButtonText}>Motion</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeButton, detectionMode === 'pattern' && styles.modeButtonActive]}
              onPress={() => setDetectionMode('pattern')}
            >
              <Text style={styles.modeButtonText}>Pattern</Text>
            </TouchableOpacity>
          </View>
          
          {/* Visual feedback for detected spots */}
          {detectedSpots.map((spot, index) => (
            <View
              key={index}
              style={[
                styles.spotIndicator,
                {
                  left: `${spot.x * 100}%`,
                  top: `${spot.y * 100}%`,
                  opacity: spot.intensity,
                  width: 20 + spot.size * 30,
                  height: 20 + spot.size * 30,
                  borderRadius: 10 + spot.size * 15,
                },
              ]}
            />
          ))}
          
          <View style={styles.guide}>
            <Text style={styles.guideText}>
              {isDetecting
                ? `Scanning for cameras... (${detectedSpots.length} detected)`
                : 'Press the button to start scanning'}
            </Text>
            <Text style={styles.tipText}>
              Tip: Turn off room lights for better detection
            </Text>
            <Text style={styles.sensitivityText}>
              Sensitivity: {Math.round(sensitivity * 100)}%
            </Text>
            <Text style={styles.modeText}>
              Mode: {detectionMode.charAt(0).toUpperCase() + detectionMode.slice(1)}
            </Text>
          </View>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    padding: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  modeButton: {
    backgroundColor: 'rgba(79, 70, 229, 0.5)',
    padding: 8,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  modeButtonActive: {
    backgroundColor: '#4F46E5',
  },
  modeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4F46E5',
    padding: 15,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  sensitivityButton: {
    padding: 10,
  },
  buttonActive: {
    backgroundColor: '#DC2626',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  guide: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  guideText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  tipText: {
    color: '#FFD700',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  sensitivityText: {
    color: '#4F46E5',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  modeText: {
    color: '#4F46E5',
    fontSize: 14,
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  spotIndicator: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    borderWidth: 2,
    borderColor: 'red',
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
});

export default InfraredDetectionScreen; 
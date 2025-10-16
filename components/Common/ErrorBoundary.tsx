import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 justify-center items-center p-4 bg-white">
          <Text className="mb-4 text-lg font-bold text-red-600">
            Có lỗi xảy ra
          </Text>
          <Text className="mb-4 text-sm text-center text-gray-600">
            {this.state.error?.message || 'Unknown error occurred'}
          </Text>
          <TouchableOpacity
            className="px-4 py-3 bg-blue-500 rounded-lg"
            onPress={() => this.setState({ hasError: false, error: undefined })}
          >
            <Text className="font-medium text-white">Thử lại</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

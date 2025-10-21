import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md p-8 text-center bg-white shadow-xl rounded-2xl dark:bg-gray-800"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 2 }}
              className="inline-block mb-6"
            >
              <i className="text-6xl text-red-500 fa-solid fa-exclamation-triangle"></i>
            </motion.div>
            
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              哎呀，出错了！
            </h2>
            
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              应用遇到了一个意外错误。请尝试刷新页面或重置应用状态。
            </p>

            {import.meta.env.DEV && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="mb-2 font-semibold text-gray-700 cursor-pointer dark:text-gray-300">
                  错误详情 (开发模式)
                </summary>
                <pre className="p-3 overflow-auto text-xs text-red-600 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={this.handleReset}
                className="flex-1 px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                <i className="mr-2 fa-solid fa-refresh"></i>
                重试
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={this.handleReload}
                className="flex-1 px-4 py-2 text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
              >
                <i className="mr-2 fa-solid fa-rotate-right"></i>
                刷新页面
              </motion.button>
            </div>

            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mt-4 text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400"
            >
              <i className="mr-1 fa-solid fa-home"></i>
              返回首页
            </motion.a>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
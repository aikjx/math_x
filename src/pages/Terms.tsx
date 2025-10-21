import React from 'react';
import { motion } from 'framer-motion';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl dark:bg-gray-800 rounded-xl"
        >
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <div className="mb-8 text-center">
              <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                法律条款与免责声明
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                请仔细阅读以下条款，使用本平台即表示您同意这些条款
              </p>
            </div>

            <div className="space-y-8">
              {/* 免责声明 */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                  ⚖️ 免责声明
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-gray-800 dark:text-gray-200">
                      教育用途
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      本项目仅供教育和学习目的使用。所有数学内容、公式和理论仅作为学习参考，不构成专业建议。
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-medium text-gray-800 dark:text-gray-200">
                      内容准确性
                    </h3>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                      <li>• 我们努力确保所有数学内容的准确性，但不保证内容完全无误</li>
                      <li>• 用户在使用本平台内容时应当独立验证其准确性</li>
                      <li>• 对于因使用本平台内容而产生的任何损失，我们不承担责任</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-medium text-gray-800 dark:text-gray-200">
                      第三方链接
                    </h3>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                      <li>• 本平台包含指向第三方网站的链接，这些链接仅为方便用户而提供</li>
                      <li>• 我们不对第三方网站的内容、准确性或可用性负责</li>
                      <li>• 访问第三方网站的风险由用户自行承担</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-medium text-gray-800 dark:text-gray-200">
                      知识产权
                    </h3>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                      <li>• 本项目尊重知识产权，如发现侵权内容请及时联系我们</li>
                      <li>• 用户在使用平台内容时应遵守相关版权法律法规</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-medium text-gray-800 dark:text-gray-200">
                      使用限制
                    </h3>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                      <li>• 禁止将本平台用于任何非法或有害目的</li>
                      <li>• 禁止恶意攻击或破坏平台功能</li>
                      <li>• 禁止传播虚假或误导性信息</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 法律条款 */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                  📋 法律条款
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-gray-800 dark:text-gray-200">
                      服务条款
                    </h3>
                    <p className="mb-3 text-gray-600 dark:text-gray-300">
                      使用本平台即表示您同意以下条款：
                    </p>
                    <ol className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li><strong>接受条款</strong>: 通过访问和使用本平台，您同意受本条款约束</li>
                      <li><strong>服务变更</strong>: 我们保留随时修改或终止服务的权利，恕不另行通知</li>
                      <li><strong>用户责任</strong>: 用户对其在平台上的行为承担全部责任</li>
                      <li><strong>隐私保护</strong>: 我们承诺保护用户隐私，不会未经授权分享个人信息</li>
                    </ol>
                  </div>

                </div>
              </section>

              {/* MIT许可证 */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                  📄 开源许可证
                </h2>
                
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                  <h3 className="mb-2 text-lg font-medium text-gray-800 dark:text-gray-200">
                    MIT License
                  </h3>
                  <p className="mb-3 text-gray-600 dark:text-gray-300">
                    本项目采用MIT开源许可证，允许：
                  </p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 font-medium text-green-600 dark:text-green-400">✅ 允许的使用</h4>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• 商业使用</li>
                        <li>• 修改代码</li>
                        <li>• 分发代码</li>
                        <li>• 私人使用</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 font-medium text-blue-600 dark:text-blue-400">📋 使用要求</h4>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• 保留版权声明</li>
                        <li>• 保留许可证声明</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 联系信息 */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                  📞 联系我们
                </h2>
                <div className="p-4 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700">
                  <p className="mb-3 text-gray-700 dark:text-gray-300">
                    如对本条款有任何疑问或需要举报违规内容，请通过以下方式联系我们：
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>GitHub Issues</strong>: 
                      <a href="https://github.com/aikjx/math/issues" target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-600 hover:underline dark:text-blue-400">
                        https://github.com/aikjx/math/issues
                      </a>
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>X (Twitter)</strong>: 
                      <a href="https://x.com/aikjxcom" target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-600 hover:underline dark:text-blue-400">
                        @aikjxcom
                      </a>
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <div className="pt-8 mt-8 text-center border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                最后更新：2025年8月 | 版本：1.0
              </p>
              <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                本条款的解释权归数学学习导航平台所有
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
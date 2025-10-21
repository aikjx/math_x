// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加页面加载动画
    addLoadingAnimation();
    
    // 添加滚动效果
    addScrollEffects();
    
    // 添加导航功能
    addNavigationFeatures();
    
    // 添加公式交互效果
    addFormulaInteractions();
    
    // 添加主题切换功能
    addThemeToggle();
    
    // 添加返回顶部按钮
    addBackToTop();
    
    // 添加进度指示器
    addProgressIndicator();
});

// 页面加载动画
function addLoadingAnimation() {
    const sections = document.querySelectorAll('.section');
    
    // 创建观察器
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // 初始化样式并观察元素
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        observer.observe(section);
    });
}

// 滚动效果
function addScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        // 头部视差效果
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${rate}px)`;
        }
        
        // 更新导航高亮
        updateActiveNavigation();
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// 导航功能
function addNavigationFeatures() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 更新活跃导航
function updateActiveNavigation() {
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        
        if (sectionTop <= 150 && sectionTop + sectionHeight > 150) {
            currentSection = '#' + section.id;
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === currentSection) {
            item.classList.add('active');
        }
    });
}

// 公式交互效果
function addFormulaInteractions() {
    // 等待 MathJax 加载完成
    window.MathJax.startup.promise.then(() => {
        const formulaElements = document.querySelectorAll('.main-equation, .equation-large, .equation-medium, .equation-xlarge, .key-result, .final-formula-display');
        
        formulaElements.forEach(element => {
            // 添加复制按钮
            addCopyButton(element);
            
            // 添加悬停效果
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    });
}

// 添加复制按钮
function addCopyButton(element) {
    const copyBtn = document.createElement('button');
    copyBtn.innerHTML = '📋';
    copyBtn.className = 'copy-btn';
    copyBtn.title = '复制公式';
    copyBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(52, 152, 219, 0.9);
        color: white;
        border: none;
        border-radius: 50%;
        width: 35px;
        height: 35px;
        cursor: pointer;
        font-size: 16px;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    element.style.position = 'relative';
    element.appendChild(copyBtn);
    
    // 显示/隐藏复制按钮
    element.addEventListener('mouseenter', () => {
        copyBtn.style.opacity = '1';
    });
    
    element.addEventListener('mouseleave', () => {
        copyBtn.style.opacity = '0';
    });
    
    // 复制功能
    copyBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        
        // 获取 LaTeX 代码
        const mathElement = element.querySelector('mjx-container');
        if (mathElement) {
            const latex = mathElement.getAttribute('data-tex') || 
                         element.textContent.replace(/\s+/g, ' ').trim();
            
            try {
                await navigator.clipboard.writeText(latex);
                
                // 显示复制成功提示
                copyBtn.innerHTML = '✓';
                copyBtn.style.background = 'rgba(40, 167, 69, 0.9)';
                
                setTimeout(() => {
                    copyBtn.innerHTML = '📋';
                    copyBtn.style.background = 'rgba(52, 152, 219, 0.9)';
                }, 1500);
                
                showNotification('公式已复制到剪贴板', 'success');
                
            } catch (err) {
                console.error('复制失败:', err);
                showNotification('复制失败，请手动选择文本', 'error');
            }
        }
    });
}

// 主题切换功能
function addThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.className = 'theme-toggle';
    themeToggle.title = '切换深色主题';
    themeToggle.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: rgba(52, 152, 219, 0.9);
        color: white;
        border: none;
        border-radius: 50%;
        width: 55px;
        height: 55px;
        cursor: pointer;
        font-size: 22px;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(themeToggle);
    
    // 检查本地存储的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        enableDarkTheme();
        themeToggle.innerHTML = '☀️';
    }
    
    // 主题切换事件
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-theme');
        
        if (isDark) {
            disableDarkTheme();
            themeToggle.innerHTML = '🌙';
            themeToggle.title = '切换深色主题';
            localStorage.setItem('theme', 'light');
        } else {
            enableDarkTheme();
            themeToggle.innerHTML = '☀️';
            themeToggle.title = '切换浅色主题';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// 启用深色主题
function enableDarkTheme() {
    document.body.classList.add('dark-theme');
    
    if (!document.getElementById('dark-theme-styles')) {
        const darkStyles = document.createElement('style');
        darkStyles.id = 'dark-theme-styles';
        darkStyles.textContent = `
            .dark-theme {
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            }
            
            .dark-theme .container {
                background: rgba(26, 26, 46, 0.95);
                color: #ecf0f1;
            }
            
            .dark-theme .section-content {
                background: rgba(44, 62, 80, 0.8);
                color: #ecf0f1;
            }
            
            .dark-theme .theory-box {
                background: rgba(52, 73, 94, 0.8);
                border-left-color: #3498db;
                color: #ecf0f1;
            }
            
            .dark-theme .derivation-box {
                background: rgba(39, 174, 96, 0.2);
                border-left-color: #27ae60;
                color: #ecf0f1;
            }
            
            .dark-theme .parameter-card,
            .dark-theme .constant-card {
                background: rgba(52, 73, 94, 0.8);
                border-color: #5d6d7e;
                color: #ecf0f1;
            }
            
            .dark-theme .equation-step {
                background: rgba(44, 62, 80, 0.9);
                border-color: #5d6d7e;
                color: #ecf0f1;
            }
            
            .dark-theme .calculation-block {
                background: rgba(52, 73, 94, 0.8);
                border-color: #5d6d7e;
                color: #ecf0f1;
            }
            
            .dark-theme .calc-step {
                background: rgba(44, 62, 80, 0.6);
                color: #ecf0f1;
            }
            
            .dark-theme .equation-large,
            .dark-theme .equation-medium {
                background: rgba(44, 62, 80, 0.9);
                border-color: #5d6d7e;
                color: #ecf0f1;
            }
            
            .dark-theme .verify-step {
                background: rgba(44, 62, 80, 0.9);
                border-color: #5d6d7e;
                color: #ecf0f1;
            }
            
            .dark-theme .final-calculation {
                background: rgba(44, 62, 80, 0.9);
                border-color: #27ae60;
                color: #ecf0f1;
            }
            
            .dark-theme .conclusion-summary {
                background: rgba(52, 73, 94, 0.8);
                border-left-color: #8e44ad;
                color: #ecf0f1;
            }
            
            .dark-theme .verification-intro {
                background: rgba(52, 73, 94, 0.8);
                border-left-color: #e74c3c;
                color: #ecf0f1;
            }
        `;
        document.head.appendChild(darkStyles);
    }
}

// 禁用深色主题
function disableDarkTheme() {
    document.body.classList.remove('dark-theme');
}

// 返回顶部按钮
function addBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.title = '返回顶部';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: rgba(52, 152, 219, 0.9);
        color: white;
        border: none;
        border-radius: 50%;
        width: 55px;
        height: 55px;
        cursor: pointer;
        font-size: 24px;
        font-weight: bold;
        z-index: 1000;
        opacity: 0;
        transition: all 0.3s ease;
        box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(backToTop);
    
    // 滚动显示/隐藏
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.style.opacity = '1';
        } else {
            backToTop.style.opacity = '0';
        }
    });
    
    // 点击返回顶部
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 进度指示器
function addProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-indicator';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #3498db, #2ecc71, #f39c12, #e74c3c);
        z-index: 1001;
        transition: width 0.3s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// 显示通知
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'error' ? '#e74c3c' : type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 1002;
        box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 添加键盘快捷键
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + D 切换主题
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        document.querySelector('.theme-toggle').click();
    }
    
    // Ctrl/Cmd + P 打印
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
    
    // 空格键暂停/继续动画
    if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        toggleAnimations();
    }
});

// 切换动画
function toggleAnimations() {
    const animatedElements = document.querySelectorAll('.animated');
    const isAnimationPaused = document.body.classList.contains('animations-paused');
    
    if (isAnimationPaused) {
        document.body.classList.remove('animations-paused');
        showNotification('动画已恢复', 'info');
    } else {
        document.body.classList.add('animations-paused');
        showNotification('动画已暂停', 'info');
    }
}

// 添加导航活跃状态样式
const navActiveStyle = document.createElement('style');
navActiveStyle.textContent = `
    .nav-item.active {
        background: rgba(255, 255, 255, 0.3);
        color: white;
        transform: translateY(-2px);
    }
    
    .animations-paused * {
        animation-play-state: paused !important;
    }
`;
document.head.appendChild(navActiveStyle);

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 窗口大小改变时的响应
window.addEventListener('resize', debounce(() => {
    // 重新计算布局
    updateActiveNavigation();
}, 250));

// 页面可见性变化处理
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // 页面隐藏时暂停动画
        document.body.classList.add('animations-paused');
    } else {
        // 页面显示时恢复动画
        document.body.classList.remove('animations-paused');
    }
});

console.log('万有引力常数公式推导页面已加载完成！');
console.log('快捷键：Ctrl+D 切换主题，Ctrl+P 打印页面，空格键 暂停/恢复动画');
console.log('功能：点击导航跳转，悬停公式显示复制按钮，滚动显示进度条');
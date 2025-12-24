// 首页一图流加载优化
/**
 * @description 实现medium的渐进加载背景的效果
 */
(function() {
  class ProgressiveLoad {
    constructor(smallSrc, largeSrc) {
      this.smallSrc = smallSrc;
      this.largeSrc = largeSrc;
      this.isSmallVideo = this.isVideo(smallSrc);
      this.isLargeVideo = this.isVideo(largeSrc);
      this.initTpl();
      this.container.addEventListener('animationend', () => {
        this.smallStage.style.display = 'none'; 
      }, {once: true});
    }

    isVideo(src) {
      return src && src.match(/\.(mp4|webm|ogg|mov)$/i);
    }

    initTpl() {
      this.container = document.createElement('div');
      this.smallStage = document.createElement('div');
      this.largeStage = document.createElement('div');
      this.container.className = 'pl-container';
      this.smallStage.className = 'pl-img pl-blur';
      this.largeStage.className = 'pl-img';
      this.container.appendChild(this.smallStage);
      this.container.appendChild(this.largeStage);

      // 初始化小图/视频
      if (this.isSmallVideo) {
        this.smallVideo = document.createElement('video');
        this.smallVideo.autoplay = true;
        this.smallVideo.loop = true;
        this.smallVideo.muted = true;
        this.smallVideo.playsInline = true;
        this.smallVideo.style.objectFit = 'cover';
        this.smallVideo.style.width = '100%';
        this.smallVideo.style.height = '100%';
        this.smallStage.appendChild(this.smallVideo);
        this.smallVideo.addEventListener('canplaythrough', this._onSmallLoaded.bind(this), { once: true });
      } else {
        this.smallImg = new Image();
        this.smallImg.onload = () => {
          this.smallStage.style.backgroundImage = `url('${this.smallSrc}')`;
          this._onSmallLoaded();
        };
      }

      // 初始化大图/视频
      if (this.isLargeVideo) {
        this.largeVideo = document.createElement('video');
        this.largeVideo.autoplay = true;
        this.largeVideo.loop = true;
        this.largeVideo.muted = true;
        this.largeVideo.playsInline = true;
        this.largeVideo.style.objectFit = 'cover';
        this.largeVideo.style.width = '100%';
        this.largeVideo.style.height = '100%';
        this.largeStage.appendChild(this.largeVideo);
        this.largeVideo.addEventListener('canplaythrough', this._onLargeLoaded.bind(this), { once: true });
      } else {
        this.largeImg = new Image();
        this.largeImg.onload = () => {
          this.largeStage.style.backgroundImage = `url('${this.largeSrc}')`;
          this._onLargeLoaded();
        };
      }
    }

    progressiveLoad() {
      if (this.isSmallVideo) {
        this.smallVideo.src = this.smallSrc;
      } else {
        this.smallImg.src = this.smallSrc;
      }

      if (this.isLargeVideo) {
        this.largeVideo.src = this.largeSrc;
      } else {
        this.largeImg.src = this.largeSrc;
      }
    }

    _onSmallLoaded() {
      this.smallStage.classList.add('pl-visible');
    }

    _onLargeLoaded() {
      this.largeStage.classList.add('pl-visible');
    }
  }
  
    const executeLoad = (config, target) => {
      console.log('执行渐进背景替换');
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const loader = new ProgressiveLoad(
        isMobile ? config.mobileSmallSrc : config.smallSrc,
        isMobile ? config.mobileLargeSrc : config.largeSrc
      );
      if (target.children[0]) {
        target.insertBefore(loader.container, target.children[0]);
      }
      loader.progressiveLoad();
    };
  
    const ldconfig = {
      light: {
        smallSrc: '/img/wz/h.png', //浅色模式 小图链接 尽可能配置小于100k的图片 
        largeSrc: '/img//video/bj/h.mp4', //浅色模式 大图链接 最终显示的图片
        mobileSmallSrc: '/img/wz/h.png', //手机端浅色小图链接 尽可能配置小于100k的图片
        mobileLargeSrc: '/img//video/bj/h.mp4', //手机端浅色大图链接 最终显示的图片
        enableRoutes: ['/'],
        },
      dark: {
        smallSrc: '/img/wz/b.png', //深色模式 小图链接 尽可能配置小于100k的图片 
        largeSrc: '/img//video/bj/b.mp4', //深色模式 大图链接 最终显示的图片
        mobileSmallSrc: '/img/wz/b.png', //手机端深色模式小图链接 尽可能配置小于100k的图片
        mobileLargeSrc: '/img//video/bj/b.mp4', //手机端深色大图链接 最终显示的图片
        enableRoutes: ['/'],
        },
      };
  
      const getCurrentTheme = () => {
        return document.documentElement.getAttribute('data-theme'); 
      }
  
      const onThemeChange = () => {
        const currentTheme = getCurrentTheme();
        const config = ldconfig[currentTheme];
        initProgressiveLoad(config);
        document.addEventListener("DOMContentLoaded", function() {
          initProgressiveLoad(config);
        });
      
        document.addEventListener("pjax:complete", function() {
          onPJAXComplete(config);
        });
      }
  
      let initTheme = getCurrentTheme();
      let initConfig = ldconfig[initTheme];
      initProgressiveLoad(initConfig);
  
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === "data-theme" && location.pathname === '/') {
          onThemeChange();
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]  
    });
  
    function initProgressiveLoad(config) {
      const container = document.querySelector('.pl-container');
      if (container) {
        container.remove();
      }
      const target = document.getElementById('page-header');
      if (target && target.classList.contains('full_page')) {
        executeLoad(config, target);
      }
    }
  
    function onPJAXComplete(config) {
      const target = document.getElementById('page-header');
      if (target && target.classList.contains('full_page')) {
        initProgressiveLoad(config);
      }
    }
  
  })();
  
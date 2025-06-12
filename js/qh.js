// 存数据
// name：命名 data：数据
function saveData(name, data) {
   localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data }))
}

// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
function loadData(name, time) {
   let d = JSON.parse(localStorage.getItem(name));
   // 过期或有错误返回 0 否则返回数据
   if (d) {
       let t = Date.now() - d.time
       if (t < (time * 60 * 1000) && t > -1) return d.data;
   }
   return 0;
}

// 设置字体
if (localStorage.getItem("font") == undefined) {
   localStorage.setItem("font", "xxx");
 }
 setFont(localStorage.getItem("font"));
 function setFont(n) {
   localStorage.setItem("font", n)
   if (n == "default") {
     document.documentElement.style.setProperty('--global-font', '-apple-system');
     document.body.style.fontFamily = "猫啃珠圆体, 'Microsoft JhengHei' , 'Microsoft YaHei' , sans-serif";
   }
   else {
     document.documentElement.style.setProperty('--global-font', n);
     document.body.style.fontFamily = "var(--global-font),-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif";
   }
   try { setFontBorder(); } catch (err) { };
 }
 
 // 设置字体选择框边界
 function setFontBorder() {
   var curFont = localStorage.getItem("font");
   var swfId = "swf_" + curFont;
   document.getElementById(swfId).style.border = "2px solid var(--theme-color)";
   Array.prototype.forEach.call(document.getElementsByClassName("swf"), function (ee) {
     if (ee.id != swfId) ee.style.border = "2px solid var(--border-color)";
   });
 }

// 打开窗口函数
function openModal() {
   const overlay = document.getElementById('modalOverlay');
   overlay.classList.add('active');
   document.body.style.overflow = 'hidden'; // 防止背景滚动
 }
 
 // 关闭窗口函数
 function closeModal() {
   const overlay = document.getElementById('modalOverlay');
   overlay.classList.remove('active');
   document.body.style.overflow = '';
 }
 
 // 事件绑定
 document.querySelector('.close-btn').addEventListener('click', closeModal);
 document.getElementById('modalOverlay').addEventListener('click', function(e) {
   if (e.target === this) closeModal();
 });
 
 // ESC 键关闭
 document.addEventListener('keydown', (e) => {
   if (e.key === 'Escape' && document.getElementById('modalOverlay').classList.contains('active')) {
     closeModal();
   }
 });
 
 // 使用示例：在需要打开的地方调用 openModal()

const openBtn = document.getElementById('openBtn');
const closeBtn = document.querySelector('.close-btn');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

// 打开窗口
openBtn.addEventListener('click', () => {
  modal.classList.add('active');
  overlay.classList.add('active');
});

// 关闭窗口
function closeModal() {
  modal.classList.remove('active');
  overlay.classList.remove('active');
}

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// 可选：ESC键关闭
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

// 透明度调节滑块
if (localStorage.getItem("transNum") == undefined) {
   localStorage.setItem("transNum", 95);
 }
 var curTransNum = localStorage.getItem("transNum");
 var curTransMini = curTransNum * 0.95;
 document.getElementById("transPercent").innerText = `:root{--trans-light: rgba(253, 253, 253, ${curTransNum}%) !important; --trans-dark: rgba(25, 25, 25, ${curTransNum}%) !important} `;
 function setTrans() {
   var elem = document.getElementById("transSet");
   var newTransNum = elem.value;
   var target = document.querySelector('.transValue');
   target.innerHTML = "透明度 (0%-100%): " + newTransNum + "%";
   localStorage.setItem("transNum", newTransNum);
   curTransMini = newTransNum * 0.95;
   curTransNum = newTransNum;  // 更新当前透明度
   document.querySelector('#rang_trans').style.width = curTransMini + "%";
   document.getElementById("transPercent").innerText = `:root{--trans-light: rgba(253, 253, 253, ${newTransNum}%) !important; --trans-dark: rgba(25, 25, 25, ${newTransNum}%) !important} `;
 };

// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用

// 侧边栏开关
if (localStorage.getItem("rs") == undefined) {
  localStorage.setItem("rs", "block");
}
if (localStorage.getItem("rs") == "block") {
  document.getElementById("rightSide").innerText = `:root{--rightside-display: block}`;
} else {
  document.getElementById("rightSide").innerText = `:root{--rightside-display: none}`;
}
function toggleRightside() {
  // 先设置localStorage变量
  if (document.getElementById("rightSideSet").checked) {
    localStorage.setItem("rs", "block");
    document.getElementById("rightSide").innerText = `:root{--rightside-display: block}`;
  } else {
    localStorage.setItem("rs", "none");
    document.getElementById("rightSide").innerText = `:root{--rightside-display: none}`;
  }
}

// 读取背景
try {
   let data = loadData('blogbg', 1440)
   if (data) changeBg(data, 1)
   else localStorage.removeItem('blogbg');
} catch (error) { localStorage.removeItem('blogbg'); }

// 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
function changeBg(s, flag) {
   let bg = document.getElementById('web_bg')
   if (s.charAt(0) == '#') {
       bg.style.backgroundColor = s
       bg.style.backgroundImage = 'none'
   } else bg.style.backgroundImage = s
   if (!flag) { saveData('blogbg', s) }
}

// 以下为2.0新增内容

// 创建窗口
var winbox = ''

function createWinbox() {
   let div = document.createElement('div')
   document.body.appendChild(div)
   winbox = WinBox({
       id: 'changeBgBox',
       index: 999,
       title: "切换背景",
       x: "center",
       y: "center",
       minwidth: '300px',
       height: "60%",
       background: '#49b1f5',
       onmaximize: () => { div.innerHTML = `<style>body::-webkit-scrollbar {display: none;}div#changeBgBox {width: 100% !important;}</style>` },
       onrestore: () => { div.innerHTML = '' }
   });
   winResize();
   window.addEventListener('resize', winResize)
  

    // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义
    winbox.body.innerHTML = `
    <div id="article-container" style="padding:10px;">
    
    <div class="note info modern"><p>点击对应样式即可切换背景(主页不显示可跳转到文章查看) </p>
    </div>

    <div class="note danger modern"><i class="note-icon fa-solid.fa-image"></i><p>有效期为一次，到期切回默认壁纸</p>
    </div>

    <h2>二、字体设置</h2>
<div class="note info modern"><p>非商免字体未经授权只能个人使用。本站为完全非商业、非盈利性质的网站，平时用于个人学习交流，如有侵权请联系站长删除，谢谢！ —— 致版权方 </p>
    </div>
    <p id="swfs">
    <a class="swf" id="swf_猫啃珠圆体" href="javascript:;" rel="noopener external nofollow" style="font-family:猫啃珠圆体;!important;color:black" onclick="setFont('猫啃珠圆体')">猫啃珠圆体</a>
    <a class="swf" id="swf_ZhuZiAWan" href="javascript:;" rel="noopener external nofollow" style="font-family:'ZhuZiAWan'!important;color:black" onclick="setFont('ZhuZiAWan')">系统默认</a>

    </div>
     <h2 id="图片（电脑）"><a href="#图片（电脑）" class="headerlink" title="图片（电脑）"></a>图片（电脑）</h2>
     </time></header><details class="folding-tag" ><summary> 查看电脑壁纸 </summary>
      <div class='content'>
      <div class="bgbox">
        <a href="javascript:;" style="background-image:url(/img/bz/1.png)" class="imgbox"
           onclick="changeBg('url(/img/bz/1.png)')"></a>
        <a href="javascript:;" style="background-image:url(/img/bz/2.png)" class="imgbox"
           onclick="changeBg('url(/img/bz/2.png)')"></a>
        <a href="javascript:;" style="background-image:url(/img/bz/3.png)" class="imgbox"
           onclick="changeBg('url(/img/bz/3.png)')"></a>     
        <a href="javascript:;" style="background-image:url(/img/bz/4.png)" class="imgbox"
           onclick="changeBg('url(/img/bz/4.png)')"></a>  
        <a href="javascript:;" style="background-image:url(/img/bz/5.png)" class="imgbox"
           onclick="changeBg('url(/img/bz/5.png)')"></a>  
        <a href="javascript:;" style="background-image:url(/img/bz/6.png)" class="imgbox"
           onclick="changeBg('url(/img/bz/6.png)')"></a>  
        <a href="javascript:;" style="background-image:url(/img/bz/7.png)" class="imgbox"
           onclick="changeBg('url(/img/bz/7.png)')"></a>  
        <a href="javascript:;" style="background-image:url(/img/bz/8.png)" class="imgbox"
           onclick="changeBg('url(/img/bz/8.png)')"></a>
        <a href="javascript:;" style="background-image:url(/img/bz/9.png)" class="imgbox"
           onclick="changeBg('url(/img/bz/9.png)')"></a>
        <a href="javascript:;" style="background-image:url(/img/bz/10.png)" class="imgbox"
           onclick="changeBg('url(/img/bz/10.png)')"></a>                      
     </details></article><div class="post-copyright">
    </div>
   
    <h2 id="渐变色"><a href="#渐变色" class="headerlink" title="渐变色"></a>渐变色</h2>
     </time></header><details class="folding-tag" ><summary> 查看渐变色壁纸 </summary>
      <div class='content'>
      <div class="bgbox">
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: linear-gradient(to right, #eecda3, #ef629f)" 
           onclick="changeBg('linear-gradient(to right, #eecda3, #ef629f)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: linear-gradient(to right, #ff6b6b, #ffd93d)" 
           onclick="changeBg('linear-gradient(to right, #ff6b6b, #ffd93d)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: linear-gradient(45deg, #12c2e9, #c471ed, #f64f59)" 
           onclick="changeBg('linear-gradient(45deg, #12c2e9, #c471ed, #f64f59)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: linear-gradient(to bottom right, #43cea2, #185a9d)" 
           onclick="changeBg('linear-gradient(to bottom right, #43cea2, #185a9d)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: linear-gradient(135deg, #ff9a9e, #fad0c4)" 
           onclick="changeBg('linear-gradient(135deg, #ff9a9e, #fad0c4)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: linear-gradient(to right, #4facfe, #00f2fe)" 
           onclick="changeBg('linear-gradient(to right, #4facfe, #00f2fe)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: linear-gradient(45deg, #ff6a00, #ee0979)" 
           onclick="changeBg('linear-gradient(45deg, #ff6a00, #ee0979)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: linear-gradient(to left, #159957, #155799)" 
           onclick="changeBg('linear-gradient(to left, #159957, #155799)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: linear-gradient(45deg, #ec008c, #fc6767)" 
           onclick="changeBg('linear-gradient(45deg, #ec008c, #fc6767)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: linear-gradient(to top, #007991, #78ffd6)" 
           onclick="changeBg('linear-gradient(to top, #007991, #78ffd6)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: linear-gradient(135deg, #654ea3, #eaafc8)" 
           onclick="changeBg('linear-gradient(135deg, #654ea3, #eaafc8)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: linear-gradient(to right, #ff512f, #dd2476)" 
           onclick="changeBg('linear-gradient(to right, #ff512f, #dd2476)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: linear-gradient(45deg, #00c6ff, #0072ff)" 
           onclick="changeBg('linear-gradient(45deg, #00c6ff, #0072ff)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: linear-gradient(to bottom, #f857a6, #ff5858)" 
           onclick="changeBg('linear-gradient(to bottom, #f857a6, #ff5858)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: linear-gradient(135deg, #43e97b, #38f9d7)" 
           onclick="changeBg('linear-gradient(135deg, #43e97b, #38f9d7)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: linear-gradient(to right, #636363, #a2ab58)" 
           onclick="changeBg('linear-gradient(to right, #636363, #a2ab58)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: linear-gradient(45deg, #ff9966, #ff5e62)" 
           onclick="changeBg('linear-gradient(45deg, #ff9966, #ff5e62)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: linear-gradient(to left, #6d6027, #d3cbb8)" 
           onclick="changeBg('linear-gradient(to left, #6d6027, #d3cbb8)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: linear-gradient(135deg, #556270, #ff6b6b)" 
           onclick="changeBg('linear-gradient(135deg, #556270, #ff6b6b)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: linear-gradient(to top right, #834d9b, #d04ed6)" 
           onclick="changeBg('linear-gradient(to top right, #834d9b, #d04ed6)')"></a>
     </details>
    </div>

    <h2 id="纯色"><a href="#纯色" class="headerlink" title="纯色"></a>纯色</h2>
     </time></header><details class="folding-tag" ><summary> 查看渐纯色壁纸 </summary>
      <div class='content'>
      <div class="bgbox">
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #F0ECE3" 
           onclick="changeBg('#F0ECE3')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #B2B8A3" 
           onclick="changeBg('#B2B8A3')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #7C898B" 
           onclick="changeBg('#7C898B')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #DFD3C3" 
           onclick="changeBg('#DFD3C3')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #A19882" 
           onclick="changeBg('#A19882')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #6D8B74" 
           onclick="changeBg('#6D8B74')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #556052" 
           onclick="changeBg('#556052')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #D0CAB2" 
           onclick="changeBg('#D0CAB2')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #9A9483" 
           onclick="changeBg('#9A9483')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #6E7C7C" 
           onclick="changeBg('#6E7C7C')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #FF6F61" 
           onclick="changeBg('#FF6F61')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #88B04B" 
           onclick="changeBg('#88B04B')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #5F4B8B" 
           onclick="changeBg('#5F4B8B')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #FFD700" 
           onclick="changeBg('#FFD700')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #2C3539" 
           onclick="changeBg('#2C3539')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #3B2F2F" 
           onclick="changeBg('#3B2F2F')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #FF6F61" 
           onclick="changeBg('#FF6F61')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #0F4C81" 
           onclick="changeBg('#0F4C81')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #F5DF4D" 
           onclick="changeBg('#F5DF4D')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #B8A99A" 
           onclick="changeBg('#B8A99A')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #8C8070" 
           onclick="changeBg('#8C8070')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #C3272B" 
           onclick="changeBg('#C3272B')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #446CCF"
           onclick="changeBg('#446CCF')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #F8B195"
           onclick="changeBg('#F8B195')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" 
           style="background: #355C7D"
           onclick="changeBg('#355C7D')"></a>
     </details>

   <br>
   <center><div style="font-size:1.2em;color:var(--theme-color);font-weight:bold;">------ ( •̀ ω •́ )y✨仙途已径 ------</div></center>
   <br>
    </div>
`;
}

// 适应窗口大小
function winResize() {
    let box = document.querySelector('#changeBgBox')
    if (!box || box.classList.contains('min') || box.classList.contains('max')) return // 2023-02-10更新
    var offsetWid = document.documentElement.clientWidth;
    if (offsetWid <= 768) {
        winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
    } else {
        winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
    }
}

// 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
function toggleWinbox() {
    if (document.querySelector('#changeBgBox')) winbox.toggleClass('hide');
    else createWinbox();
}    
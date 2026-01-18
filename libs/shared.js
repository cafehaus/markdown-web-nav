// markdown-web-nav 共享模块

// 示例数据
const demoTreeData = [
  {
    "title": "✏️ 精选博客",
    "children": [
      {
        "name": "咖啡教室",
        "url": "https://cafe123.cn",
        "description": "就想开间小小咖啡馆，做做咖啡调调酒",
        "icon": "https://cafe123.cn/logo.svg"
      },
      {
        "name": "人人都是码农",
        "url": "https://node123.cn",
        "description": "AI时代，零基础也能学会编程",
        "icon": "https://node123.cn/images/logo.png"
      }
    ]
  },
  {
    "title": "🧑‍💻 AI工具",
    "children": [
      {
        "name": "DeepSeek",
        "url": "https://chat.deepseek.com",
        "description": "我是 DeepSeek，很高兴见到你！",
        "icon": "https://www.deepseek.com/favicon.ico"
      }
    ]
  }
];

// 生成小清新随机颜色
function generateColor() {
  function hslToRgb(h, s, l) {
    s /= 100
    l /= 100
    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs((h / 60) % 2 - 1))
    const m = l - c / 2
    let r, g, b

    if (h < 60) [r, g, b] = [c, x, 0];
    else if (h < 120) [r, g, b] = [x, c, 0];
    else if (h < 180) [r, g, b] = [0, c, x];
    else if (h < 240) [r, g, b] = [0, x, c];
    else if (h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];

    return [
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255)
    ]
  }
  
  const h = Math.floor(Math.random() * 360) // 随机色相
  const s = Math.floor(Math.random() * 20 + 20) // 饱和度 20-40%
  const l = Math.floor(Math.random() * 10 + 85) // 亮度 85-95%
  const [r, g, b] = hslToRgb(h, s, l);
  
  return `#${[r, g, b].map(v => 
    v.toString(16).padStart(2, '0')
  ).join('')}`
}

// 生成markdown数据
function generateMarkdown(treeData) {
  let markdown = '';
  for (let index = 0; index < treeData.length; index++) {
    const element = treeData[index];
    markdown += `

#### ${element.title || '未设置导航分类标题'}
---
<div style="display: flex;align-items: center;flex-wrap: wrap;margin-right: 20px;">`;
    
    if (element.children) {
      for (let j = 0; j < element.children.length; j++) {
        const child = element.children[j];
        if (!child.url) {
          continue;
        }

        markdown += `<a href="${child.url}" target="_blank" title="${child.url}" style="text-decoration: none;display:block;width: 250px;margin: 0 20px 20px 0;padding: 16px;border-radius: 10px;border: 1px solid #EEE;"><div style="display: flex;align-items: center;">`;
        
        if (child.icon) {
          markdown += `<img src="${child.icon}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;margin-right:8px;display:block;" />`;
        } else {
          markdown += `<div style="width:36px;height:36px;border-radius:50%;text-align: center;line-height:36px;margin-right:8px;background:${generateColor()};color: #FFF;">${child.name ? child.name[0] : '空'}</div>`;
        }

        // 描述不存在，直接用网址做描述
        let description = child.description;
        if (!child.description) {
          // 去掉网址前缀，兼容部份markdown解析器按超链接解析了
          description = child.url.replace(/^https?:\/\//, '');
        }
        markdown += `<div style="overflow:hidden;"><div style="color: #333;white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">${child.name || '未设置网站名称'}</div><div style="margin-top:2px;font-size: 12px;color: #999;white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">${description}</div></div></div></a>`;
      }
    }

    markdown += `</div>`;
  }

  return markdown;
}

// 格式化JSON数据，添加必要的字段
function fmtJsonData(item) {
  const id = Math.floor(Math.random() * 1000000);
  const result = {
    id,
    isLeaf: false,
    label: item.title || '未设置导航分类标题',
    title: item.title || '未设置导航分类标题',
    children: []
  };

  if (item.children && item.children.length) {
    result.children = item.children.map((child, index) => {
      const childId = id + index + 1;
      return {
        id: childId,
        isLeaf: true,
        label: child.name || '未设置网站名称',
        name: child.name || '未设置网站名称',
        url: child.url || '',
        description: child.description || '',
        icon: child.icon || ''
      };
    });
  }

  return result;
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  // Node.js环境
  module.exports = {
    demoTreeData,
    generateColor,
    generateMarkdown,
    fmtJsonData
  };
} else {
  // 浏览器环境
  window.MarkdownWebNav = {
    demoTreeData,
    generateColor,
    generateMarkdown,
    fmtJsonData
  };
}
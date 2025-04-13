# markdown-web-nav

用markdown语法制作一个网址导航页面：https://cafehaus.github.io/markdown-web-nav，具体功能包括：

* 导入json数据直接生成markdown页面数据
* 可以在网页上便捷新增、编辑需要的网址数据(无需懂代码)
* 实时预览最终的网址导航效果
* 一键复制最终的markdown数据(可以直接粘贴到文档中使用)
* 导出markdown文件、json文件
* 可记录最近的历史修改记录，后期修改更方便

如果你不懂代码或者不知道如何修改json数据也没关系，可以直接在网页上使用，详细教程参考：https://cafehaus.github.io/markdown-web-nav/#/readme

### 制作网址导航页面步骤

总共分为如下 4 个步骤，其实也很简单：

#### 1、打开 markdown-web-nav 网页工具
在浏览器中打开[markdown-web-nav](https://cafehaus.github.io/markdown-web-nav)，网站内容区左侧为级联网址数据管理区，可以在这里编辑新增、编辑、删除需要的网址数据。

右侧为效果预览区，当我们修改了网址数据后，可以在这里实时查看到用markdown渲染出来一样的最新的效果。

#### 2、新增网址导航数据
进入网页后默认有几个示例数据，可以直接在示例的基础上修改、新增就行了。点击顶部的“新增导航分类”可以新增一个分类，然后可以在分类下再新增我们需要的网址导航数据。

点击分类和网站数据后面的编辑图标可以编辑详细信息，点击分类和网站数据后面的减号图标可以删除当前元素，点击分类右侧的加号图标可以新增当前类目下的网站信息。

同时也可以点击顶部的“上传json网址数据文件”按钮，直接将json数据加载到页面上，不过需注意json数据需按特定格式编写，也可以点击“下载json示例模板”参照模板编写：

```json
{
  "root": [
    {
      "title": "✏️ 精选博客",
      "children": [
        {
          "name": "咖啡教室",
          "url": "https://cafe123.cn",
          "description": "就想开间小小咖啡馆，做做咖啡调调酒",
          "icon": "https://cafe123.cn/logo.svg"
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
          "icon": "https://chat.deepseek.com/favicon.svg"
        }
      ]
    }
  ]
}
```

如果想要恢复到历史某个版本进行修改，可以鼠标放到顶部的“修改历史”按钮上，里面会记录我们最近的修改历史，点击某个修改时间可以加载对应时间点的修改数据，不过操作前建议先点“导出json”按钮将当前的数据备份到自己电脑本地。

##### 如何找到网站 icon 图标的链接？

新增网站信息时网站名称和网站地址必填，为了美观建议填上网址图标地址，不过很多人可能不知道如何找到网站 icon 图标的链接，大多网站就是在域名后面跟上如下一些后缀：

* /favicon.ico
* /logo.png
* /logo.svg
* /images/logo.png

可以自己在浏览器中网址后面加上上面的后缀看能不能正常打开图片，如果打开失败也可以鼠标右键-检查（快捷键F12），打开浏览器调试台，然后选到network后刷新一下浏览器，从加载的资源中也可以找到我们需要的图标地址。

#### 3、复制markdown数据
网址导航数据添加完成后，可以点击右侧的“复制markdown数据”，直接将最终的markdown数据复制到粘贴板上。同时如果每次修改比较多时也建议点击“导出json“按钮备份一下，可将当前数据导出为一个json文件保存在自己电脑上，下次想再次修改时可以直接通过“上传json网址数据文件”加载回来所有数据。

#### 4、粘贴到支持markdown内容渲染的文档页面中
上一步复制好markdown数据后，我们就可以在支持markdown渲染的文档中粘贴进去就可以了。就过想自己本地修改markdown数据，也可以直接选择“导出markdown”下载到本地进行修改。

##### 使用问题反馈
使用问题或建议反馈：https://github.com/cafehaus/markdown-web-nav/issues
设计一个 AstrBot Text2Image Playground，用于测试 AstrBot 文转图。

两栏布局，左边是代码输入（Jinja2 模版）与数据内容输入（jinja 模版的数据），可以用 monaco 编辑器。

对接 AstrBot Text2Img 服务。

接口从 https://api.soulter.top/astrbot/t2i-endpoints 获取：

```
{
  "data": [
    {
      "url": "https://t2i.soulter.top/text2img",
      "active": true
    },
    {
      "url": "https://t2i.rcfortress.site/text2img",
      "active": true
    }
  ]
}
```

接口文档：

```json
{"openapi":"3.1.0","info":{"title":"FastAPI","version":"0.1.0"},"paths":{"/text2img/data/{id}":{"get":{"summary":"Text2Img Image","operationId":"text2img_image_text2img_data__id__get","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string","title":"Id"}}],"responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{}}}},"422":{"description":"Validation Error","content":{"application/json":{"schema":{"$ref":"#/components/schemas/HTTPValidationError"}}}}}}},"/text2img/generate":{"post":{"summary":"Text2Img","description":"html: str\noptions: ScreenshotOptions","operationId":"text2img_text2img_generate_post","requestBody":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/GenerateRequest"}}},"required":true},"responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{}}}},"422":{"description":"Validation Error","content":{"application/json":{"schema":{"$ref":"#/components/schemas/HTTPValidationError"}}}}}}}},"components":{"schemas":{"FloatRect":{"properties":{"x":{"type":"number","title":"X"},"y":{"type":"number","title":"Y"},"width":{"type":"number","title":"Width"},"height":{"type":"number","title":"Height"}},"type":"object","required":["x","y","width","height"],"title":"FloatRect"},"GenerateRequest":{"properties":{"html":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Html"},"tmpl":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Tmpl"},"tmplname":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Tmplname"},"tmpldata":{"anyOf":[{"additionalProperties":true,"type":"object"},{"type":"null"}],"title":"Tmpldata"},"options":{"anyOf":[{"$ref":"#/components/schemas/ScreenshotOptions"},{"type":"null"}]},"json":{"type":"boolean","title":"Json","default":false}},"type":"object","title":"GenerateRequest"},"HTTPValidationError":{"properties":{"detail":{"items":{"$ref":"#/components/schemas/ValidationError"},"type":"array","title":"Detail"}},"type":"object","title":"HTTPValidationError"},"ScreenshotOptions":{"properties":{"timeout":{"anyOf":[{"type":"number"},{"type":"null"}],"title":"Timeout"},"type":{"enum":["jpeg","png",null],"title":"Type"},"quality":{"anyOf":[{"type":"integer"},{"type":"null"}],"title":"Quality"},"omit_background":{"anyOf":[{"type":"boolean"},{"type":"null"}],"title":"Omit Background"},"full_page":{"anyOf":[{"type":"boolean"},{"type":"null"}],"title":"Full Page","default":true},"clip":{"anyOf":[{"$ref":"#/components/schemas/FloatRect"},{"type":"null"}]},"animations":{"enum":["allow","disabled",null],"title":"Animations"},"caret":{"enum":["hide","initial",null],"title":"Caret"},"scale":{"enum":["css","device",null],"title":"Scale"},"viewport_width":{"anyOf":[{"type":"integer"},{"type":"null"}],"title":"Viewport Width"},"device_scale_factor_level":{"enum":["normal","high","ultra",null],"title":"Device Scale Factor Level"}},"type":"object","title":"ScreenshotOptions","description":"Playwright 截图参数\n\n详见：https://playwright.dev/python/docs/api/class-page#page-screenshot\n\nArgs:\n    timeout (float, optional): 截图超时时间.\n    type (Literal[\"jpeg\", \"png\"], optional): 截图图片类型.\n    path (Union[str, Path]], optional): 截图保存路径，如不需要则留空.\n    quality (int, optional): 截图质量，仅适用于 JPEG 格式图片.\n    omit_background (bool, optional): 是否允许隐藏默认的白色背景，这样就可以截透明图了，仅适用于 PNG 格式.\n    full_page (bool, optional): 是否截整个页面而不是仅设置的视口大小，默认为 True.\n    clip (FloatRect, optional): 截图后裁切的区域，xy为起点.\n    animations: (Literal[\"allow\", \"disabled\"], optional): 是否允许播放 CSS 动画.\n    caret: (Literal[\"hide\", \"initial\"], optional): 当设置为 `hide` 时，截图时将隐藏文本插入符号，默认为 `hide`.\n    scale: (Literal[\"css\", \"device\"], optional): 页面缩放设置.\n        当设置为 `css` 时，则将设备分辨率与 CSS 中的像素一一对应，在高分屏上会使得截图变小.\n        当设置为 `device` 时，则根据设备的屏幕缩放设置或当前 Playwright 的 Page/Context 中的\n        device_scale_factor 参数来缩放.\n    viewport_width: (int, optional): 自定义视口宽度，用于控制截图宽度.\n    device_scale_factor_level: (Literal[\"normal\", \"high\", \"ultra\"], optional): 设备像素比等级.\n        - normal: 1.0\n        - high: 1.3\n        - ultra: 1.8\n\n@author: Redlnn(https://github.com/GraiaCommunity/graiax-text2img-playwright)"},"ValidationError":{"properties":{"loc":{"items":{"anyOf":[{"type":"string"},{"type":"integer"}]},"type":"array","title":"Location"},"msg":{"type":"string","title":"Message"},"type":{"type":"string","title":"Error Type"}},"type":"object","required":["loc","msg","type"],"title":"ValidationError"}}}}
```

`tmpl`：jinja2 模版
`tmpl_data`：jinja2 数据
`html`: 不需要考虑
`tmplname`：不需要考虑

default_options = {"full_page": True, "type": "jpeg", "quality": 60}

options 可视化渲染，并且只需要传递：

1. quality
2. full_page
3. device_scale_factor_level
4. omit_background
5. timeout


除了官方的接口，也支持自定义接口。

拥有一个渲染按钮 点击之后会向接口请求，并返回图片。（`json` 字段默认关闭，会直接返回图片。）

React + MUI

尽量设计简约大气，不要有渐变色，符合 Google 的 Material 3 设计风格。

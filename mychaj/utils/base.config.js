export const baseConfig = () => {
  return {
    "width": 750,
    "height": 1835,
    "timeout": 10000,
    "canvasId": "canvas",
    "preview": true,
    "imgArr": [
      { "drawType": "image", "radius": 16, "x": 285.8, "y": 386.8, "zIndex": 34, "avatar": true, "url": "../../../image/example0.png", },
    ],
    "textArr": [
      { "drawType": "text", "text": "V看板", "color": "#fff", "x": 262, "y": 60, "zIndex": 33, "fontSize": 28, "textAlign": "left", "fontWeight": 10 },
      { "drawType": "text", "text": "·短视频风向标", "color": "#fff", "x": 340, "y": 60, "zIndex": 33, "fontSize": 28, "textAlign": "left" },
      { "drawType": "text", "text": "—", "color": "#b8b3ff", "x": 181.3, "y": 209.4, "zIndex": 33, "fontSize": 20, "textAlign": "left" },
      { "drawType": "text", "text": "—", "color": "#b8b3ff", "x": 535.3, "y": 209.4, "zIndex": 33, "fontSize": 20, "textAlign": "left" },
    ],
    "rectArr": [
      { "drawType": "rect", "x": 0, "y": 0, "width": 750, "height": 1835, "borderColor": "#F6F5F8", "backgroundColor": "#F6F5F8", "zIndex": 0, },
      { "drawType": "rect", "x": 199, "y": 50, "width": 352, "height": 54, "borderColor": "#C7C5CF", "backgroundColor": "#C7C5CF", "zIndex": 1, "radius": 27 },
      { "drawType": "rect", "x": 40, "y": 154, "width": 670, "height": 299, "borderColor": "#7166FF", "backgroundColor": "#7166FF", "zIndex": 2, "topLeftRadius": 10, "topRightRadius": 10 },
      { "drawType": "rect", "x": 40, "y": 452.4, "width": 670, "height": 494, "borderColor": "#fff", "backgroundColor": "#fff", "zIndex": 2, },
      { "drawType": "rect", "x": 262.4, "y": 366, "width": 223, "height": 40.5, "borderColor": "#867DFF", "backgroundColor": "#867DFF", "zIndex": 3, "radius": 20.55 },
    ],
  }
}
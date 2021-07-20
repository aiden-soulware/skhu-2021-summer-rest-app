## 파일명

kebab-case 형식으로 함
예) AllUsers.vue => all-users.vue


## vue formatter
veutur

Code 설정에서 settings.json 파일에 아래의 내용을 추가

```
    "html.format.wrapLineLength": 180,
    "vetur.format.defaultFormatter.js": "vscode-typescript",
    "vetur.format.defaultFormatterOptions": {
        "js-beautify-html": {
            "wrap_attributes": "auto"
        }
    },
    "vetur.format.defaultFormatter.html": "js-beautify-html",
```

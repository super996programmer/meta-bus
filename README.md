# meta-bus

## 作品說明

### MetaBus - 全台公車動態時刻查詢應用服務

#### 設計稿

[Figma](https://www.figma.com/file/cE4CqH3weKsiP3dM0Brc3N/%E5%85%AC%E8%BB%8A%E5%9C%B0%E5%9C%96%E8%B3%87%E8%A8%8A%E6%95%B4%E5%90%88%E7%B6%B2?node-id=0%3A1)

#### Demo

[MetaBus](https://meta-bus.web.app)

> 由於時間限制，開發以行動裝置體驗較佳為優先，建議以手機開啟，或桌機瀏覽器開啟開發者模式下的行動裝置檢視模式會有較佳使用體驗。

## 系統說明

- 安裝相關套件

  ```
  npm install
  ```

- 執行本機伺服器（Webpack Dev Server）檢視網頁

  ```
  npm run start
  ```

- 建置

  - dev：

    ```
    npm run build:dev
    ```

  - prod：

    ```
    npm run build:prod
    ```

- Lint：語法檢查

  - ESLint 檢查 js、ts 語法：

    ```
    npm run lint:ts:check
    ```

  - ESLint 修正 js、ts 語法：

    ```
    npm run lint:ts:fix
    ```

  - Stylelint 檢查 css、css-in-js 語法：

    ```
    npm run lint:style:check
    ```

  - Stylelint 修正 css、css-in-js 語法：

    ```
    npm run lint:style:fix
    ```

  > 使用 vscode 可以安裝 eslint 或 stylelint 套件在開發時進行檢查

- Formatter：使用 Prettier 進行程式碼排版

  - 排版檢查：

    ```
    npm run format:check
    ```

  - 排版修正：

    ```
    npm run format:run
    ```

  > 使用 vscode 可以安裝 prettier 套件在開發時進行排版

- 環境資訊
  - node.js 版本：`16.13.0`
  - npm 版本：`8.1.3`
  - React 版本： `17.0.2`

## 資料夾說明

- bundle - 建置檔案資料夾
- content - 圖片、Icon 等相關資源
- public - HTML Template
- src - 主要程式碼位置
  - api - api 內容，包括對應的型別檔與封裝成 React Custom Hook 來使用的 API Hook
  - components - 共用元件
  - context - React Context
  - hooks - 共用的 React Custom Hook
  - model - 共用型別檔
  - pages - 頁面元件
  - style - 共用 css 樣式
  - utils - 共用的工具函式
  - index.tsx - 程式進入點

## 使用技術

- React（React Hook）
- TypeScript
- Styled Components
- Webpack：調整 webpack 設定檔，整合 ESBuild（透過 esbuild-loader）、ESLint、Stylelint 等套件，實現語法檢查、最小化、預防快取等打包建置功能
- ESLint：js、ts、tsx 語法檢查
- Stylelint：css 與 styled components 語法檢查
- Prettier
- firebase（firebase hosting）：網站透過 firebase hosting 進行部署
- github action：firebase hosting 整合 github action，實現自動整合與部署
- React Router：SPA 實現網址進行頁面切換
- odata-query: TDX API 支援 OData 語法，使用 odata-query 套件來進行 query string 的組合
- react-modal-sheet：手機頁面上可滑動的 Modal Sheet

## 第三方服務

- TDX API
- Google Map API

## 未來改善項目

- RWD
- TDX 公車資料整合
- 加入全域狀態管理，如 Redux
- 加入單元測試
- PWA

## 設計

- Amanda

## F2E

- 峰林
- June
- Martin

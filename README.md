# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# `src`配下のモジュール構成

```
src/
├── api        API関連の処理
├── assets     変換前のsvgファイルなど
├── components Reactコンポーネント
├── hooks      共通で利用できるHooksを置く
├── pages      ドメインロジック
├── redux      Redux関連の処理
├── router     ルート
└── types      型定義(基本的は触らない)
```

# コンポーネントの分類

- atoms
  - 最小単位のコンポーネント
  - 再利用されるもの
  - 他のコンポーネントは利用しないこと
  - 原則的に他のコンポーネントに影響を及ぼす margin を持たないこと(レイアウトなどを除く)
- molecules
  - Atom を組み合わせたコンポーネント
  - 再利用されるもの
  - atoms を利用できる
- organismos
  - 下位層(atoms, molecules)を組み合わせてつくる１つの意味をもつコンポーネント
  - organismos をつかってもよい
- templates
  - organismos を組み合わせて配置するコンポーネント
  - 現状利用なし
- pages
  - react-router でルーティングされる単位
  - redux-store との接続は、原則 pages でのみ行う

# modules(redux 関連処理)について

- redux 関連のファイルは `src/modules` 配下に配置します
- `src/modules` 直下のディレクトリは、原則データ単位とします
- 各 module 毎に以下のファイルを持ちます
  - index.ts
    - reducer を export します
  - actions.ts
    - Action type の定義、Action を持ちます
  - reducer.ts
    - Store の型定義、reducer 処理を持ちます

# domain について

- React などのフレームワークとは独立ロジックを扱う
  - API データを表示データに変換
  - バリデーションロジック
- API から受け取ったデータを格納する

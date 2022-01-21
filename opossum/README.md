# opossum

[opossum](https://www.npmjs.com/package/opossum) のサンプルコード

## 実行方法

```console
yarn install
yarn start
```

## その他のサーキットブレーカのライブラリについて

他にも npm には

- [hystrixjs](https://www.npmjs.com/package/hystrixjs)
- [brakes](https://www.npmjs.com/package/brakes)

といったサーキットブレーカのライブラリがあるが、どちらもメンテナンスされていない。

また、Netflixy 製のサーキットブレーカの Java ライブラリ [Hystrix](https://github.com/Netflix/Hystrix) もすでに活発な開発は行っておらず、[resilience4j](https://github.com/resilience4j/resilience4j) のようなアクティブなライブラリを利用することを推奨している。

そもそも Istio や Envoy を利用したサーキットブレーカが主流になっているとも思われる。

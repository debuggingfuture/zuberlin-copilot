## Zuberlin Copilot

- This is a hackathon project at ZuBerlin

Check the [Slides](
https://docs.google.com/presentation/d/1ZOaCexq8eQ3l6XHah_lIOFiErPRZdwhk5U1x7tH9kBk/edit#slide=id.p
) for introduction.


This is to experiment how we can foster cross-polluniation with simple mechanism. Inspired by Community Notes at Twitter, we aim to provide context and aid for learning domain expertise, meanwhile encourage participation and explore audience the interest and knowledge level community with the help of AI 


## Mantle Contract

- Deployed on sepolia at below address
  - https://explorer.sepolia.mantle.xyz/address/0x9d4D7Db2Ad457B6fC31C5F2B4BD5B741E02b3A99
- `cd apps/contracts`
- `env-cmd -f ../../.env forge script script/Deploy.s.sol  --rpc-url https://rpc.sepolia.mantle.xyz  --gas-price 1000 --gas-limit 60000000000000000 --broadcast --legacy`
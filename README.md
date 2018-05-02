[![CircleCI](https://circleci.com/gh/liz4rdcom/worknet.svg?style=svg&circle-token=907f6e77c31e4e211c8814f834fbdfc63c8b1d2a)](https://circleci.com/gh/liz4rdcom/worknet)

# worknet
მალე..


### დეველოპერებს
#### branch-ის სახელი
საკითხის ნომერი (issue number)/მოკლე-დასახელება

მაგ.
```
git checkout -b 5/myprofile-skills
```
#### Docker კონტეინერი (elasticsearch)
https://www.docker.elastic.co/

```
docker run --name worknet -p 9200:9200 -itd docker.elastic.co/elasticsearch/elasticsearch:6.1.1
```
#### Docker კონტეინერი (mongo)
docker run --name worknet-mongo -p 27017:27017 -itd mongo

#### პირველადი სატესტო მონაცემების ჩაწერა ბაზაში (Test Data)
```
node seedtestdata.js
```


<%= appname %>
====================
[![Build Status](https://travis-ci.org/goappes/<%= appname %>.svg?branch=master)](https://travis-ci.org/goappes/<%= appname %>) [![Dependencies](https://david-dm.org/goappes/<%= appname %>.png)](https://david-dm.org/goappes/<%= appname %>) [![devDependency Status](https://david-dm.org/goappes/<%= appname %>/dev-status.svg)](https://david-dm.org/goappes/<%= appname %>#info=devDependencies) [![Code Climate](https://codeclimate.com/github/goappes/<%= appname %>/badges/gpa.svg)](https://codeclimate.com/github/goappes/<%= appname %>)

## Dependencies
```shell
  hoodie install <%= appname %>
```
for cordova/phonegap users
```shell
  bower install <%= appname %>
```

## Setup client
```html
 <script src="/_api/_files/hoodie.js"></script>
```
for cordova/phonegap users

```html
  <script src="<bowerdir>/hoodie/dist/hoodie.js"></script>
  <script src="<bowerdir>/<%= appname %>/hoodie.<%= generatorName %>.js"></script>
```

## API (Dream Code)
-  [x] hoodie.<%= generatorName %>.follow(login)
-  [x] hoodie.<%= generatorName %>.unfollow(login)
-  [x] hoodie.<%= generatorName %>.post({text: 'text'}, /*opitional*/ {type: [plugin.enum]})
-  [x] hoodie.<%= generatorName %>.getPost({id: 'postId')
-  [x] hoodie.<%= generatorName %>.updatePost({id: 'postId',text: 'text'}, /*opitional*/ {type: [plugin.enum]})
-  [x] hoodie.<%= generatorName %>.deletePost({id: 'postId'}, /*opitional*/ {type: [plugin.enum]})
-  [x] hoodie.<%= generatorName %>.comment(postId, {text:'text'})
-  [x] hoodie.<%= generatorName %>.updateComment({ id: 'postId'}, {id: 'commentId'})
-  [x] hoodie.<%= generatorName %>.deleteComment({ id: 'postId'}, {id: 'commentId'})
-  [x] hoodie.<%= generatorName %>.count(postId, [type.enum]) 
-  [x] hoodie.<%= generatorName %>.uncount(postId, [type.enum])
-  [x] hoodie.<%= generatorName %>.like(postId) 
-  [x] hoodie.<%= generatorName %>.unlike(postId)
-  [x] hoodie.<%= generatorName %>.feed(postId)
-  [x] hoodie.<%= generatorName %>.share(postId)
-  [x] hoodie.<%= generatorName %>.abuse(postId)
-  [x] hoodie.<%= generatorName %>.following(/*opitional*/ login)
-  [x] hoodie.<%= generatorName %>.followers(/*opitional*/ login)
-  [x] hoodie.<%= generatorName %>.getProfile(/*opitional*/ login)
-  [x] hoodie.<%= generatorName %>.updateProfile(/*opitional*/ login, profileObject)
